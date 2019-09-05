<template>
    <div class="fillcontain">
        <head-top ref="headTop"></head-top>
        <el-col :span="14" :offset="4" class="form_container">
          <el-form :rules="queryVteModelListFormrules" :model="queryVteModelListForm"  ref="queryVteModelListForm" label-width="150px">
				<el-col :span="12">
				  <el-form-item label="模块编码" prop="modelCode">
	                <el-input v-model="queryVteModelListForm.modelCode"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="模块名称" prop="modelName">
	                <el-input v-model="queryVteModelListForm.modelName"></el-input>
	              </el-form-item>
	            </el-col>
          <el-col :span="12">
				  <el-form-item label="允许访问地址" prop="modelAllowUrl">
	                <el-input v-model="queryVteModelListForm.modelAllowUrl"></el-input>
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
            	 <el-table-column   prop="modelCode"  label="模块编码"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="modelName"  label="模块名称"  min-width="150">  </el-table-column>
               <el-table-column   prop="modelAllowUrl"  label="允许访问地址"  min-width="150">  </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              min-width="130">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" size="small">编辑</el-button>
                <el-button @click="delModelDataClick(scope.row)" size="small">删除</el-button>
                <el-button @click="addChildrendata(scope.row)" size="small">添加子模块</el-button>
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
    import headTop from '../managecomponents/addVteModel'
    import {getVteModelList, getVteModelCount, addVteModel,deleteVteModel} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getDictData} from '@/common/dictCache'
    import { debug } from 'util';
    export default {
        data(){
            return {
                queryVteModelListForm: {
                    modelId:'',
                    modelCode:'',
                    modelName:'',
                    modelAllowUrl:''
                },
                queryVteModelListFormrules: {
                   
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
                      ...this.queryVteModelListForm
                    }
                    params.pageSort = "model_code asc";
                    const jsonString = JSON.stringify(params);
                    const countData = await getVteModelCount({jsonString:jsonString});
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getVteModels(jsonString);
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
	          handleClick(row) {
                    this.$refs.headTop.vteModelFormVisible = true;
                    this.$refs.headTop.title="模块信息";
                    this.$refs.headTop.claerFrom();
              			this.$refs.headTop.addVteModelForm.modelId = row.modelId;
              			this.$refs.headTop.addVteModelForm.modelCode = row.modelCode;
                    this.$refs.headTop.addVteModelForm.modelName = row.modelName;
                   if(row.modelAllowUrl !=null) this.$refs.headTop.addVteModelForm.modelAllowUrl = row.modelAllowUrl;
            },
            addChildrendata(row) {
                    this.$refs.headTop.showSaveForm();
              			this.$refs.headTop.addVteModelForm.modelFatherCode = row.modelCode;
            },
            delModelDataClick(row){
              this.$confirm('确认删除该模块, 是否继续?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      this.deleteModelData(row);
                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消删除'
                      });          
                    });
            },
            async deleteModelData(row) {
                    const data = {};
                    data.ids = String(row.modelId);
                    const jsonString = JSON.stringify(data);
                    await deleteVteModel({jsonString:jsonString});
                    this.initData();
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
              this.$refs.queryVteModelListForm.resetFields();
            },
            search() {
              this.initData();
            },
            async getVteModels(jsonString){
                const Users = await getVteModelList({offset: this.offset, limit: this.limit,jsonString:jsonString});
                this.tableData = [];
                let i=this.offset = (this.currentPage - 1)*this.limit;
                Users.forEach(item => {
                  const tableData = {};
                  tableData.num = i+1,
                   i++,
                  tableData.modelId = item.modelId;
                      tableData.modelCode = item.modelCode;
                      tableData.modelName = item.modelName;
                      tableData.modelAllowUrl = item.modelAllowUrl;
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

