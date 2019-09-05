<template>
    <div class="fillcontain">
    	<!-- head，面包屑，在/出院，时间  -->
        <head-top ref="headTop"></head-top>
        
        <div class="form_container">
    		<!-- 科室及患者人数  -->
            <el-col :span="3" :offset="1" max-height="600">
            	<div style="max-height: 675px; padding-right: 25px; overflow: auto;">
	            	<div v-for="(deplist,index) in monitorDepData" :key="index" @click="patientDepJump(index)">
		                <el-badge :value="deplist.count" class="item">
		                    <el-button size="small">{{deplist.patientDepartment}}</el-button>
		                </el-badge>
	        		</div>
        		</div>
            </el-col>
            
    		<!-- 高危患者监测列表  -->
            <el-col :span="18" :offset="1">
            	<el-col :span="8" v-for="(list,index) in cardData" :key="index">
	                <el-card class="leftRiftCard" >
	                    <ul>
	                        <li v-if="show">
	                            <span>{{list.patientCode}}</span><span>{{list.patientHospitId}}</span><span>{{list.patientId}}</span><span>{{list.assessmentTypeId}}{{list.assessmentItemId}}{{list.doctorAdviceId}}</span>
	                        </li>
	                        <li class="rightRiftPat">
	                            <span>{{list.patientName}}</span>&nbsp;&nbsp;<span>{{list.patientAge}}岁</span>&nbsp;&nbsp;<span>{{list.patientSex}}</span><span class="mdanger" v-if='list.assessmentResultExplain=="高危"'>{{list.assessmentResultExplain}}</span><span class="mwarning" v-if='list.assessmentResultExplain=="中危"'>{{list.assessmentResultExplain}}</span>
	                        </li>
	                        <li>
	                            <span>最近一次VTE风险评估项目：</span><span>{{list.patientLastRiskTypeExplain}}</span>
	                        </li>
	                        <li>
	                            <span>最近一次评估时间：</span><span>{{list.patientLastRiskDate}}</span>
	                        </li>
	                        <li>
	                            <span>病案号：</span><span>{{list.patientNumber}}</span>
	                        </li>
	                        <li>
	                            <span>病区：</span><span>{{list.patientArea}}</span>
	                        </li>
	                        <li>
	                            <span>病床：</span><span>{{list.patientBed}}</span>
	                        </li>
	                        <li>
	                            <span>最新出血风险评估：</span><span v-if='(list.assessmentTypeId==0)||(list.assessmentTypeId=="")||(list.assessmentTypeId==null)'>未进行</span><span v-if='(list.assessmentTypeId!=0)&&(list.assessmentTypeId!="")&&(list.assessmentTypeId!=null)'><el-button type="text" @click="handleQueryTypeView(list.assessmentTypeId)">【详情查看】</el-button></span>
	                        </li>
	                        <li>
	                            <span>最新预防禁忌评估：</span><span v-if='(list.assessmentItemId==0)||(list.assessmentItemId=="")||(list.assessmentItemId==null)'>未进行</span><span v-if='(list.assessmentItemId!=0)&&(list.assessmentItemId!="")&&(list.assessmentItemId!=null)'><el-button type="text" @click="handleQueryItemView(list.assessmentItemId)">【详情查看】</el-button></span>
	                        </li>
	                        <li>
	                            <span>最新医嘱处理：</span><span v-if='(list.doctorAdviceId==0)||(list.doctorAdviceId=="")||(list.doctorAdviceId==null)'>未进行</span><span v-if='(list.doctorAdviceId!=0)&&(list.doctorAdviceId!="")&&(list.doctorAdviceId!=null)'><el-button type="text" @click="handleQueryDocAView(list.doctorAdviceId)">【详情查看】</el-button></span>
	                        </li>
	                        <li>
	                            <el-button @click="handlePatientQueryView(list.patientHospitId)">患者详情</el-button>
	                        </li>
	                    </ul>
	                </el-card>
            	</el-col>
                <el-col :span="24">
			        <div class="Pagination" style="text-align: left;margin-top: 10px;">
			            <el-pagination
		                @size-change="handleSizeChange"
		                @current-change="handleCurrentChange"
		                :current-page="currentPage"
		                :page-sizes="[6, 12, 18, 24, 30, 60]"
		                :page-size="limit"
		                layout="total, sizes, prev, pager, next, jumper"
		                :total="count">
			            </el-pagination>
			        </div>
                </el-col>
            </el-col>
        </div>
        <!-- 详情查看弹框  -->
        <el-dialog :title="queryViewTitle" v-model="queryViewVisible" class="queryViewCls" :close-on-click-modal="false">
        	<!-- caprini弹框 -->
        	<div :class="{'hideContent': queryViewCap}" >
        		<el-col :span="queryViewCapWidth"  v-for="(item,svalue) in selectData" :key="svalue">
								 <div class="scoreHead">{{svalue}}</div>
								 <div class="leftRift" v-for="(name,index) in item" :key="index">
									<el-checkbox :label="name" checked disabled></el-checkbox>
						     </div>
							</el-col>
				<el-row class="scoreBottom"></el-row>
				<div class="scoreCenter">
					<span>{{assessmentItemExplain}}：</span><span>{{assessmentScore}}分</span> <span>{{assessmentResultExplain}}</span>
            	</div>
            </div>
        
        	<!-- doctorAdvice弹框 -->
        	<el-form :class="{'hideContent': queryViewDocA}" label-width="110px" >
        		<el-col :span="11">
        			<el-form-item label="预防措施">
						<el-input v-model="doctorAdviceRiskExplain" readonly></el-input>
					</el-form-item>
                </el-col>
                <el-col :span="11" :offset="2">
        			<el-form-item label="诊断结果">
						<el-input v-model="doctorAdviceResultExplain" readonly></el-input>
					</el-form-item>
                </el-col>
        		<el-form-item label="医嘱">
                	<el-input type="textarea" :rows="3" v-model="doctorAdviceCent" readonly></el-input>
				</el-form-item>
        	</el-form>
		</el-dialog>
		<!-- 详情查看弹框  -->
        <el-dialog :title="queryView2Title" v-model="queryView2Visible" class="queryViewCls" :close-on-click-modal="false">
        	<!-- item1 -->
        	<div>
        		<div style="font-weight: bold;padding: 3px 20px;">
					<span>{{assessmentItemExplain}}</span>
            	</div>
        		<el-col :span="24"  v-for="(item,svalue) in selectData" :key="svalue">
								 <div class="scoreHead">{{svalue}}</div>
								 <div class="leftRift" v-for="(name,index) in item" :key="index">
									<el-checkbox :label="name" checked disabled></el-checkbox>
						     </div>
							</el-col>
				<el-row class="scoreBottom"></el-row>
				<div class="scoreCenter">
					<span>{{assessmentItemExplain}}：</span><span>{{assessmentScore}}分</span> <span>{{assessmentResultExplain}}</span>
            	</div>
            </div>
            <br />
            <br />
        	<!-- item2 -->
        	<div>
        		<div style="font-weight: bold;padding: 3px 20px;">
					<span>{{assessmentItemExplain2}}</span>
            	</div>
        		<el-col :span="24"  v-for="(item,svalue2) in selectData2" :key="svalue2">
								 <div class="scoreHead">{{svalue2}}</div>
								 <div class="leftRift" v-for="(name,index) in item" :key="index">
									<el-checkbox :label="name" checked disabled></el-checkbox>
						     </div>
							</el-col>
				<el-row class="scoreBottom"></el-row>
				<div class="scoreCenter">
					<span>{{assessmentItemExplain2}}：</span><span>{{assessmentScore2}}分</span> <span>{{assessmentResultExplain2}}</span>
            	</div>
            </div>
		</el-dialog>
    </div>
</template>

<script>
    import headTop from '../components/monitorHead'
    import {getMonitorList, getMonitorCount, getMonitorDepCount, getQueryAssessment} from '@/api/getData'
    import {getDictData} from '@/common/dictCache'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {setSessionStorage,getSessionStorage} from '../config/mUtils'
	import menuconstants from '../constants/menuconstants'
	var patientDepartments;
    export default {
    	inject: ['reload'],
        data(){
            return {
                baseUrl,
                baseImgPath,
                currentRow: null,
                offset: 0,
                limit: 6,
                count: 0,
                currentPage: 1,
				patientCode: '',
				patientHospitId: '',
				patientId: '',
				patientName: '',
				patientAge: '',
				patientSex: '',
				patientLastRiskTypeExplain: '',
				patientLastRiskDate: '',
				patientNumber: '',
				patientArea: '',
				patientBed: '',
				show: false,
				monitorDepData:[],
				cardData:[],
                queryViewVisible: false,
                queryView2Visible: false,
                queryView2Title: '详情查看',
                assessmentItemExplain: '',
                assessmentScore: 0,
				assessmentResultExplain: '',
                assessmentItemExplain2: '',
                assessmentScore2: 0,
				assessmentResultExplain2: '',
                queryViewCap: true,
                queryViewDocA: true,
                doctorAdviceRiskExplain: '',
                doctorAdviceResultExplain: '',
                doctorAdviceIsTemp: '',
                modelName: '',
            }
        },
        components: {
          headTop,
        },
		activated() {
			this.initData();
		},
        methods: {
        	/* 初始化 */
            async initData(){
                try{
                	if(this.$refs.headTop){
                		/* 获取科室及患者人数 */
	                	const jsonObjectDep = {};
						jsonObjectDep.patientLastRisk =  this.$refs.headTop.patientLastRisk;
						jsonObjectDep.patientOutHospital = this.$refs.headTop.patientOutHospital;
						const jsonStringDep =  JSON.stringify(jsonObjectDep);
	                	const monitorDep = await getMonitorDepCount({jsonString:jsonStringDep});
	            		this.monitorDepData = [];
		                monitorDep.forEach(item => {
		                  	const monitorDepData = {};
		                    monitorDepData.count = item.count,
		                    monitorDepData.patientDepartment = item.patientDepartment,
		                    this.monitorDepData.push(monitorDepData);
		                });
	                	if(this.monitorDepData.length==0){
		                	this.monitorDepData = [];
			            	this.count = 0;
			            	this.cardData = [];
	                	}else{
			                patientDepartments = this.monitorDepData[0].patientDepartment;
			                this.getMonitorInfo(patientDepartments, this.$refs.headTop.patientLastRisk, this.$refs.headTop.patientOutHospital);
	                	}
                	}
            	}catch(err){
                	console.log('获取数据失败', err);
            	}
            },
            handleSizeChange(val) {
              	this.limit = val;
                console.log(`每页 ${val} 条`);
                this.getMonitorInfo(patientDepartments, this.$refs.headTop.patientLastRisk, this.$refs.headTop.patientOutHospital);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getMonitorInfo(patientDepartments, this.$refs.headTop.patientLastRisk, this.$refs.headTop.patientOutHospital);
            },
            /* 获取中高危患者信息 */
            async getMonitorInfo(patientDepartment, patientLastRisk, patientOutHospital){
				const jsonObject = {};
				jsonObject.patientDepartment = patientDepartment;
				jsonObject.patientLastRisk =  patientLastRisk;
				jsonObject.patientOutHospital = patientOutHospital;
				const jsonString =  JSON.stringify(jsonObject);
                const countData = await getMonitorCount({start: this.offset, limit: this.limit,jsonString:jsonString});
			    this.count = countData.count;
                const MonitorInfo = await getMonitorList({start: this.offset, limit: this.limit,jsonString:jsonString});
                this.cardData = [];
                MonitorInfo.forEach(item => {
                  const cardData = {};
                    cardData.patientName = item.patientName,
                    cardData.patientAge = item.patientAge,
                    cardData.patientSex = item.patientSex,
                    cardData.patientLastRiskTypeExplain = item.patientLastRiskTypeExplain,
                    cardData.patientLastRiskDate = item.patientLastRiskDate,
                    cardData.patientNumber = item.patientNumber,
                    cardData.patientArea = item.patientArea,
                    cardData.patientBed = item.patientBed,
					cardData.patientCode = item.patientCode,
					cardData.patientHospitId = item.patientHospitId,
					cardData.patientId = item.patientId,
					cardData.assessmentResultExplain = item.assessmentResultExplain,
					cardData.assessmentTypeId = item.assessmentTypeId,
					cardData.assessmentItemId = item.assessmentItemId,
					cardData.doctorAdviceId = item.doctorAdviceId,
                    this.cardData.push(cardData);
                });
            },
            /* 跳转患者详情 */
        	handlePatientQueryView(patientHospitId) {
        		this.reload();
        		this.$router.push({ 
	        		path: '/patientQuery',
	        		query: {patientHospitId: patientHospitId}
	        	});
        	},
        	/* 显示出血详情查看弹窗 */
	        async handleQueryTypeView(itemId) {
				this.queryViewVisible = true;
				this.modelName = "assessment";
				const queryAssessment = await getQueryAssessment({assessmentId: itemId, modelName: this.modelName});
				this.assessmentResultExplain = queryAssessment.assessmentResultExplain;
				const assessmentItem = queryAssessment.assessmentItem;
				this.assessmentItemExplain = queryAssessment.assessmentItemExplain;
				this.queryViewTitle = this.assessmentItemExplain + '详情';
				this.assessmentScore = queryAssessment.assessmentScore;
				this.selectData = {};
				for(var i in queryAssessment.selectData) {
						var svalue = i+"分";
						if ( assessmentItem ==  menuconstants.internalMedicineDictValue){//"内科出血风险评估"
								if(i==3){
									svalue = "具有以下1项即为出血高危";
								}else if(i==1){
									svalue = "具有以下3项及以上为出血高危";
								}
					  }
						this.selectData[svalue] = queryAssessment.selectData[i];
				};
				this.queryViewDocA = true;
				if( assessmentItem == menuconstants.surgeryDictValue ){//"外科出血风险评估"
									this.queryViewCap = false;
									this.queryViewCapWidth = 12;
				}else if ( assessmentItem ==  menuconstants.internalMedicineDictValue){//"内科出血风险评估"
									this.queryViewCap = false;
									this.queryViewCapWidth = 12;
				};
	        },
        	/* 显示禁忌详情查看弹窗 */
	        async handleQueryItemView(itemId) {
	        	const itemIdArr = itemId.split(',');
				if( itemIdArr.length == 2){
					this.queryView2Visible = true;
					this.modelName = "assessment";
					const queryAssessment = await getQueryAssessment({assessmentId: itemIdArr[0], modelName: this.modelName});
					this.assessmentResultExplain = queryAssessment.assessmentResultExplain;
					this.assessmentItemExplain = queryAssessment.assessmentItemExplain;
					this.assessmentScore = queryAssessment.assessmentScore;
					const assessmentItem = queryAssessment.assessmentItem;
					this.selectData = {};
					for(var i in queryAssessment.selectData) {
							var svalue = i+"分";
							this.selectData[svalue] = queryAssessment.selectData[i];
					};
					const queryAssessment2 = await getQueryAssessment({assessmentId: itemIdArr[1], modelName: this.modelName});
					this.assessmentResultExplain2 = queryAssessment2.assessmentResultExplain;
					this.assessmentItemExplain2 = queryAssessment2.assessmentItemExplain;
					this.assessmentScore2 = queryAssessment2.assessmentScore;
					const assessmentItem2 = queryAssessment2.assessmentItem;
					this.selectData2 = {};
					for(var j in queryAssessment2.selectData) {
							var svalue2 = j+"分";
							this.selectData2[svalue2] = queryAssessment2.selectData[j];
					};
				}else{
					this.queryViewVisible = true;
					this.modelName = "assessment";
					const queryAssessment = await getQueryAssessment({assessmentId: itemId, modelName: this.modelName});
					this.assessmentResultExplain = queryAssessment.assessmentResultExplain;
					const assessmentItem = queryAssessment.assessmentItem;
					this.assessmentItemExplain = queryAssessment.assessmentItemExplain;
					this.queryViewTitle = this.assessmentItemExplain + '详情';
					this.assessmentScore = queryAssessment.assessmentScore;
					this.selectData = {};
					for(var i in queryAssessment.selectData) {
							var svalue = i+"分";
							if ( assessmentItem ==  menuconstants.internalMedicineDictValue){//"内科出血风险评估"
									if(i==1){
										svalue = "具有以下1项即为出血高危";
									}else if(i==3){
										svalue = "具有以下3项及以上为出血高危";
									}
						  }
							this.selectData[svalue] = queryAssessment.selectData[i];
					};
					this.queryViewDocA = true;
					if( assessmentItem == menuconstants.drugPreventionDictValue ){ //"药物预防禁忌评估"
										this.queryViewCap = false;
										this.queryViewCapWidth = 24;
					}else if ( assessmentItem == menuconstants.mechanicalPrecautionDictValue ){ //"机械预防禁忌评估"
										this.queryViewCap = false;
										this.queryViewCapWidth = 24;
					}
				};
	        },
        	/* 显示医嘱详情查看弹窗 */
	        async handleQueryDocAView(itemId) {
					this.queryViewVisible = true;
					this.modelName = "advice";
					const queryAssessment = await getQueryAssessment({assessmentId: itemId, modelName: this.modelName});
					this.assessmentItemExplain = queryAssessment.assessmentItemExplain;
					this.queryViewTitle = this.assessmentItemExplain + '详情';
					this.doctorAdviceCent = queryAssessment.doctorAdviceCent;
					this.doctorAdviceResultExplain = queryAssessment.doctorAdviceResultExplain;
					this.doctorAdviceRiskExplain = queryAssessment.doctorAdviceRiskExplain;
					this.queryViewDocA = false;
					this.queryViewCap = true;
	        },
            getModelMenuPojoList(){
				const userString = getSessionStorage("LOGIN_USER");
				const userINFO = JSON.parse(userString);
				const loginModelPojoList =  userINFO.loginModelPojoList;
				if(loginModelPojoList!=null&&loginModelPojoList.length>0){
						loginModelPojoList.forEach((loginModelPojo, index) => {
							if(loginModelPojo.modelCode == menuconstants.patientRootCode){
								this.menuList = loginModelPojo.loginModelPojoList;
							}
						});
					}
			},
			patientDepJump( val ){
				this.currentPage = 1;
				this.offset = 0;
				patientDepartments = this.monitorDepData[val].patientDepartment;
                this.getMonitorInfo(patientDepartments, this.$refs.headTop.patientLastRisk, this.$refs.headTop.patientOutHospital);
			}
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
    .item, .item .el-button--small{
        width: 100%;
    }
    .item{
        margin-top: 15px;
    }
    .leftRiftCard{
        margin:20px 20px 0px 0px;
    }
    .leftRiftCard li{
      padding: 3px 0px;
      font-size: 14px;
      color: #48576a;
    }
    .leftRiftCard li span{
    	display: inline-block;
    }
    .leftRiftCard li em{
    	font-style: normal;
    }
    .leftRiftCard li button{
    	width: 100%;
    }
	.queryViewCls .el-dialog--small{
		width: 50%;
	}
	.hideContent{
		display: none;
	}
	.mdanger,.mwarning{
    	color: #f56c6c;
    	font-weight: bold;
    	font-size: 18px;
		position: absolute;
		top:0px;
		right: 0px;
	}
	.mwarning{
    	color: #e6a23c;
	}
	.rightRiftPat{
		position: relative;
	}
	.el-button.el-button--text{
		padding: 2px;
	}
</style>
