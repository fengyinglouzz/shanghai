<template>
	<div>
		<head-top></head-top>
		<el-row style="margin-top: 20px;">
			<el-col :span="14" :offset="5">
				<el-form :model="doctorAdviceForm" ref="doctorAdviceForm" label-width="110px">
					<el-col :span="12" v-if="show">
		                <el-form-item label="患者住院表id" prop="patientHospitId">
		                    <el-input v-model="doctorAdviceForm.patientHospitId"></el-input>
		                </el-form-item>
					</el-col>
					<el-col :span="12">
		                <el-form-item label="预防措施" prop="doctorAdviceRisk">
		                	<el-select v-model="doctorAdviceForm.doctorAdviceRisk" clearable :disabled="disabled1" placeholder="请选择" style="width:100%;" @change="changedoctorAdviceRisk(doctorAdviceRisk)">
		                		<el-option
									v-for="item in doctorAdviceRiskOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
		                	</el-select>
		                </el-form-item>
					</el-col>
					<el-col :span="12">
		                <el-form-item label="诊断结果" prop="doctorAdviceResult">
		                	<el-select v-model="doctorAdviceForm.doctorAdviceResult" clearable :disabled="disabled2" placeholder="请选择" readonly style="width:100%;" @change="changedoctorAdviceResult(doctorAdviceResult)">
		                		<el-option
									v-for="item in doctorAdviceResultOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
		                	</el-select>
		                </el-form-item>
					</el-col>
					<el-col :span="24">
	                    <el-form-item label="医嘱" prop="doctorAdviceCent">
	                        <el-input type="textarea" :rows="3" v-model="doctorAdviceForm.doctorAdviceCent"></el-input>
	                    </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item :class="{'hideContent': tipbtn}">
                        	<el-button @click="preventiontip">{{btnName}}</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="8">
                        <el-form-item>
                        <el-button type="primary" @click="saveInfo">保存</el-button>
                        <el-button @click="cancel">取消</el-button>
                        </el-form-item>
                    </el-col>
				</el-form>
			</el-col>
		</el-row>
		<el-dialog :title="btnName" v-model="preTipVisible" :close-on-click-modal="false">
			<img src="../assets/img/preventionTip3.jpg" :class="{'hideContent': tip1}">
			<img src="../assets/img/preventionTip2.jpg" :class="{'hideContent': tip2}">
			<img src="../assets/img/preventionTip5.jpg" :class="{'hideContent': tip3}">
			<img src="../assets/img/preventionTip4.jpg" :class="{'hideContent': tip4}">
		</el-dialog>
	</div>
</template>

<script>
 	import headTop from '@/components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getSaveVteDoctorAdviceInfo} from '@/api/getData'
    import {setSessionStorage,getSessionStorage} from '../config/mUtils'
	import menuconstants from '../constants/menuconstants'
	import {getDictData} from '@/common/dictCache'
	
    export default {
        inject: ['reload'],
    	data(){
    		return {
                textarea: '',
    			baseUrl,
    			baseImgPath,
    			show: false,
				patientHospitId: this.$route.query.patientHospitId,
    			doctorAdviceForm: {
					patientHospitId: this.$route.query.patientHospitId,
    				doctorAdviceRisk: '',
    				doctorAdviceResult: '',
    				doctorAdviceCent: '',
    			},
    			doctorAdviceRiskOptions: [],
    			doctorAdviceResultOptions: [],
    			preTipVisible: false,
    			btnName: '',
    			tipbtn: true,
				tip1: false,
				tip2: true,
				tip3: true,
				tip4: true,
				disabled1: false,
				disabled2: false,
    		}
    	},
    	components: {
    		headTop,
    	},
    	created(){
			this.getPatientDict();
			this.changedoctorAdviceRisk();
			this.changedoctorAdviceResult();
		},
    	methods: {
    		async getPatientDict(){
            	this.doctorAdviceRiskOptions = [];
            	this.doctorAdviceResultOptions = [];
                try{
                    const dictLocalData = await	getDictData();
                    const doctorAdviceRisk = dictLocalData.doctorAdviceRisk;
                    const doctorAdviceResult = dictLocalData.doctorAdviceResult;
                    doctorAdviceRisk.forEach((item, index) => {
                        this.doctorAdviceRiskOptions.push({
                        	label: item.dictDataName,
                        	value: item.dictDataValue,
                        	index,
                        })
                    });
                    doctorAdviceResult.forEach((item, index) => {
                        this.doctorAdviceResultOptions.push({
                        	label: item.dictDataName,
                        	value: item.dictDataValue,
                        	index,
                        })
                    });
                }catch(err){
                    console.log('获取字典数据失败', err);
                }
            },
            changedoctorAdviceRisk(){
            	if( this.doctorAdviceForm.doctorAdviceRisk && this.doctorAdviceForm.doctorAdviceRisk!="" ){
            		this.disabled1 = false;
            		this.disabled2 = true;
	    			if( this.doctorAdviceForm.doctorAdviceRisk == 1 ){
	    				this.doctorAdviceForm.doctorAdviceCent = "尽早活动，避免脱水";
	    				this.tipbtn = true;
	    			}else if( this.doctorAdviceForm.doctorAdviceRisk == 2 ){
	    				this.doctorAdviceForm.doctorAdviceCent = "";
	    				this.tipbtn = false;
	    				this.btnName = "药物预防措施推荐";
	    			}else if( this.doctorAdviceForm.doctorAdviceRisk == 3 ){
	    				this.doctorAdviceForm.doctorAdviceCent = "";
	    				this.tipbtn = false;
	    				this.btnName = "机械预防措施推荐";
	    			};
            	}else{
            		this.disabled1 = false;
            		this.disabled2 = false;
            	};
           },
           changedoctorAdviceResult(){
            	if( this.doctorAdviceForm.doctorAdviceResult && this.doctorAdviceForm.doctorAdviceResult!="" ){
    				this.doctorAdviceForm.doctorAdviceCent = "";
            		this.disabled1 = true;
            		this.disabled2 = false;
    				this.tipbtn = false;
	    			if( this.doctorAdviceForm.doctorAdviceResult == 1 ){
	    				this.btnName = "PTE医嘱项目推荐";
	    			}else if( this.doctorAdviceForm.doctorAdviceResult == 2 ){
	    				this.doctorAdviceForm.doctorAdviceCent = "";
	    				this.tipbtn = false;
	    				this.btnName = "DVT医嘱项目推荐";
	    			};
            	}else{
            		this.disabled1 = false;
            		this.disabled2 = false;
            	}
            },
    		preventiontip(){
    			this.preTipVisible = true;
    			if( this.btnName == "药物预防措施推荐"){
					this.tip1 = false;
					this.tip2 = true;
					this.tip3 = true;
					this.tip4 = true;
    			}else if( this.btnName == "机械预防措施推荐"){
					this.tip1 = true;
					this.tip2 = false;
					this.tip3 = true;
					this.tip4 = true;
    			}else if( this.btnName == "PTE医嘱项目推荐"){
					this.tip1 = true;
					this.tip2 = true;
					this.tip3 = false;
					this.tip4 = true;
    			}else if( this.btnName == "DVT医嘱项目推荐"){
					this.tip1 = true;
					this.tip2 = true;
					this.tip3 = true;
					this.tip4 = false;
    			}
    		},
			claerFrom(){
				this.doctorAdviceForm = {
    				doctorAdviceRisk: '',
    				doctorAdviceResult: '',
    				doctorAdviceCent: '',
				};
    			this.preTipVisible = false;
    			this.btnName = '';
    			this.tipbtn = true;
				this.tip1 = false;
				this.tip2 = true;
				this.tip3 = true;
				this.tip4 = true;
				this.disabled1 = false;
				this.disabled2 = false;
			},
		    saveInfo() {
		    	this.$refs.doctorAdviceForm.validate(async (valid) => {
					if (valid) {
						const params = {
							...this.doctorAdviceForm,
						}
						try{
							params.modelCode = menuconstants.doctorAdviceModelCode;
							//params.assessmentSelectData  = this.dictPojoLists.join(',');
							const jsonString = JSON.stringify(params);
							const result = await getSaveVteDoctorAdviceInfo({jsonString:jsonString});
							if (result.status == 1) {
								console.log(result)
								this.$message({
					            	type: 'success',
					            	message: '保存成功'
					          	});
								this.claerFrom();
							}else{
								this.$message({
					            	type: 'error',
					            	message: result.message
					          	});
							}
						}catch(err){
							console.log(err)
						}
					} else {
						this.$notify.error({
							title: '错误',
							message: '请检查输入是否正确',
							offset: 100
						});
						return false;
					}
				});
            	this.reload();
		    	this.$router.go(-1);
		    },
		    cancel(){
            	this.reload();
				this.claerFrom();
		    	this.$router.go(-1);
		    }
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.hideContent{
		display: none;
	}
</style>
