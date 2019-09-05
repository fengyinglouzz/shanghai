<template>
    <div class="fillcontain">
        <head-top ref="headTop"></head-top>
        <el-col :span="14" :offset="4" class="form_container">
          <el-form :rules="queryVteDoctorAdviceListFormrules" :model="queryVteDoctorAdviceListForm"  ref="queryVteDoctorAdviceListForm" label-width="150px">
				<el-col :span="12">
				  <el-form-item label="" prop="doctorAdviceId">
	                <el-input v-model="queryVteDoctorAdviceListForm.doctorAdviceId"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="" prop="patientHospitId">
	                <el-input v-model="queryVteDoctorAdviceListForm.patientHospitId"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="患者数据编码（系统自动生成）" prop="patientCode">
	                <el-input v-model="queryVteDoctorAdviceListForm.patientCode"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  	<el-form-item label="医嘱处理诊断结果（字典）" prop="doctorAdviceResult">
		                <el-select v-model="queryVteDoctorAdviceListForm.doctorAdviceResult" clearable placeholder="请选择" style="width: 100%;">
		                  <el-option
		                      v-for="item in doctorAdviceResultOptions"
		                      :key="item.value"
		                      :label="item.label"
		                      :value="item.value">
		                  </el-option>
		                </el-select>
		              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="" prop="doctorAdviceRisk">
	                <el-input v-model="queryVteDoctorAdviceListForm.doctorAdviceRisk"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="医嘱处理医嘱（文）" prop="doctorAdviceCent">
	                <el-input v-model="queryVteDoctorAdviceListForm.doctorAdviceCent"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="" prop="doctorAdviceIsTemp">
	                <el-input v-model="queryVteDoctorAdviceListForm.doctorAdviceIsTemp"></el-input>
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
            	 <el-table-column   prop="doctorAdviceId"  label=""  min-width="150">  </el-table-column>
            	 <el-table-column   prop="patientHospitId"  label=""  min-width="150">  </el-table-column>
            	 <el-table-column   prop="patientCode"  label="患者数据编码（系统自动生成）"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="doctorAdviceResult"  label="医嘱处理诊断结果（字典）"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="doctorAdviceRisk"  label=""  min-width="150">  </el-table-column>
            	 <el-table-column   prop="doctorAdviceCent"  label="医嘱处理医嘱（文）"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="doctorAdviceIsTemp"  label=""  min-width="150">  </el-table-column>
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
    import headTop from '../managecomponents/addVteDoctorAdvice'
    import {getVteDoctorAdviceList, getVteDoctorAdviceCount, addVteDoctorAdvice} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getDictData} from '@/common/dictCache'
    import { debug } from 'util';

    
    export default {
        data(){
            return {
                queryVteDoctorAdviceListForm: {
							 doctorAdviceId:'',
							 patientHospitId:'',
							 patientCode:'',
							 doctorAdviceResult:'',
							 doctorAdviceRisk:'',
							 doctorAdviceCent:'',
							 doctorAdviceIsTemp:''
                },
                queryVteDoctorAdviceListFormrules: {
                   
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
                      ...this.queryVteDoctorAdviceListForm
                    }
                    const jsonString = JSON.stringify(params);
                    const countData = await getVteDoctorAdviceCount({jsonString:jsonString});
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getVteDoctorAdvices(jsonString);
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
	          handleClick(row) {
              this.$refs.headTop.vteDoctorAdviceFormVisible = true;
              			this.$refs.headTop.addVteDoctorAdviceForm.doctorAdviceId = row.doctorAdviceId;
              			this.$refs.headTop.addVteDoctorAdviceForm.patientHospitId = row.patientHospitId;
              			this.$refs.headTop.addVteDoctorAdviceForm.patientCode = row.patientCode;
              			this.$refs.headTop.addVteDoctorAdviceForm.doctorAdviceResult = row.doctorAdviceResult;
              			this.$refs.headTop.addVteDoctorAdviceForm.doctorAdviceRisk = row.doctorAdviceRisk;
              			this.$refs.headTop.addVteDoctorAdviceForm.doctorAdviceCent = row.doctorAdviceCent;
              			this.$refs.headTop.addVteDoctorAdviceForm.doctorAdviceIsTemp = row.doctorAdviceIsTemp;
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
              this.$refs.queryVteDoctorAdviceListForm.resetFields();
            },
            search() {
              this.initData();
            },
            async getVteDoctorAdvices(jsonString){
                const Users = await getVteDoctorAdviceList({offset: this.offset, limit: this.limit,jsonString:jsonString});
                this.tableData = [];
                Users.forEach(item => {
                  const tableData = {};
				   		tableData.doctorAdviceId = item.doctorAdviceId;
				   		tableData.patientHospitId = item.patientHospitId;
				   		tableData.patientCode = item.patientCode;
				   		tableData.doctorAdviceResult = item.doctorAdviceResult;
				   		tableData.doctorAdviceRisk = item.doctorAdviceRisk;
				   		tableData.doctorAdviceCent = item.doctorAdviceCent;
				   		tableData.doctorAdviceIsTemp = item.doctorAdviceIsTemp;
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

