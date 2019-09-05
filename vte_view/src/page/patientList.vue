<template>
    <div class="fillcontain">
    	<!-- head，面包屑，添加患者  -->
        <head-top ref="headTop"></head-top>
        
    	<!-- 查询  -->
        <el-button @click="expand" class="btnRight"><i :class="arrowIcon"></i></el-button>
        <el-col :span="14" :offset="4" class="form_container">
          <el-form ref="patientForm" :model="patientForm" label-width="150px">
            <el-col :span="12">
              <el-form-item label="住院号" prop="patientCode">
                <el-input v-model="patientForm.patientCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="病案号" prop="patientNumber">
                <el-input v-model="patientForm.patientNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名" prop="patientName">
                <el-input v-model="patientForm.patientName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证号" prop="patientIdCode">
                <el-input v-model="patientForm.patientIdCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="已完成VTE风险评估" prop="patientIsRisk">
                <el-select v-model="patientForm.patientIsRisk" clearable placeholder="请选择" style="width: 100%;">
                  <el-option
                      v-for="item in patientIsRiskOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" :class="{'hideContent': use}">
              <el-form-item label="性别" prop="patientSex">
                <el-input v-model="patientForm.patientSex"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :class="{'hideContent': use}">
              <el-form-item label="年龄" prop="patientAge">
                <el-input v-model="patientForm.patientAge"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :class="{'hideContent': use}">
              <el-form-item label="籍贯" prop="patientNativePlace">
                <el-input v-model="patientForm.patientNativePlace"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :class="{'hideContent': use}">
              <el-form-item label="民族" prop="patientNation">
                <el-input v-model="patientForm.patientNation"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :class="{'hideContent': use}">
              <el-form-item label="职业" prop="patientJob">
                <el-input v-model="patientForm.patientJob"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :class="{'hideContent': use}">
              <el-form-item label="婚姻状况" prop="patientMarital">
                <el-input v-model="patientForm.patientMarital"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :class="{'hideContent': use}">
              <el-form-item label="手机号" prop="patientPhoneNumber">
                <el-input v-model="patientForm.patientPhoneNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :class="{'hideContent': use}">
              <el-form-item label="科室" prop="patientDepartment">
                <el-input v-model="patientForm.patientDepartment"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :class="{'hideContent': use}">
              <el-form-item label="病区" prop="patientArea">
                <el-input v-model="patientForm.patientArea"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :class="{'hideContent': use}">
              <el-form-item label="病床" prop="patientBed">
                <el-input v-model="patientForm.patientBed"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :class="{'hideContent': use}">
              <el-form-item label="责任医生" prop="patientDoctor">
                <el-input v-model="patientForm.patientDoctor"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :class="{'hideContent': use}">
              <el-form-item label="Caprini风险等级" prop="patientCapriniGrade">
                <el-select v-model="patientForm.patientCapriniGrade" clearable placeholder="请选择" style="width: 100%;">
                  <el-option
                      v-for="item in patientCapriniGradeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" :class="{'hideContent': use}">
              <el-form-item label="Padua风险等级" prop="patientPaduaGrade">
                <el-select v-model="patientForm.patientPaduaGrade" clearable placeholder="请选择" style="width: 100%;">
                  <el-option
                      v-for="item in patientPaduaGradeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" :class="{'hideContent': use}">
              <el-form-item label="入院时间" prop="patientInHospital">
                <el-col :span="11">
                  <el-date-picker type="date" :picker-options="pickerOptionsin1" v-model="patientForm.patientInHospitalStart" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-date-picker type="date" :picker-options="pickerOptionsin2" v-model="patientForm.patientInHospitalEnd" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12" :class="{'hideContent': use}">
              <el-form-item label="出院时间" prop="patientOutHospital">
                <el-col :span="11">
                  <el-date-picker type="date" :picker-options="pickerOptionsout1" v-model="patientForm.patientOutHospitalStart" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-date-picker type="date" :picker-options="pickerOptionsout2" v-model="patientForm.patientOutHospitalEnd" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12" :class="{'hideContent': use}">
              <el-form-item label="最进一次评估时间" prop="patientLastRiskDate">
                <el-col :span="11">
                  <el-date-picker type="date" :picker-options="pickerOptionslast1" v-model="patientForm.patientLastRiskDateStart" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-date-picker type="date" :picker-options="pickerOptionslast2" v-model="patientForm.patientLastRiskDateEnd" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12" :class="{'hideContent': use}">
              <el-form-item label="评估人" prop="patientLastRiskUser">
                <el-input v-model="patientForm.patientLastRiskUser"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="8">
              <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
              <el-button @click="reset">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
        
    	<!-- 患者列表  -->
        <div class="table_container">
          <el-table :data="tableData" max-height="460" border highlight-current-row @current-change="handleCurrenttRowChange">
            <el-table-column
              label="序号"
		      type="index"
		      width="80">
		    </el-table-column>
            <el-table-column
              prop="patientFrom"
              label="患者来源"
		      v-if="show"
              min-width="150">
            </el-table-column>
            <el-table-column
              prop="patientHospitId"
              label="患者住院表id"
		      v-if="show"
              min-width="150">
            </el-table-column>
            <el-table-column
              prop="patientId"
              label="患者表id"
		      v-if="show"
              min-width="150">
            </el-table-column>
            <el-table-column
              prop="patientSynGrade"
              label="患者数据综合评分结果"
		      v-if="show"
              min-width="150">
            </el-table-column>
            <el-table-column
              prop="patientInHospital"
              label="入院时间"
              value-format="yyyy-MM-dd"
              min-width="150">
            </el-table-column>
            <el-table-column
              prop="patientOutHospital"
              label="出院时间"
              value-format="yyyy-MM-dd"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="patientCode"
              label="住院号"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="patientNumber"
              label="病案号"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="patientName"
              label="姓名"
              min-width="120">
              <template slot-scope="scope">
                <el-button type="text" @click="handleClick(scope.row)" size="small">{{scope.row.patientName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="patientSex"
              label="性别"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="patientAge"
              label="年龄"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="patientNativePlace"
              label="籍贯"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="patientNation"
              label="民族"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="patientJob"
              label="职业"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="patientMarital"
              label="婚姻状况"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="patientIdCode"
              label="身份证号"
              min-width="160">
            </el-table-column>
            <el-table-column
              prop="patientPhoneNumber"
              label="手机号"
              min-width="150">
            </el-table-column>
            <el-table-column
              prop="patientDepartment"
              label="科室"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="patientArea"
              label="病区"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="patientBed"
              label="病床"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="patientDoctor"
              label="责任医生"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="patientIsRisk"
              label="是否完成VTE风险评估"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="patientCapriniGrade"
              label="Caprini风险等级"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="patientPaduaGrade"
              label="Padua风险等级"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="patientLastRiskDate"
              label="最近一次评估时间"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="patientLastRiskUser"
              label="评估人"
              min-width="120">
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
        </div>
    </div>
</template>

<script>
    import headTop from '../components/addPatient'
    import {getPatientList, getPatientCount, addPatient} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getDictData} from '@/common/dictCache'
	import {mapActions, mapState} from 'vuex'
	
    export default {
        inject: ['reload'],
        data(){
            return {
                patientForm: {
                  patientFrom: '',
                  patientHospitId: '',
                  patientId: '',
                  patientSynGrade: '',
                  patientCode: '',
                  patientNumber: '',
                  patientName: '',
                  patientIdCode: '',
                  patientIsRisk: '',
                  patientSex: '',
                  patientAge: '',
                  patientNativePlace: '',
                  patientNation: '',
                  patientJob: '',
                  patientMarital: '',
                  patientPhoneNumber: '',
                  patientDepartment: '',
                  patientArea: '',
                  patientBed: '',
                  patientDoctor: '',
                  patientCapriniGrade: '',
                  patientPaduaGrade: '',
                  patientInHospital: '',
                  patientOutHospital: '',
                  patientLastRiskDate: '',
                  patientLastRiskUser: ''
                },
                pickerOptionsin1: {
					firstDayOfWeek: 1
				},
                pickerOptionsin2: {
					firstDayOfWeek: 1
				},
                pickerOptionsout1: {
					firstDayOfWeek: 1
				},
                pickerOptionsout2: {
					firstDayOfWeek: 1
				},
                pickerOptionslast1: {
					firstDayOfWeek: 1
				},
                pickerOptionslast2: {
					firstDayOfWeek: 1
				},
                patientIsRiskOptions: [],
                patientCapriniGradeOptions: [],
                patientPaduaGradeOptions: [],
                baseUrl,
                baseImgPath,
                tableData: [],
                currentPage: 1,
                offset: 0,
                limit: 10,
                count: 0,
                use: true,
                show: false,
                arrowIcon: 'el-icon-arrow-down',
            }
        },
        created(){
            this.initData();
        },
        components: {
          headTop,
        },
        methods: {
        	/* 初始化 */
            async initData(){
                try{
                    const params = {
                      ...this.patientForm
                    }
                    const jsonString = JSON.stringify(params);
                    const countData = await getPatientCount({jsonString:jsonString});
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getPatientDict();
                    this.getUsers(jsonString);
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            /* 跳转患者详情 */
	        handleClick(row) {
            	this.reload();
	        	this.$router.push({ 
	        		path: '/patientQuery',
	        		query: { patientHospitId: row.patientHospitId }
            	});
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
            /* 获取字典 */
            async getPatientDict(){
            	this.patientIsRiskOptions = [];
            	this.patientCapriniGradeOptions = [];
            	this.patientPaduaGradeOptions = [];
                try{
                    const dictLocalData = await	getDictData();
                    const patientIsRisk = dictLocalData.patientIsRisk;
                    const patientCapriniGrade = dictLocalData.patientCapriniGrade;
                    const patientPaduaGrade = dictLocalData.patientPaduaGrade;
                    patientIsRisk.forEach((item, index) => {
                        this.patientIsRiskOptions.push({
                        	label: item.dictDataName,
                        	value: item.dictDataValue,
                        	index,
                        })
                    });
                    patientCapriniGrade.forEach((item, index) => {
                        this.patientCapriniGradeOptions.push({
                        	label: item.dictDataName,
                        	value: item.dictDataValue,
                        	index,
                        })
                    });
                    patientPaduaGrade.forEach((item, index) => {
                        this.patientPaduaGradeOptions.push({
                        	label: item.dictDataName,
                        	value: item.dictDataValue,
                        	index,
                        })
                    });
                }catch(err){
                    console.log('获取字典数据失败', err);
                }
            },
            /* 获取患者列表 */
            async getUsers(jsonString){
                const Users = await getPatientList({offset: this.offset, limit: this.limit, jsonString:jsonString});
                this.tableData = [];
                Users.forEach(item => {
                  const tableData = {};
                    tableData.patientHospitId = item.patientHospitId,
                    tableData.patientId = item.patientId,
                    tableData.patientSynGrade = item.patientSynGrade,
                    tableData.patientCode = item.patientCode,
                    tableData.patientNumber = item.patientNumber,
                    tableData.patientName = item.patientName,
                    tableData.patientIdCode = item.patientIdCode,
                    tableData.patientIsRisk = item.patientIsRiskExplain,
                    tableData.patientSex = item.patientSex,
                    tableData.patientAge = item.patientAge,
                    tableData.patientNativePlace = item.patientNativePlace,
                    tableData.patientNation = item.patientNation,
                    tableData.patientJob = item.patientJob,
                    tableData.patientMarital = item.patientMarital,
                    tableData.patientPhoneNumber = item.patientPhoneNumber,
                    tableData.patientDepartment = item.patientDepartment,
                    tableData.patientArea = item.patientArea,
                    tableData.patientBed = item.patientBed,
                    tableData.patientDoctor = item.patientDoctor,
                    tableData.patientCapriniGrade = item.patientCapriniGradeExplain,
                    tableData.patientPaduaGrade = item.patientPaduaGradeExplain,
                    tableData.patientInHospital = item.patientInHospital,
                    tableData.patientOutHospital = item.patientOutHospital,
                    tableData.patientLastRiskDate = item.patientLastRiskDate,
                    tableData.patientLastRiskUser = item.patientLastRiskUser,
                    this.tableData.push(tableData);
                })
            },
            /* 清空查询条件 */
            reset() {
              this.$refs.patientForm.resetFields();
            },
            /* 确认查询 */
            search() {
              this.initData();
            },
            /* 查询条件展开 */
            expand() {
            	this.use = !this.use;
            	if(this.use == true){
            		this.arrowIcon = "el-icon-arrow-down";
            	}else{
            		this.arrowIcon = "el-icon-arrow-up";
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
    .form_container{
      padding-top: 20px;
    }
    .line{
      text-align: center;
    }
    .hideContent{
      display: none;
    }
    .btnRight{
    	margin-top: 20px;
    	margin-right: 60px;
    	float: right;
    }
</style>

