<template>
    <div>
     	<head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="15" :offset="4">
	  			<el-form :model="internalMedForm" ref="internalMedForm" label-width="150px">
					<el-form-item>
						<el-button type="primary" @click="automaticCheckout">根据最后一次评分自动勾选建议评分项</el-button>
					</el-form-item>
					<el-col :span="12" v-for="(dictPojoList,index) in assessmentDictList" :key="index">
						<div class="scoreHead"  v-if="index==3" >具有以下1项即为出血高危</div>
						<div class="scoreHead"  v-if="index==1" >具有以下3项及以上为出血高危</div>
						<el-checkbox-group v-model="dictPojoLists" class="leftRift">
							<el-checkbox v-for="item in dictPojoList" 
							 :key="item.value"
							 :label="item.value" 
							 :score="item.score"
							 @change="checkinlist(item)">{{item.label}}</el-checkbox>
						</el-checkbox-group>
					</el-col>
					<el-row class="scoreBottom"></el-row>
					<el-form-item label="内科出血评估评分：" class="scoreCenter">
						<span>{{internalMedForm.assessmentScore}}分</span> <span>{{internalMedForm.assessmentResultExplain}}</span>
					</el-form-item>
					<el-col :span="12" :offset="7">
						<el-form-item>
							<el-button type="primary" @click="saveInfo">保存</el-button>
							<el-button @click="cancel">取消</el-button>
						</el-form-item>
					</el-col>
	  			</el-form>
  			</el-col>
  		</el-row>
    </div>
</template>

<script>
 	import headTop from '@/components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {setSessionStorage,getSessionStorage} from '../config/mUtils'
	import menuconstants from '../constants/menuconstants'
	import {getDictData} from '@/common/dictCache'
    import {getSaveVteAssessmentInfo, getQueryVteAssessmentLastTime} from '@/api/getData'
	
    export default {
        inject: ['reload'],
    	data(){
    		return {
    			baseUrl,
    			baseImgPath,
				patientHospitId: this.$route.query.patientHospitId,
    			internalMedForm: {
					patientHospitId: this.$route.query.patientHospitId,
					assessmentScore: 0,
    				assessmentResult: '',
					assessmentResultExplain: '无',
    			},
    			assessmentDictList:{},
    			dictPojoLists: []
    		}
    	},
    	components: {
    		headTop,
    	},
    	created(){
			this.getAssessmentDictList();
		},
    	methods: {
    		getAssessmentDictList(){
				const userString = getSessionStorage("LOGIN_USER");
				const userINFO = JSON.parse(userString);
				const loginAssessmentDictPojoList =  userINFO.loginAssessmentDictPojoList;
				if(loginAssessmentDictPojoList!=null&&loginAssessmentDictPojoList.length>0){
					loginAssessmentDictPojoList.forEach((loginAssessmentDictTypePojo, index) => {
                        if(loginAssessmentDictTypePojo.assessmentItem == menuconstants.internalMedicineDictValue){
							const dictPojoList = loginAssessmentDictTypePojo.loginAssessmentDictPojoList;
							if(dictPojoList!=null&&dictPojoList.length>0){
								dictPojoList.forEach((dictPojo, index) => {
										if(!this.assessmentDictList[dictPojo.assessmentDictScore]){
											this.assessmentDictList[dictPojo.assessmentDictScore] = [];
										}
									    this.assessmentDictList[dictPojo.assessmentDictScore].push({
											label: dictPojo.assessmentDictName,
											value: dictPojo.assessmentDictCode,
											score: dictPojo.assessmentDictScore,
											index,
										})
									
								});
							}
						}
                    });
				}
			},
		    saveInfo() {
		    	this.$refs.internalMedForm.validate(async (valid) => {
					if (valid) {
						const params = {
							...this.internalMedForm,
						}
						try{
							params.modelCode = menuconstants.internalMedicineModelCode;
							params.assessmentSelectData  = this.dictPojoLists.join(',');
							const jsonString = JSON.stringify(params);
							const result = await getSaveVteAssessmentInfo({jsonString:jsonString});
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
		    	this.$router.go(-1);
		    },
    		async automaticCheckout(){
    			const queryVteAssessmentLastTime = await getQueryVteAssessmentLastTime({modelCode:menuconstants.internalMedicineModelCode, patientHospitId:this.$route.query.patientHospitId});
    			this.internalMedForm.assessmentResult = queryVteAssessmentLastTime.assessmentResult;
    			this.internalMedForm.assessmentScore = queryVteAssessmentLastTime.assessmentScore;
    			if(this.internalMedForm.assessmentScore<3){
    				this.internalMedForm.assessmentResult = "1";
    				this.internalMedForm.assessmentResultExplain = "无";
    			}else if(this.internalMedForm.assessmentScore>=3){
    				this.internalMedForm.assessmentResult = "2";
    				this.internalMedForm.assessmentResultExplain = "有";
    			}
    			this.dictPojoLists = [];
    			if(queryVteAssessmentLastTime.assessmentSelectData){
    				this.dictPojoLists = queryVteAssessmentLastTime.assessmentSelectData.split(",");
    			}
    		},
    		checkinlist(item){
    			const assessmentSelectData  = this.dictPojoLists.join(',');
				this.internalMedForm.assessmentScore = 0;
				if(this.assessmentDictList!=null){
					for(var score in this.assessmentDictList){
						const assessmentDict = this.assessmentDictList[score];
						assessmentDict.forEach((assessment, index) => {
							if ((","+assessmentSelectData+",").indexOf(","+assessment.value+",")>=0) {
								this.internalMedForm.assessmentScore = this.internalMedForm.assessmentScore + Number(score);
							}
						});
					}
				};
    			//this.internalMedForm.assessmentScore += Number(item.score);
    			if(this.internalMedForm.assessmentScore<3){
    				this.internalMedForm.assessmentResult = "1";
    				this.internalMedForm.assessmentResultExplain = "无";
    			}else if(this.internalMedForm.assessmentScore>=3){
    				this.internalMedForm.assessmentResult = "2";
    				this.internalMedForm.assessmentResultExplain = "有";
    			}
    		}
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
</style>
