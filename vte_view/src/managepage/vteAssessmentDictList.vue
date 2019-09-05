<template>
    <div class="fillcontain">
        <head-top ref="headTop"></head-top>
        <el-col :span="14" :offset="4" class="form_container">
          <el-form :rules="queryVteAssessmentDictListFormrules" :model="queryVteAssessmentDictListForm"  ref="queryVteAssessmentDictListForm" label-width="150px">
				<el-col :span="12">
				  	<el-form-item label="风险评估类型" prop="assessmentType">
		                <el-select v-model="queryVteAssessmentDictListForm.assessmentType" clearable placeholder="请选择" style="width: 100%;">
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
				  	<el-form-item label="风险评估项目" prop="assessmentItem">
		                <el-select v-model="queryVteAssessmentDictListForm.assessmentItem" clearable placeholder="请选择" style="width: 100%;">
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
				  	<el-form-item label="评估字典编码" prop="assessmentDictCode">
                    <el-input v-model="queryVteAssessmentDictListForm.assessmentDictCode"></el-input>
		              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="评估字典内容" prop="assessmentDictName">
	                <el-input v-model="queryVteAssessmentDictListForm.assessmentDictName"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="评估字典得分" prop="assessmentDictScore">
	                <el-input v-model="queryVteAssessmentDictListForm.assessmentDictScore"></el-input>
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
              <el-table-column   prop="num"  label="序号"  min-width="50">  </el-table-column>
            	 <el-table-column   prop="assessmentTypeExplain"  label="风险评估类型"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="assessmentItemExplain"  label="风险评估项目"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="assessmentDictCode"  label="评估字典编码"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="assessmentDictName"  label="评估字典内容"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="assessmentDictScore"  label="评估字典得分"  min-width="150">  </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              min-width="120">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" size="small">编辑</el-button>
                <el-button @click="delVteAssDictDataClick(scope.row)" size="small">删除</el-button>
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
        </div>
    </div>
</template>

<script>
    import headTop from '../managecomponents/addVteAssessmentDict'
    import {getVteAssessmentDictList, getVteAssessmentDictCount, addVteAssessmentDict,deleteVteAssessmentDict} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getDictData} from '@/common/dictCache'
    import { debug } from 'util';
   
    export default {
        data(){
            return {
                queryVteAssessmentDictListForm: {
                  assessmentDictId:'',
                  assessmentType:'',
                  assessmentItem:'',
                  assessmentDictCode:'',
                  assessmentDictName:'',
                  assessmentDictScore:'',
                  assessmentItemExplain:"",
                  assessmentTypeExplain:"",
                  assessmentDictMutex:''
                },
                queryVteAssessmentDictListFormrules: {
                   
                },
                assessmentTypeOptions:[],
                assessmentItemOptions:[],
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
            this.loaddictdata();
        },
        methods: {
            async initData(){
                try{
                    const params = {
                      ...this.queryVteAssessmentDictListForm
                    }
                    const jsonString = JSON.stringify(params);
                    const countData = await getVteAssessmentDictCount({jsonString:jsonString});
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getVteAssessmentDicts(jsonString);
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            async loaddictdata(){
                        const dictLocalData = await	getDictData();
                        const assessmentType = dictLocalData.assessmentType;
                        const assessmentItem = dictLocalData.assessmentItem;
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
            },
             delVteAssDictDataClick(row){
              this.$confirm('确认删除该模块, 是否继续?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      this.deleteVteAssDictData(row);
                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消删除'
                      });          
                    });
            },
            async  deleteVteAssDictData(row) {
                      const data = {};
                      data.ids = String(row.assessmentDictId);
                      const jsonString = JSON.stringify(data);
                      await deleteVteAssessmentDict({jsonString:jsonString});
                      this.initData();
            },
	          handleClick(row) {
                    this.$refs.headTop.showSaveForm();
                    this.$refs.headTop.title="评估数据项信息";
              			this.$refs.headTop.addVteAssessmentDictForm.assessmentDictId = row.assessmentDictId;
              			this.$refs.headTop.addVteAssessmentDictForm.assessmentType = row.assessmentType;
              			this.$refs.headTop.addVteAssessmentDictForm.assessmentItem = row.assessmentItem;
              			this.$refs.headTop.addVteAssessmentDictForm.assessmentDictCode = row.assessmentDictCode;
              			this.$refs.headTop.addVteAssessmentDictForm.assessmentDictName = row.assessmentDictName;
              			this.$refs.headTop.addVteAssessmentDictForm.assessmentDictScore = row.assessmentDictScore;
              			this.$refs.headTop.addVteAssessmentDictForm.assessmentDictMutex = row.assessmentDictMutex;
	        },
            handleSizeChange(val) {
              this.limit = val;
              console.log(`每页 $#{val} 条`);
              this.initData();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.initData();
            },
            reset() {
              this.$refs.queryVteAssessmentDictListForm.resetFields();
            },
            search() {
              this.initData();
            },
            async getVteAssessmentDicts(jsonString){
                const Users = await getVteAssessmentDictList({offset: this.offset, limit: this.limit,jsonString:jsonString});
                this.tableData = [];
                Users.forEach(item => {
                  const tableData = {};
                        tableData.assessmentDictId = item.assessmentDictId;
                        tableData.assessmentType = item.assessmentType;
                        tableData.assessmentItem = item.assessmentItem;
                        tableData.assessmentTypeExplain = item.assessmentTypeExplain;
                        tableData.assessmentItemExplain = item.assessmentItemExplain;
                        tableData.assessmentDictCode = item.assessmentDictCode;
                        tableData.assessmentDictName = item.assessmentDictName;
                        tableData.assessmentDictScore = item.assessmentDictScore;
                        tableData.assessmentDictMutex = item.assessmentDictMutex;
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

