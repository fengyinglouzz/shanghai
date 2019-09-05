<template>
    <div class="fillcontain">
    	<!-- head，时间  -->
        <head-top ref="headTop"></head-top>
        
        <!-- KPI监测 -->
        <div class="kpimonitor">
        	<p class="kpiTitle">KPI监测</p>
			<el-row :gutter="20" style="margin-bottom: 10px;">
				<el-col :span="19">
					<kpi ref="kpi" :sevenDate='sevenDate' :sevenDay='sevenDay'></kpi>
				</el-col>
				<el-col :span="5">
					<div class="data_list" style="margin-top: 60px;">
						<el-select v-model="kpiDepValue" @change="changekpiDepValue(kpiDepValue)">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</div>
					<div class="data_list">患者人数：<span class="data_num">{{numberPatient}}</span></div>
					<div class="data_list">发病率：<span class="data_num">{{onsetOfNumberPatient}}%</span></div>
					<div class="data_list">VTE风险评估率：<span class="data_num">{{vteRiskAssessmentPatient}}%</span></div>
					<div class="data_list">出血风险评估率：<span class="data_num">{{bleedingRiskAssessmentPatient}}%</span></div>
				</el-col>
			</el-row>
		</div>
        
        <!-- 中高危患者预防  -->
        <div class="prevention">
        	<p class="preventionTitle">中高危患者预防</p>
        	<el-row :gutter="20">
		    	<!-- 中高危患者数  -->
		        <el-col :span="12">
					<header class="section_title">中高危患者数</header>
					<patientrisk ref="patientrisk" ></patientrisk>
		        </el-col>
		        
		    	<!-- 预防措施率  -->
		        <el-col :span="12">
					<header class="section_title">预防措施率</header>
					<preventionrisk  ref="preventionrisk" ></preventionrisk>
		        </el-col>
        	</el-row>
		</div>
		
    	<!-- VTE风险评估质量  -->
        <el-col :span="12">
	        <div class="vteRisk">
	        	<p class="vteRiskTitle">VTE风险评估质量</p>
				<header class="section_title">完成VTE风险评估患者数</header>
				<vterisk ref="vterisk"></vterisk>
			</div>
        </el-col>
        
    	<!-- 出血风险评估质量  -->
        <el-col :span="12">
	        <div class="bleedRisk">
	        	<p class="bleedRiskTitle">出血风险评估质量</p>
				<header class="section_title">完成出血风险评估患者数</header>
				<bleedrisk ref="bleedrisk"></bleedrisk>
			</div>
        </el-col>
        
    	<!-- 患病情况  -->
        <el-col :span="12">
	        <div class="morbidity">
	        	<div class="morbidityTitle">患病情况
					<el-radio-group v-model="resultType" @change="changeVTEActive(resultType)">
						<el-radio-button :label="1">VTE ( DVT+PTE ) </el-radio-button>
						<el-radio-button :label="2">DVT</el-radio-button>
						<el-radio-button :label="3">PTE</el-radio-button>
					</el-radio-group>
	        	</div>
				<morbidity ref="morbidity"></morbidity>
			</div>
        </el-col>
    </div>
</template>

<script>
    import headTop from '../components/qualityHead'
    import {baseUrl, baseImgPath} from '@/config/env'
	import kpi from '../components/kpi' 
	import patientrisk from '../components/patientrisk'  
	import preventionrisk from '../components/preventionrisk'
	import morbidity from '../components/morbidity' 
	import vterisk from '../components/vterisk'
	import bleedrisk from '../components/bleedrisk'
	import dtime from 'time-formater'
	import {getQualityViewKpi,getQualityViewRiskPatient,getQualityViewRatePatient,getQualityViewRiskAssessment,getQualityViewBleedingRisk,getQualityViewPrevalence} from '@/api/getData'
	
    export default {
        data(){
            return {
                baseUrl,
                baseImgPath,
				options: [{
					value: '全部',
					label: '全院',
				}],
				numberPatient:0,
				onsetOfNumberPatient:0,
				vteRiskAssessmentPatient:0,
				bleedingRiskAssessmentPatient:0,
				resultType :"1",
        		kpiDepValue: '全部'
            }
        },
        components: {
            headTop,
    		kpi,
    		patientrisk,
    		preventionrisk,
    		vterisk,
    		bleedrisk,
    		morbidity,
        },
    	mounted(){
    		this.initData();
    	},
    	methods: {
    		async initData(){
				var dateStr = this.getDateString(); 
				var dateType = "";
				if(this.$refs.headTop && this.$refs.headTop.active){
					dateType = this.$refs.headTop.active;
				}
				if(this.$refs.patientrisk.initData){
					this.loadKpiData(dateStr,dateType);
				}
				this.loadpatientriskData(dateStr,dateType);
				if(this.$refs.preventionrisk.initData){
					this.loadpreventionriskData(dateStr,dateType);
				}
				if(this.$refs.vterisk.initData){
					this.loadvteriskData(dateStr,dateType);
				}
				if(this.$refs.bleedrisk.initData){
					this.loadbleedriskData(dateStr,dateType);
				}
				if(this.$refs.morbidity.nwData){
					this.loadmorbidityData(dateStr,dateType);
				}
			},
			getDateString(){
				var dateStr = ""; 
				var dateType = "3";
				if(this.$refs.headTop && this.$refs.headTop.active){
					dateType = this.$refs.headTop.active;
				}
				//this.$refs.headTop.active;
				if(dateType == '1' && this.$refs.headTop.yearTime){
					dateStr = this.$refs.headTop.yearTime.getFullYear();
				}else if(dateType == '2' && this.$refs.headTop.monthTime){
					dateStr = this.$refs.headTop.monthTime.getFullYear() + "-";
					const mouthc = this.$refs.headTop.monthTime.getMonth() + 1;
					if(mouthc<=9){
						dateStr = dateStr+"0";
					}
					dateStr = dateStr+mouthc;
				}else if(dateType == '3' && this.$refs.headTop.weekTime){
					
					dateStr = this.$refs.headTop.weekTime.getFullYear() + "-";
					const mouthc = this.$refs.headTop.weekTime.getMonth() + 1;
					if(mouthc<=9){
						dateStr = dateStr+"0";
					}
					dateStr = dateStr+mouthc + "-" ;
					const datec = this.$refs.headTop.weekTime.getDate();
					if(datec<=9){
						dateStr = dateStr+"0";
					}
					dateStr = dateStr+datec;
				}
				return dateStr;
			},
			changeVTEActive(val){
				this.resultType = val;
				var dateStr = this.getDateString(); 
				var dateType = "";
				if(this.$refs.headTop && this.$refs.headTop.active){
					dateType = this.$refs.headTop.active;
				}
				this.loadmorbidityData(dateStr,dateType);
			},
			changekpiDepValue(val){
				var dateStr = this.getDateString(); 
				var dateType = "";
				if(this.$refs.headTop && this.$refs.headTop.active){
					dateType = this.$refs.headTop.active;
				}
				this.kpiDepValue = val;
				this.loadKpiData(dateStr,dateType);
			},
			async loadKpiData(dateStr,dateType){
				//if(dateStr!=null&&dateStr!=""){
					var patientDepartment = this.kpiDepValue;
					const params = {};
						  params.date = dateStr;
						  params.dateType = dateType;
					const jsonString = JSON.stringify(params);
					const result = await getQualityViewKpi({jsonString:jsonString});
					const department = result.department;
					const numberPatient  = result.numberPatient;
					const onsetOfNumberPatient  = result.onsetOfNumberPatient;
					const vteRiskAssessmentPatient  = result.vteRiskAssessmentPatient;
					const bleedingRiskAssessmentPatient = result.bleedingRiskAssessmentPatient;
					const departments = department.split(",");
					this.$refs.kpi.initData(departments,
						numberPatient.split(","),
						onsetOfNumberPatient.split(","),
						vteRiskAssessmentPatient.split(","),
						bleedingRiskAssessmentPatient.split(","));
					this.options =[{
							value: '全部',
							label: '全院'
						}];
					for(var i=0;i<departments.length;i++){
						this.options.push({
							label: departments[i],
							value: departments[i]
						})
					};
					if( this.kpiDepValue == "全部" ){
						this.bleedingRiskAssessmentPatient	 = result.bleedingRiskAssessmentPatientAll;
						this.numberPatient  = result.numberPatientAll;
						this.onsetOfNumberPatient  = result.onsetOfNumberPatientAll;
						this.vteRiskAssessmentPatient  = result.vteRiskAssessmentPatientAll;
					}else{
						const departmentArr = result.department.split(',');
						const bleedingRiskAssessmentPatientArr = result.bleedingRiskAssessmentPatient.split(',');
						const numberPatientArr = result.numberPatient.split(',');
						const onsetOfNumberPatientArr = result.onsetOfNumberPatient.split(',');
						const vteRiskAssessmentPatientArr = result.vteRiskAssessmentPatient.split(',');
						const indexval = departmentArr.indexOf(this.kpiDepValue);
						this.bleedingRiskAssessmentPatient	 = bleedingRiskAssessmentPatientArr[indexval];
						this.numberPatient  = numberPatientArr[indexval];
						this.onsetOfNumberPatient  = onsetOfNumberPatientArr[indexval];
						this.vteRiskAssessmentPatient  = vteRiskAssessmentPatientArr[indexval];
					}
				//}
			},
			async loadpatientriskData(dateStr,dateType){
				//if(dateStr!=null&&dateStr!=""){
					const params = {};
						  params.date = dateStr;
						  params.dateType = dateType;
					const jsonString = JSON.stringify(params);
					const result = await getQualityViewRiskPatient({jsonString:jsonString});
					const capriniHighRisk	 = result.capriniHighRisk;
					const capriniMiddleRisk  = result.capriniMiddleRisk;
					const department  = result.department;
					const paduaHighRisk  = result.paduaHighRisk;
					this.$refs.patientrisk.initData(department.split(","),
						capriniHighRisk.split(","),
						capriniMiddleRisk.split(","),
						paduaHighRisk.split(","));
			//	}
			},
			async loadpreventionriskData(dateStr,dateType){
			//	if(dateStr!=null&&dateStr!=""){
					const params = {};
						  params.date = dateStr;
						  params.dateType = dateType;
					const jsonString = JSON.stringify(params);
					const result = await getQualityViewRatePatient({jsonString:jsonString});
					const mechanicalPreventiveRate = result.mechanicalPreventiveRate;
					const medicinePreventiveRate = result.medicinePreventiveRate;
					const department= result.department;
					this.$refs.preventionrisk.initData(
						department.split(","),
						mechanicalPreventiveRate.split(","),
						medicinePreventiveRate.split(","));
			//	}
			},
			async loadvteriskData(dateStr,dateType){
			//	if(dateStr!=null&&dateStr!=""){
					const params = {};
						  params.date = dateStr;
						  params.dateType = dateType;
					const jsonString = JSON.stringify(params);
					const result = await getQualityViewRiskAssessment({jsonString:jsonString});
					const oneDayVteRiskAssessmentRate = result.oneDayVteRiskAssessmentRate;
					const middleHighRiskRate = result.middleHighRiskRate;
					const vteRiskAssessmentPatientSum = result.vteRiskAssessmentPatientSum;
					const department= result.department;
					const vteRiskAssessmentPatient = [];
					if(department!=null&&department!=""){
						for(var i=0;i<department.split(",").length;i++){
							vteRiskAssessmentPatient.push({
	                        	name: department.split(",")[i],
	                        	value: vteRiskAssessmentPatientSum.split(",")[i]
	                        })
						}
					}
					if(department==""||department==null){
						this.$refs.vterisk.initData([],[],[],[]);
					}else{
						this.$refs.vterisk.initData(
							department.split(","),
							middleHighRiskRate.split(","),
							oneDayVteRiskAssessmentRate.split(","),
							vteRiskAssessmentPatient);
					}
			//	}
			},
			async loadbleedriskData(dateStr,dateType){
			//	if(dateStr!=null&&dateStr!=""){
					const params = {};
						  params.date = dateStr;
						  params.dateType = dateType;
					const jsonString = JSON.stringify(params);
					const result = await getQualityViewBleedingRisk({jsonString:jsonString});
					const bleedingSum = result.bleedingSum;
					const oneDayBleedingRate = result.oneDayBleedingRate;
					const recentlyBleedingRate = result.recentlyBleedingRate;
					const department= result.department;
					const bleeding = [];
					if(department!=null&&department!=""){
						for(var i=0;i<department.split(",").length;i++){
							bleeding.push({
	                        	name: department.split(",")[i],
	                        	value: bleedingSum.split(",")[i]
	                        })
						}
					}
					if(department==""||department==null){
						this.$refs.bleedrisk.initData([],[],[],[]);
					}else{
						this.$refs.bleedrisk.initData(
							department.split(","),
							bleeding,
							oneDayBleedingRate.split(","),
							recentlyBleedingRate.split(","));
					}
			//	}
			},
			async loadmorbidityData (dateStr,dateType){
			//	if(dateStr!=null&&dateStr!=""){
					const params = {};
						  params.date = dateStr;
						  params.dateType = dateType;
						  if(this.resultType =="1"){
							 params.resultType = "VTE";
						  }else if(this.resultType =="2"){
							  params.resultType = "DVT";
						  }else if(this.resultType =="3"){
							  params.resultType = "PTE";
						  }
						  
					const jsonString = JSON.stringify(params);
					const result = await getQualityViewPrevalence({jsonString:jsonString});
					const count = result.count;
					const countN = result.countN;
					const countNw = result.countNw;
					const countW = result.countW;
					const department = result.department;
					const departmentN= result.departmentN;
					const departmentNw = result.departmentNw;
					const departmentW= result.departmentW;
					this.$refs.morbidity.nwData = [];
					if(departmentNw!=null&&departmentNw!=""){
						for(var i=0;i<departmentNw.split(",").length;i++){
							this.$refs.morbidity.nwData.push({
								name: departmentNw.split(",")[i],
								value: countNw.split(",")[i]
							})
						}
					}
					this.$refs.morbidity.data = [];
					if(department!=null&&department!=""){
						for(var i=0;i<department.split(",").length;i++){
							this.$refs.morbidity.data.push({
								name: department.split(",")[i],
								value: count.split(",")[i]
							})
						}
					}
					this.$refs.morbidity.wData = [];
					if(departmentW!=null&&departmentW!=""){
						for(var i=0;i<departmentW.split(",").length;i++){
							this.$refs.morbidity.wData.push({
								name: departmentW.split(",")[i],
								value: countW.split(",")[i]
							})
						}
					}
					this.$refs.morbidity.nData = [];
					if(departmentN!=null&&departmentN!=""){
						for(var i=0;i<departmentN.split(",").length;i++){
							this.$refs.morbidity.nData.push({
								name: departmentN.split(",")[i],
								value: countN.split(",")[i]
							})
						}
					}
					this.$refs.morbidity.initData(this.$refs.morbidity.nwData,this.$refs.morbidity.data,this.$refs.morbidity.nData,this.$refs.morbidity.wData);
			//	}
			}
    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
    .kpimonitor, .prevention, .vteRisk, .bleedRisk, .morbidity{
    	border: 1px solid #d1dbe5;
    	margin: 20px 20px 40px;
    }
    .vteRisk, .bleedRisk, .morbidity{
    	margin: 0px 20px 40px;
    }
    .kpiTitle, .preventionTitle, .vteRiskTitle, .bleedRiskTitle, .morbidityTitle{
    	border-bottom: 1px solid #d1dbe5;
    	color: #48576a;
    	font-size: 14px;
    	padding: 10px 20px;
    }
    .morbidityTitle{
    	line-height: 36px;
    }
    .data_list{
    	margin-top: 20px;
    	color: #48576a;
    	font-size: 14px;
    }
    .section_title{
    	color: #48576a;
    	font-size: 14px;
    	text-align: center;
    	line-height: 28px;
    }
</style>



