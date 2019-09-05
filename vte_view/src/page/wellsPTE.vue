<template>
    <div>
     	<head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="15" :offset="4">
	  			<el-form :model="wellsPTEForm" ref="wellsPTEForm" label-width="110px">
					<el-form-item>
						<el-button type="primary" @click="automaticCheckout">根据最后一次评分自动勾选建议评分项</el-button>
					</el-form-item>
					<el-col :span="24" v-for="(dictPojoList,index) in assessmentDictList" :key="index">
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
					<el-form-item label="可能性：" class="scoreCenter">
						<span>{{wellsPTEForm.assessmentScore}}分</span> <span>{{wellsPTEForm.assessmentResultExplain}}可能</span>
					</el-form-item>
					<div class="notes">注：
						<el-table :data="notesData" max-height="260" width="50%" border>
					      <el-table-column
					        prop="riskScoreName"
					        label="临床可能性"
			                min-width="150">
					      </el-table-column>
					      <el-table-column
					        prop="riskScoreShowText"
					        label="分值"
			                min-width="150">
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
    			wellsPTEForm: {
					patientHospitId: this.$route.query.patientHospitId,
    				assessmentScore: 0,
    				assessmentResult: '',
					assessmentResultExplain: '低度',
    			},
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
			this.notesTable();
		},
    	methods: {
    		getAssessmentDictList(){
				const userString = getSessionStorage("LOGIN_USER");
				const userINFO = JSON.parse(userString);
				const loginAssessmentDictPojoList =  userINFO.loginAssessmentDictPojoList;
				if(loginAssessmentDictPojoList!=null&&loginAssessmentDictPojoList.length>0){
					loginAssessmentDictPojoList.forEach((loginAssessmentDictTypePojo, index) => {
                        if(loginAssessmentDictTypePojo.assessmentItem == menuconstants.wellsPTEDictValue){
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
		    	this.$refs.wellsPTEForm.validate(async (valid) => {
					if (valid) {
						const params = {
							...this.wellsPTEForm,
						}
						try{
							params.modelCode = menuconstants.wellsPTEModelCode;
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
    			const queryVteAssessmentLastTime = await getQueryVteAssessmentLastTime({modelCode:menuconstants.wellsPTEModelCode, patientHospitId:this.$route.query.patientHospitId});
    			this.wellsPTEForm.assessmentResult = queryVteAssessmentLastTime.assessmentResult;
    			this.wellsPTEForm.assessmentScore = queryVteAssessmentLastTime.assessmentScore;
    			if((this.wellsPTEForm.assessmentScore>=0) && (this.wellsPTEForm.assessmentScore<=1)){
    				this.wellsPTEForm.assessmentResult = "1";
    				this.wellsPTEForm.assessmentResultExplain = "低度";
    			}else if((this.wellsPTEForm.assessmentScore>=2)){
    				this.wellsPTEForm.assessmentResult = "3";
    				this.wellsPTEForm.assessmentResultExplain = "高度";
    			}
    			this.dictPojoLists = [];
    			if(queryVteAssessmentLastTime.assessmentSelectData){
    				this.dictPojoLists = queryVteAssessmentLastTime.assessmentSelectData.split(",");
    			}
    		},
    		async notesTable(){
    			const queryVteRiskScoreInfoList = await getQueryVteRiskScoreInfoList({modelCode:menuconstants.wellsPTEModelCode});
				this.notesData=[];
           		queryVteRiskScoreInfoList.forEach(item => {
                  const notesData = {};
                    notesData.riskScoreName = item.riskScoreName,
                    notesData.riskScoreRate = item.riskScoreRate,
                    notesData.riskScoreShowText = item.riskScoreShowText,
                    this.notesData.push(notesData);
                });
    		},
    		checkinlist(item){
    			const assessmentSelectData  = this.dictPojoLists.join(',');
				this.wellsPTEForm.assessmentScore = 0;
				if(this.assessmentDictList!=null){
					for(var score in this.assessmentDictList){
						const assessmentDict = this.assessmentDictList[score];
						assessmentDict.forEach((assessment, index) => {
							if ((","+assessmentSelectData+",").indexOf(","+assessment.value+",")>=0) {
								this.wellsPTEForm.assessmentScore = this.wellsPTEForm.assessmentScore + Number(score);
							}
						});
					}
				};
    			//this.wellsPTEForm.assessmentScore += Number(item.score);
    			if((this.wellsPTEForm.assessmentScore>=0) && (this.wellsPTEForm.assessmentScore<=1)){
    				this.wellsPTEForm.assessmentResult = "1";
    				this.wellsPTEForm.assessmentResultExplain = "低度";
    			}else if((this.wellsPTEForm.assessmentScore>=2)){
    				this.wellsPTEForm.assessmentResult = "3";
    				this.wellsPTEForm.assessmentResultExplain = "高度";
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
