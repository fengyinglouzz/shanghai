<template>
    <div class="fillcontain">
    	<!-- head，面包屑，预防策略，预防措施，导出  -->
        <head-top ref="headTop"></head-top>
        
        <el-row class="tac">
            <el-col :span="5">
    			<!-- 患者基本信息  -->
                <el-card class="leftRiftCard">
          			<el-form ref="patientBasicInfo" :model="patientBasicInfo">
		                <ul>
		                    <li v-if="show">
		                        <span>患者住院表id</span><span style="margin-left: 20px;">{{patientBasicInfo.patientHospitId}}</span><span>{{patientBasicInfo.patientSex}}</span>
		                    </li>
		                    <li>
		                        <span>VTE风险评估等级：</span><span :class="striking">{{patientBasicInfo.assessmentResultExplain}}</span>
		                    </li>
		                    <li>
		                        <span>住院号：</span><span>{{patientBasicInfo.patientCode}}</span>
		                    </li>
		                    <li>
		                        <span>病案号：</span><span>{{patientBasicInfo.patientNumber}}</span>
		                    </li>
		                    <li>
		                        <span>姓名：</span><span>{{patientBasicInfo.patientName}}</span>&nbsp;&nbsp;<span :class="patientSexCls"></span>
		                    </li>
		                    <li>
		                        <span>年龄：</span><span>{{patientBasicInfo.patientAge}}</span>
		                    </li>
		                    <li>
		                        <span>病区：</span><span>{{patientBasicInfo.patientArea}}</span>
		                    </li>
		                    <li>
		                        <span>病床：</span><span>{{patientBasicInfo.patientBed}}</span>
		                    </li>
		                    <li>
		                        <span>科室：</span><span>{{patientBasicInfo.patientDepartment}}</span>
		                    </li>
		                    <li>
		                        <span>责任医生：</span><span>{{patientBasicInfo.patientDoctor}}</span>
		                    </li>
		                    <li>
		                        <span>评估项完整度：</span><span>{{patientBasicInfo.assessmentCompletionDegree}}</span>
		                        <div>
			                        <div v-for="(assessment,index) in patientBasicInfo.assessmentTypeList" :key="index" style="display: inline;">
										<el-tooltip effect="light" :content="assessment.assessmentTypeExplain" placement="top">
				      						<span :style="'width:' + assessmentPercent + '%'" class="assessmentTypeCls" v-if="assessment.assessmentTypeValue==1"></span>
				    					</el-tooltip>
										<el-tooltip effect="light" :content="assessment.assessmentTypeExplain" placement="top">
		                					<span :style="'width:' + assessmentPercent + '%'" class="assessmentCls" v-if="assessment.assessmentTypeValue==0"></span>
					    				</el-tooltip>
	        						</div>
		                        </div>
		                    </li>
		                </ul>
          			</el-form>
                </el-card>
                
    			<!-- 评估导航  -->
                <el-menu class="leftRiftCard" @open="handleOpen" @close="handleClose" router>
	                <el-submenu :index="dictPojoList.modelCode"  v-for="(dictPojoList) in menuList" :key="dictPojoList.modelCode">
	                    <template slot="title">
		                    <i class="el-icon-menu"></i>
		                    <span>{{dictPojoList.modelName}}</span>
	                    </template>
	                    <el-submenu :index="item1.modelCode"  v-for="(item1) in dictPojoList.loginModelPojoList" :key="item1.modelCode">
		                    <template slot="title">{{item1.modelName}}</template>
		                    <el-menu-item :index={path:patientQueryIndex[item2.modelCode],query:{patientHospitId:patientBasicInfo.patientHospitId}} 
												  v-for="(item2) in item1.loginModelPojoList" :key="item2.modelCode">
													{{item2.modelName}}
												</el-menu-item>
	                    </el-submenu>
	                </el-submenu>
                </el-menu>
            </el-col>
            
        	<el-col :span="19">
        		<div class="table_container">
    				<!-- 查询  -->
         			<el-col :span="16" :offset="3">
        				<el-form ref="queryForm" :model="queryForm" label-width="150px" >
        				  <el-col :span="12" v-if="show">
			                <el-form-item label="患者住院表id" prop="patientHospitId">
			                  <el-input v-model="queryForm.patientHospitId"></el-input>
			                </el-form-item>
			              </el-col>
				          <el-col :span="12">
				            <el-form-item label="风险评估阶段" prop="assessmentStage">
				              <el-select v-model="queryForm.assessmentStage" clearable placeholder="请选择" style="width: 100%;">
				                  <el-option
				                      v-for="item in assessmentStageOptions"
				                      :key="item.value"
				                      :label="item.label"
				                      :value="item.value">
				                  </el-option>
				              </el-select>
				            </el-form-item>
				          </el-col>
				          <el-col :span="12">
				            <el-form-item label="类型" prop="assessmentType">
				              <el-select v-model="queryForm.assessmentType" clearable placeholder="请选择" style="width: 100%;">
				                  <el-option
				                      v-for="item in assessmentTypeOptions"
				                      :key="item.value"
				                      :label="item.label"
				                      :value="item.value">
				                  </el-option>
				              </el-select>
				            </el-form-item>
				          </el-col>
				          <el-col :span="12">
				            <el-form-item label="项目" prop="assessmentItem">
				              <el-select v-model="queryForm.assessmentItem" clearable placeholder="请选择" style="width: 100%;">
				                  <el-option
				                      v-for="item in assessmentItemOptions"
				                      :key="item.value"
				                      :label="item.label"
				                      :value="item.value">
				                  </el-option>
				              </el-select>
				            </el-form-item>
				          </el-col>
				          <el-col :span="12" :offset="6">
				            <el-form-item>
				              <el-button type="primary" @click="search">查询</el-button>
				              <el-button @click="reset">重置</el-button>
				            </el-form-item>
				          </el-col>
        				</el-form>
         			</el-col>
		            
    				<!-- 详情列表  -->
		            <el-table :data="tableData" max-height="460" width="100%" border highlight-current-row @current-change="handleCurrenttRowChange">
				      <el-table-column
			      	    v-if="show"
			            prop="assessmentId"
			            label="评估ID"
		            	min-width="150">
				      </el-table-column>
				      <el-table-column
				      	v-if="show"
				        prop="modelName"
				        label="评估或医嘱"
		         	    min-width="150">
				      </el-table-column>
				      <el-table-column
				        prop="createDt"
				        label="时间"
		                min-width="150">
				      </el-table-column>
				      <el-table-column
				        prop="assessmentStageExplain"
				        label="风险评估阶段"
		                min-width="150">
				      </el-table-column>
				      <el-table-column
				        prop="assessmentTypeExplain"
				        label="类型"
		                min-width="150">
				      </el-table-column>
				      <el-table-column
				        prop="assessmentItemExplain"
				        label="项目"
		                min-width="150">
				      </el-table-column>
			          <el-table-column
			            prop="resultExplain"
			            label="结果"
			            min-width="150">
			          </el-table-column>
				      <el-table-column
				        prop="assessmentScore"
		                min-width="150"
				        label="分值">
				      </el-table-column>
			          <el-table-column label="操作">
			            <template slot-scope="scope">
			              <el-button
			                size="small"
			                @click="handleQueryView(scope.row)">详情查看</el-button>
			            </template>
			          </el-table-column>
				    </el-table>
				    <div class="Pagination" style="text-align: left;margin-top: 10px;">
		                <el-pagination
			                @size-change="handleSizeChange"
			                @current-change="handleCurrentChange"
			                :current-page="currentPage"
			                :page-sizes="[10, 20, 30, 40, 50, 100]"
			                :page-size="limit"
			                layout="total, sizes, prev, pager, next, jumper"
			                :total="count">
			            </el-pagination>
		            </div>
		            
    				<!-- 详情查看弹框  -->
		            <el-dialog :title="queryViewTitle" v-model="queryViewVisible" class="queryViewCls" :close-on-click-modal="false">
		            	<!-- caprini弹框 -->
		            	<div :class="{'hideContent': queryViewCap}" >
		            		<el-col :span="queryViewCapWidth"  v-for="(item,svalue) in selectData" :key="svalue">
											 <div class="scoreHead">{{svalue}}</div>
											 <div class="leftRift" v-for="(name,index) in item" :key="index">
												<div><el-checkbox :label="name" checked disabled></el-checkbox></div>
									     </div>
										</el-col>
							<el-row class="scoreBottom"></el-row>
							<div class="scoreCenter">
								<span>{{assessmentItemExplain}}：</span><span>{{assessmentScore}}分</span> <span>{{assessmentResultExplain}}</span>
			            	</div>
			            </div>
		           
		            	<!-- geneva弹框 -->
		            
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
		        </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import headTop from '../components/exportPatient'
    import {getQueryList, getQueryCount, getPatientInfo, getQueryAssessment} from '@/api/getData'
    import {getDictData} from '@/common/dictCache'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {setSessionStorage,getSessionStorage} from '../config/mUtils'
	import menuconstants from '../constants/menuconstants'
    
    export default {
        data(){
            return {
                patientBasicInfo: {
                  patientHospitId: this.$route.query.patientHospitId,
                  patientCode: '',
                  patientNumber: '',
                  patientName: '',
                  patientSex: '',
                  patientAge: '',
                  patientDepartment: '',
                  patientArea: '',
                  patientBed: '',
                  patientDoctor: '',
                  assessmentResultExplain: '',
                  assessmentCompletionDegree: '',
               	  assessmentTypeList:[],
                },
                baseUrl,
                baseImgPath,
                tableData: [],
                offset: 0,
                limit: 10,
                count: 0,
                currentPage: 1,
                show: false,
                queryForm: {
                  patientHospitId: this.$route.query.patientHospitId,
                  assessmentStage: '',
                  assessmentType: '',
                  assessmentItem: '',
                },
                assessmentStageOptions: '',
                assessmentTypeOptions: '',
                assessmentItemOptions: '',
                striking: 'primary',
                patientSexCls: 'sexMan',
				assessmentPercent: '30',
				assessmentItemExplain:"",
                queryViewVisible: false,
                queryViewTitle: '详情查看',
                queryViewCap: false,
                queryViewDocA: true,
                assessmentScore: '',
                assessmentResultExplain: '',
                selectData: {},
                doctorAdviceRiskExplain: '',
                doctorAdviceResultExplain: '',
                doctorAdviceIsTemp: '',
                menuList:[],
				patientQueryIndex:{},
				queryViewCapWidth: 6,
            }
        },
        components: {
          headTop,
        },
		activated() {
            this.getModelMenuPojoList();
			this.getPatientDict();
			this.patientQueryIndex = menuconstants.patientQueryIndex;
			this.$refs.headTop.getQueryAssessmentStrategy(this.$route.query.patientHospitId);
		},
        methods: {
        	/* 显示详情查看弹窗 */
	       async handleQueryView(row) {
					 
							this.queryViewVisible = true;
							this.assessmentId = row.assessmentId;
							this.modelName = row.modelName;
							this.queryViewTitle = row.assessmentItemExplain + '详情';
							this.assessmentItemExplain =  row.assessmentItemExplain;
							const queryAssessment = await getQueryAssessment({assessmentId:row.assessmentId, modelName:row.modelName});
							const assessmentItem = queryAssessment.assessmentItem;
							this.assessmentResultExplain = queryAssessment.assessmentResultExplain;
							this.assessmentScore = queryAssessment.assessmentScore;
							this.doctorAdviceCent = queryAssessment.doctorAdviceCent;
							this.doctorAdviceResultExplain = queryAssessment.doctorAdviceResultExplain;
							this.doctorAdviceRiskExplain = queryAssessment.doctorAdviceRiskExplain;
							this.selectData = {};
								//queryAssessment.selectData;
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
								if( this.modelName == "advice" ){
													this.queryViewDocA = false;
													this.queryViewCap = true;
								}else if( this.modelName != "advice" ){
													this.queryViewDocA = true;
									if( assessmentItem == menuconstants.capriniDictValue ){//"Caprini评分"
														this.queryViewCap = false;
														this.queryViewCapWidth = 6;
									}else if ( assessmentItem == menuconstants.paduaDictValue){//Padua评分
														this.queryViewCap = false;
														this.queryViewCapWidth = 8;
									}else if ( assessmentItem == menuconstants.surgeryDictValue ){//外科出血风险评估
														this.queryViewCap = false;
														this.queryViewCapWidth = 12;
									}else if ( assessmentItem ==  menuconstants.internalMedicineDictValue){//"内科出血风险评估"
														this.queryViewCap = false;
														this.queryViewCapWidth = 12;
									}else if ( assessmentItem == menuconstants.drugPreventionDictValue ){ //"药物预防禁忌评估"
														this.queryViewCap = false;
														this.queryViewCapWidth = 24;
									}else if ( assessmentItem == menuconstants.mechanicalPrecautionDictValue ){ //"机械预防禁忌评估"
														this.queryViewCap = false;
														this.queryViewCapWidth = 24;
									}else if ( assessmentItem == menuconstants.wellsDVTDictValue){//"Wells评分" 
														this.queryViewCap = false;
														this.queryViewCapWidth = 12;
									}else if ( assessmentItem == menuconstants.wellsPTEDictValue){ // "简化Wells评分"
														this.queryViewCap = false;
														this.queryViewCapWidth = 24;
									}else if ( assessmentItem ==  menuconstants.genevaDictValue){//"修订版Geneva评分"
														this.queryViewCap = false;
														this.queryViewCapWidth = 12;
									}
								}
	        },
            handleOpen(key, keyPath) {
              console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
              console.log(key, keyPath);
            },
            /* 初始化 */
            async initData(){
                try{
                    const params = {
                      ...this.queryForm,
					}
          			this.getPatientInfo(params);
					const jsonString = JSON.stringify(params);
                    const countData = await getQueryCount({jsonString:jsonString});
					if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
					}
					this.getPatientQuery(jsonString);
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
              	this.limit = val;
                console.log(`每页 ${val} 条`);
				this.initData();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.initData();
            },
            /* 获取患者基本信息 */
            async getPatientInfo(params){
                try{
                	const PatientInfo = await getPatientInfo({patientHospitId:Number(params.patientHospitId)});
               		this.patientBasicInfo.patientCode = PatientInfo.patientCode;
               		this.patientBasicInfo.patientNumber = PatientInfo.patientNumber;
               		this.patientBasicInfo.patientName = PatientInfo.patientName;
               		this.patientBasicInfo.patientSex = PatientInfo.patientSex;
               		this.patientBasicInfo.patientAge = PatientInfo.patientAge;
               		this.patientBasicInfo.patientDepartment = PatientInfo.patientDepartment;
               		this.patientBasicInfo.patientArea = PatientInfo.patientArea;
               		this.patientBasicInfo.patientBed = PatientInfo.patientBed;
               		this.patientBasicInfo.patientDoctor = PatientInfo.patientDoctor;
               		this.patientBasicInfo.assessmentResultExplain = PatientInfo.assessmentResultExplain;
					this.patientBasicInfo.assessmentCompletionDegree = PatientInfo.assessmentCompletionDegree;
					this.patientBasicInfo.assessmentTypeList=[];
               		PatientInfo.assessmentTypeList.forEach(item => {
	                  const assessmentTypeList = {};
	                    assessmentTypeList.assessmentTypeExplain = item.assessmentTypeExplain,
	                    assessmentTypeList.assessmentTypeValue = item.assessmentTypeValue,
	                    assessmentTypeList.assessmentCls = item.assessmentCls,
	                    this.patientBasicInfo.assessmentTypeList.push(assessmentTypeList);
	                });
	                this.assessmentPercent = 90 / (this.patientBasicInfo.assessmentTypeList.length);
               		if(this.patientBasicInfo.assessmentResultExplain == "低危"){
               			this.striking = 'primary';
               		}else if(this.patientBasicInfo.assessmentResultExplain == "中危"){
               			this.striking = 'warning';
               		}else{
               			this.striking = 'danger';
               		};
               		if(this.patientBasicInfo.patientSex == "男"){
               			this.patientSexCls = 'sexMan';
               		}else if(this.patientBasicInfo.patientSex == "女"){
               			this.patientSexCls = 'sexWoman';
               		}
                }catch(err){
                    console.log('获取字典数据失败', err);
                }
            },
            /* 获取字典 */
            async getPatientDict(){
            	this.assessmentStageOptions = [];
            	this.assessmentTypeOptions = [];
            	this.assessmentItemOptions = [];
                try{
                    const dictLocalData = await	getDictData();
                    const assessmentStage = dictLocalData.assessmentStage;
                    const assessmentType = dictLocalData.assessmentType;
                    const assessmentItem = dictLocalData.assessmentItem;
										assessmentStage.forEach((item, index) => {
                        this.assessmentStageOptions.push({
                        	label: item.dictDataName,
                        	value: item.dictDataValue,
                        	index,
                        })
                    });
                    assessmentType.forEach((item, index) => {
                        this.assessmentTypeOptions.push({
                        	label: item.dictDataName,
                        	value: item.dictDataValue,
                        	index,
                        })
                    });
                    assessmentItem.forEach((item, index) => {
                        this.assessmentItemOptions.push({
                        	label: item.dictDataName,
                        	value: item.dictDataValue,
                        	index,
                        })
                    });
                }catch(err){
                    console.log('获取字典数据失败', err);
                }
            },
            /* 获取详情列表 */
            async getPatientQuery(jsonString){
                const PatientQuery = await getQueryList({start: this.offset, limit: this.limit, jsonString:jsonString});
				this.tableData = [];
                PatientQuery.forEach(item => {
                  const tableData = {};
                    tableData.assessmentId = item.assessmentId,
                    tableData.assessmentItemExplain = item.assessmentItemExplain,
                    tableData.resultExplain = item.resultExplain,
                    tableData.assessmentScore = item.assessmentScore,
                    tableData.assessmentStageExplain = item.assessmentStageExplain,
                    tableData.assessmentTypeExplain = item.assessmentTypeExplain,
                    tableData.createDt = item.createDt,
                    tableData.modelName = item.modelName,
                    this.tableData.push(tableData);
                })
            },
            /* 清空查询条件 */
            reset() {
              this.$refs.queryForm.resetFields();
            },
            /* 确认查询 */
            search() {
              this.initData();
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
            handleCurrenttRowChange(val) {
		        this.currentRow = val;
		    }
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
    .leftRiftCard{
      margin:20px 0px 0px 20px;
    }
    .leftRiftCard li{
      padding: 3px 0px;
      font-size: 14px;
      color: #48576a;
    }
    .leftRiftCard li span{
    	display: inline-block;
    }
    .sexMan, .sexWoman{
    	width: 20px;
    	height: 20px;
    	background: url(../assets/img/sexMan.png) 0px 2px;
    }
    .sexWoman{
    	background: url(../assets/img/sexWoman.png) 0px 2px;
    }
    .primary{
    	color: #409eff;
    	font-size: 16px;
    }
    .warning{
    	color: #e6a23c;
    	font-weight: bold;
    	font-size: 16px;
    }
    .danger{
    	color: #f56c6c;
    	font-weight: bold;
    	font-size: 16px;
    }
    .assessmentCls,
    .assessmentTypeCls{
    	height: 10px;
    	margin-right: 2%;
    	background-color: #48576a;
		}
	.assessmentTypeCls{
		background-color: #20a0ff;
	}
	.hideContent{
		display: none;
	}
	.queryViewCls .el-dialog--small{
		width: 60%;
	}
</style>