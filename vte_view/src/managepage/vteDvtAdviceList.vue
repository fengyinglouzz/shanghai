<template>
    <div class="fillcontain">
        <head-top ref="headTop"></head-top>
        <el-col :span="14" :offset="4" class="form_container">
          <el-form :rules="queryVteDvtAdviceListFormrules" :model="queryVteDvtAdviceListForm"  ref="queryVteDvtAdviceListForm" label-width="150px">
				<el-col :span="12">
				  <el-form-item label="" prop="dvtAdviceId">
	                <el-input v-model="queryVteDvtAdviceListForm.dvtAdviceId"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="" prop="patientHospitId">
	                <el-input v-model="queryVteDvtAdviceListForm.patientHospitId"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="患者数据编码（系统自动生成）" prop="patientCode">
	                <el-input v-model="queryVteDvtAdviceListForm.patientCode"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="DVT诊断流程建议所在环节（文）" prop="dvtAdviceNodeName">
	                <el-input v-model="queryVteDvtAdviceListForm.dvtAdviceNodeName"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  	<el-form-item label="DVT诊断流程建议是否历史（字典）" prop="dvtAdviceIshistory">
		                <el-select v-model="queryVteDvtAdviceListForm.dvtAdviceIshistory" clearable placeholder="请选择" style="width: 100%;">
		                  <el-option
		                      v-for="item in dvtAdviceIshistoryOptions"
		                      :key="item.value"
		                      :label="item.label"
		                      :value="item.value">
		                  </el-option>
		                </el-select>
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
            	 <el-table-column   prop="dvtAdviceId"  label=""  min-width="150">  </el-table-column>
            	 <el-table-column   prop="patientHospitId"  label=""  min-width="150">  </el-table-column>
            	 <el-table-column   prop="patientCode"  label="患者数据编码（系统自动生成）"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="dvtAdviceNodeName"  label="DVT诊断流程建议所在环节（文）"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="dvtAdviceIshistory"  label="DVT诊断流程建议是否历史（字典）"  min-width="150">  </el-table-column>
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
    import headTop from '../managecomponents/addVteDvtAdvice'
    import {getVteDvtAdviceList, getVteDvtAdviceCount, addVteDvtAdvice} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getDictData} from '@/common/dictCache'
    import { debug } from 'util';

    
    export default {
        data(){
            return {
                queryVteDvtAdviceListForm: {
							 dvtAdviceId:'',
							 patientHospitId:'',
							 patientCode:'',
							 dvtAdviceNodeName:'',
							 dvtAdviceIshistory:''
                },
                queryVteDvtAdviceListFormrules: {
                   
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
                      ...this.queryVteDvtAdviceListForm
                    }
                    const jsonString = JSON.stringify(params);
                    const countData = await getVteDvtAdviceCount({jsonString:jsonString});
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getVteDvtAdvices(jsonString);
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
	          handleClick(row) {
              this.$refs.headTop.vteDvtAdviceFormVisible = true;
              			this.$refs.headTop.addVteDvtAdviceForm.dvtAdviceId = row.dvtAdviceId;
              			this.$refs.headTop.addVteDvtAdviceForm.patientHospitId = row.patientHospitId;
              			this.$refs.headTop.addVteDvtAdviceForm.patientCode = row.patientCode;
              			this.$refs.headTop.addVteDvtAdviceForm.dvtAdviceNodeName = row.dvtAdviceNodeName;
              			this.$refs.headTop.addVteDvtAdviceForm.dvtAdviceIshistory = row.dvtAdviceIshistory;
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
              this.$refs.queryVteDvtAdviceListForm.resetFields();
            },
            search() {
              this.initData();
            },
            async getVteDvtAdvices(jsonString){
                const Users = await getVteDvtAdviceList({offset: this.offset, limit: this.limit,jsonString:jsonString});
                this.tableData = [];
                Users.forEach(item => {
                  const tableData = {};
				   		tableData.dvtAdviceId = item.dvtAdviceId;
				   		tableData.patientHospitId = item.patientHospitId;
				   		tableData.patientCode = item.patientCode;
				   		tableData.dvtAdviceNodeName = item.dvtAdviceNodeName;
				   		tableData.dvtAdviceIshistory = item.dvtAdviceIshistory;
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

