<template>
    <div>
     	<head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="15" :offset="4">
	  			<el-form :model="capriniForm" ref="capriniForm" label-width="110px" class="form">
					<el-form-item label="阶段" prop="assessmentStage">
						<el-select v-model="capriniForm.assessmentStage" clearable placeholder="请选择" style="width:100%;">
							<el-option
									v-for="item in assessmentStageOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="automaticCheckout">根据最后一次评分自动勾选建议评分项</el-button>
					</el-form-item>
					<el-col :span="6" v-for="(dictPojoList,index) in assessmentDictList" :key="index">
						<div class="scoreHead">{{index}}分</div>
						<el-checkbox-group v-model="dictPojoLists" class="leftRift">
							<el-checkbox v-for="item in dictPojoList" 
							 :key="item.value"
							 :label="item.value" 
							 :score="item.score"
							 @change="checkinlist(item)">{{item.label}}</el-checkbox>
						</el-checkbox-group>
					</el-col>
					<el-row class="scoreBottom"></el-row>
					<el-form-item label="Caprini评分：" class="scoreCenter">
						<span>{{capriniForm.assessmentScore}}分</span> <span>{{capriniForm.assessmentResultExplain}}</span>
					</el-form-item>
					<div class="notes">注：
						<el-table :data="notesData" max-height="260" width="50%" border>
					      <el-table-column
					        prop="riskScoreName"
					        label="VTE风险分度"
			                min-width="150">
					      </el-table-column>
					      <el-table-column
					        prop="riskScoreShowText"
					        label="Caprini评分"
			                min-width="150">
					      </el-table-column>
					      <el-table-column
					        prop="riskScoreRate"
					        label="未采取预防措施VTE发生率"
					        :formatter="ifendcase"
			                min-width="180">
					      </el-table-column>
				    	</el-table>
					</div>
					<el-col :span="12" :offset="8">
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
    import {getSaveVteAssessmentInfo, getQueryVteAssessmentLastTime, getQueryVteRiskScoreInfoList} from '@/api/getData'
	
    export default {
        inject: ['reload'],
    	data(){
    		return {
    			baseUrl,
				baseImgPath,
				patientHospitId: this.$route.query.patientHospitId,
    			capriniForm: {
					patientHospitId: this.$route.query.patientHospitId,
    				assessmentStage: '',
    				assessmentScore: 0,
    				assessmentResult: '',
					assessmentResultExplain: '低危',
    			},
    			assessmentStageOptions: [],
    			assessmentDictList:{},
    			dictPojoLists: [],
    			notesData: [],
    		}
    	},
    	components: {
    		headTop,
    	},
    	created(){
			this.getAssessmentDictList();
			this.getAssessmentDictDict();
			this.notesTable();
		},
    	methods: {
    		async getAssessmentDictDict(){
            	this.assessmentStageOptions = [];
                try{
                    const dictLocalData = await	getDictData();
                    const assessmentStage = dictLocalData.assessmentStage;
                    assessmentStage.forEach((item, index) => {
                        this.assessmentStageOptions.push({
                        	label: item.dictDataName,
                        	value: item.dictDataValue,
                        	index,
                        })
                    });
                }catch(err){
                    console.log('获取字典数据失败', err);
                }
            },
    		getAssessmentDictList(){
				const userString = getSessionStorage("LOGIN_USER");
				const userINFO = JSON.parse(userString);
				const loginAssessmentDictPojoList =  userINFO.loginAssessmentDictPojoList;
				if(loginAssessmentDictPojoList!=null&&loginAssessmentDictPojoList.length>0){
					loginAssessmentDictPojoList.forEach((loginAssessmentDictTypePojo, index) => {
                        if(loginAssessmentDictTypePojo.assessmentItem == menuconstants.capriniDictValue){
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
		    	this.$refs.capriniForm.validate(async (valid) => {
					if (valid) {
						const params = {
							...this.capriniForm,
						}
						try{
							params.modelCode = menuconstants.capriniModelCode;
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
    			const queryVteAssessmentLastTime = await getQueryVteAssessmentLastTime({modelCode:menuconstants.capriniModelCode, patientHospitId:this.$route.query.patientHospitId});
    			this.capriniForm.assessmentResult = queryVteAssessmentLastTime.assessmentResult;
    			this.capriniForm.assessmentScore = queryVteAssessmentLastTime.assessmentScore;
    			if((this.capriniForm.assessmentScore>=0) && (this.capriniForm.assessmentScore<=2)){
    				this.capriniForm.assessmentResult = "1";
    				this.capriniForm.assessmentResultExplain = "低危";
    			}else if((this.capriniForm.assessmentScore>=3) && (this.capriniForm.assessmentScore<=4)){
    				this.capriniForm.assessmentResult = "2";
    				this.capriniForm.assessmentResultExplain = "中危";
    			}else if((this.capriniForm.assessmentScore>=5)){
    				this.capriniForm.assessmentResult = "3";
    				this.capriniForm.assessmentResultExplain = "高危";
    			}
    			this.dictPojoLists = [];
    			if(queryVteAssessmentLastTime.assessmentSelectData){
    				this.dictPojoLists = queryVteAssessmentLastTime.assessmentSelectData.split(",");
    			}
    		},
    		async notesTable(){
    			const queryVteRiskScoreInfoList = await getQueryVteRiskScoreInfoList({modelCode:menuconstants.capriniModelCode});
				this.notesData=[];
           		queryVteRiskScoreInfoList.forEach(item => {
                  const notesData = {};
                    notesData.riskScoreName = item.riskScoreName,
                    notesData.riskScoreRate = item.riskScoreRate,
                    notesData.riskScoreShowText = item.riskScoreShowText,
                    this.notesData.push(notesData);
                });
    		},
    		ifendcase( val ){
    			this.notesData.riskScoreRate = Number((val.riskScoreRate)*100)+ '%';
    			return this.notesData.riskScoreRate;
    		},
    		checkinlist(item){
    			const assessmentSelectData  = this.dictPojoLists.join(',');
				this.capriniForm.assessmentScore = 0;
				if(this.assessmentDictList!=null){
					for(var score in this.assessmentDictList){
						const assessmentDict = this.assessmentDictList[score];
						assessmentDict.forEach((assessment, index) => {
							if ((","+assessmentSelectData+",").indexOf(","+assessment.value+",")>=0) {
								this.capriniForm.assessmentScore = this.capriniForm.assessmentScore + Number(score);
							}
						});
					}
				};
    			/*if(this.dictPojoLists.length){
    				this.capriniForm.assessmentScore += Number(item.score);
    			};*/
    			if((this.capriniForm.assessmentScore>=0) && (this.capriniForm.assessmentScore<=2)){
    				this.capriniForm.assessmentResult = "1";
    				this.capriniForm.assessmentResultExplain = "低危";
    			}else if((this.capriniForm.assessmentScore>=3) && (this.capriniForm.assessmentScore<=4)){
    				this.capriniForm.assessmentResult = "2";
    				this.capriniForm.assessmentResultExplain = "中危";
    			}else if((this.capriniForm.assessmentScore>=5)){
    				this.capriniForm.assessmentResult = "3";
    				this.capriniForm.assessmentResultExplain = "高危";
    			}
    		}
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.notes{
		font-size: 14px;
		color: #48576a;
	}
	.notes .el-table{
		margin: 10px 0px;
	}
</style>
