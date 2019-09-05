<template>
    <div class="fillcontain">
        <head-top ref="headTop"></head-top>
        <el-col :span="14" :offset="4" class="form_container">
          <el-form :rules="queryVteAssessmentListFormrules" :model="queryVteAssessmentListForm"  ref="queryVteAssessmentListForm" label-width="150px">
				<el-col :span="12">
				  <el-form-item label="" prop="assessmentId">
	                <el-input v-model="queryVteAssessmentListForm.assessmentId"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="" prop="patientHospitId">
	                <el-input v-model="queryVteAssessmentListForm.patientHospitId"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="患者数据编码（系统自动生成）" prop="patientCode">
	                <el-input v-model="queryVteAssessmentListForm.patientCode"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  	<el-form-item label="风险评估阶段（字典）" prop="assessmentStage">
		                <el-select v-model="queryVteAssessmentListForm.assessmentStage" clearable placeholder="请选择" style="width: 100%;">
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
				  	<el-form-item label="风险评估类型（字典）" prop="assessmentType">
		                <el-select v-model="queryVteAssessmentListForm.assessmentType" clearable placeholder="请选择" style="width: 100%;">
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
				  	<el-form-item label="风险评估项目（字典）" prop="assessmentItem">
		                <el-select v-model="queryVteAssessmentListForm.assessmentItem" clearable placeholder="请选择" style="width: 100%;">
		                  <el-option
		                      v-for="item in assessmentItemOptions"
		                      :key="item.value"
		                      :label="item.label"
		                      :value="item.value">
		                  </el-option>
		                </el-select>
		              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  	<el-form-item label="风险评估结果（字典）" prop="assessmentResult">
		                <el-select v-model="queryVteAssessmentListForm.assessmentResult" clearable placeholder="请选择" style="width: 100%;">
		                  <el-option
		                      v-for="item in assessmentResultOptions"
		                      :key="item.value"
		                      :label="item.label"
		                      :value="item.value">
		                  </el-option>
		                </el-select>
		              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="风险评估分值（数）" prop="assessmentScore">
	                <el-input v-model="queryVteAssessmentListForm.assessmentScore"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="" prop="assessmentSelectData">
	                <el-input v-model="queryVteAssessmentListForm.assessmentSelectData"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="" prop="assessmentFrom">
	                <el-input v-model="queryVteAssessmentListForm.assessmentFrom"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="" prop="assessmentStatus">
	                <el-input v-model="queryVteAssessmentListForm.assessmentStatus"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="" prop="assessmentIsTemp">
	                <el-input v-model="queryVteAssessmentListForm.assessmentIsTemp"></el-input>
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
        <div class="table_container">
          <el-table
            :data="tableData"
            max-height="460"
            border>
            	 <el-table-column   prop="assessmentId"  label=""  min-width="150">  </el-table-column>
            	 <el-table-column   prop="patientHospitId"  label=""  min-width="150">  </el-table-column>
            	 <el-table-column   prop="patientCode"  label="患者数据编码（系统自动生成）"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="assessmentStage"  label="风险评估阶段（字典）"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="assessmentType"  label="风险评估类型（字典）"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="assessmentItem"  label="风险评估项目（字典）"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="assessmentResult"  label="风险评估结果（字典）"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="assessmentScore"  label="风险评估分值（数）"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="assessmentSelectData"  label=""  min-width="150">  </el-table-column>
            	 <el-table-column   prop="assessmentFrom"  label=""  min-width="150">  </el-table-column>
            	 <el-table-column   prop="assessmentStatus"  label=""  min-width="150">  </el-table-column>
            	 <el-table-column   prop="assessmentIsTemp"  label=""  min-width="150">  </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="80">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="Pagination" style="text-align: left;margin-top: 10px;">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40, 50, 100]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="count">
              </el-pagination>
          </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../managecomponents/addVteAssessment'
    import {getVteAssessmentList, getVteAssessmentCount, addVteAssessment} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getDictData} from '@/common/dictCache'
    import { debug } from 'util';

    
    export default {
        data(){
            return {
                queryVteAssessmentListForm: {
							 assessmentId:'',
							 patientHospitId:'',
							 patientCode:'',
							 assessmentStage:'',
							 assessmentType:'',
							 assessmentItem:'',
							 assessmentResult:'',
							 assessmentScore:'',
							 assessmentSelectData:'',
							 assessmentFrom:'',
							 assessmentStatus:'',
							 assessmentIsTemp:''
                },
                queryVteAssessmentListFormrules: {
                   
		            },
                baseUrl,
                baseImgPath,
                tableData: [],
                currentPage: 1,
                offset: 0,
                limit: 10,
                count: 0
            }
        },
        components: {
          headTop,
        },
        created(){
            this.initData();
        },
        methods: {
            async initData(){
                try{
                    const params = {
                      ...this.queryVteAssessmentListForm
                    }
                    const jsonString = JSON.stringify(params);
                    const countData = await getVteAssessmentCount({jsonString:jsonString});
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getVteAssessments(jsonString);
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
	          handleClick(row) {
              this.$refs.headTop.vteAssessmentFormVisible = true;
              			this.$refs.headTop.addVteAssessmentForm.assessmentId = row.assessmentId;
              			this.$refs.headTop.addVteAssessmentForm.patientHospitId = row.patientHospitId;
              			this.$refs.headTop.addVteAssessmentForm.patientCode = row.patientCode;
              			this.$refs.headTop.addVteAssessmentForm.assessmentStage = row.assessmentStage;
              			this.$refs.headTop.addVteAssessmentForm.assessmentType = row.assessmentType;
              			this.$refs.headTop.addVteAssessmentForm.assessmentItem = row.assessmentItem;
              			this.$refs.headTop.addVteAssessmentForm.assessmentResult = row.assessmentResult;
              			this.$refs.headTop.addVteAssessmentForm.assessmentScore = row.assessmentScore;
              			this.$refs.headTop.addVteAssessmentForm.assessmentSelectData = row.assessmentSelectData;
              			this.$refs.headTop.addVteAssessmentForm.assessmentFrom = row.assessmentFrom;
              			this.$refs.headTop.addVteAssessmentForm.assessmentStatus = row.assessmentStatus;
              			this.$refs.headTop.addVteAssessmentForm.assessmentIsTemp = row.assessmentIsTemp;
	        },
            handleSizeChange(val) {
              this.limit = val;
              console.log(`每页 $#{val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.initData();
            },
            reset() {
              this.$refs.queryVteAssessmentListForm.resetFields();
            },
            search() {
              this.initData();
            },
            async getVteAssessments(jsonString){
                const Users = await getVteAssessmentList({offset: this.offset, limit: this.limit,jsonString:jsonString});
                this.tableData = [];
                Users.forEach(item => {
                  const tableData = {};
				   		tableData.assessmentId = item.assessmentId;
				   		tableData.patientHospitId = item.patientHospitId;
				   		tableData.patientCode = item.patientCode;
				   		tableData.assessmentStage = item.assessmentStage;
				   		tableData.assessmentType = item.assessmentType;
				   		tableData.assessmentItem = item.assessmentItem;
				   		tableData.assessmentResult = item.assessmentResult;
				   		tableData.assessmentScore = item.assessmentScore;
				   		tableData.assessmentSelectData = item.assessmentSelectData;
				   		tableData.assessmentFrom = item.assessmentFrom;
				   		tableData.assessmentStatus = item.assessmentStatus;
				   		tableData.assessmentIsTemp = item.assessmentIsTemp;
                    this.tableData.push(tableData);
                })
            },
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
</style>

