<template>
    <div class="fillcontain">
        <head-top ref="headTop"></head-top>
        <el-col :span="14" :offset="4" class="form_container">
          <el-form :rules="querySystemDictListFormrules" :model="querySystemDictListForm"  ref="querySystemDictListForm" label-width="150px">
				
				<el-col :span="12">
				  	<el-form-item label="字典名称" prop="dictName">
						  <el-input v-model="querySystemDictListForm.dictName"></el-input>
		    </el-form-item>
	            </el-col>
				<el-col :span="12">
				  	<el-form-item label="字典编码" prop="dictCode">
							<el-input v-model="querySystemDictListForm.dictCode"></el-input>
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
            	 <el-table-column   prop="dictName"  label="字典名称"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="dictCode"  label="字典编码"  min-width="150">  </el-table-column>
            	 
            <el-table-column
              fixed="right"
              label="操作"
              width="160">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" size="small">编辑</el-button>
								<el-button @click="delDataClick(scope.row)" size="small">删除</el-button>
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
    import headTop from '../managecomponents/addSystemDict'
    import {getSystemDictList, getSystemDictCount, addSystemDict,deleteSystemDict} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getDictData} from '@/common/dictCache'
    import { debug } from 'util';

    
    export default {
        data(){
            return {
                querySystemDictListForm: {
							 dictId:'',
							 orgId:'',
							 dictName:'',
							 dictCode:'',
							 dictAlias:'',
							 dictDefaultValue:'',
							 dictSeq:'',
							 dictMemo:'',
							 dictMultiselect:'',
							 dictInternational:'',
							 dictVersion:''
                },
                querySystemDictListFormrules: {
                   
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
                      ...this.querySystemDictListForm
                    }
                    const jsonString = JSON.stringify(params);
                    const countData = await getSystemDictCount({jsonString:jsonString});
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getSystemDicts(jsonString);
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
	          handleClick(row) {
              this.$refs.headTop.systemDictFormVisible = true;
               this.$refs.headTop.title="字典信息";
              			this.$refs.headTop.addSystemDictForm.dictId = row.dictId;
              			this.$refs.headTop.addSystemDictForm.orgId = row.orgId;
              		if(row.dictName!=null)	this.$refs.headTop.addSystemDictForm.dictName = row.dictName;
              		if(row.dictCode!=null)	this.$refs.headTop.addSystemDictForm.dictCode = row.dictCode;
              		if(row.dictAlias!=null)	this.$refs.headTop.addSystemDictForm.dictAlias = row.dictAlias;
              		if(row.dictDefaultValue!=null)	this.$refs.headTop.addSystemDictForm.dictDefaultValue = row.dictDefaultValue;
              		//	this.$refs.headTop.addSystemDictForm.dictSeq = row.dictSeq;
              		if(row.dictMemo!=null)	this.$refs.headTop.addSystemDictForm.dictMemo = row.dictMemo;
              		if(row.dictMultiselect!=null)	this.$refs.headTop.addSystemDictForm.dictMultiselect = row.dictMultiselect;
              		if(row.dictInternational!=null)	this.$refs.headTop.addSystemDictForm.dictInternational = row.dictInternational;
              		//	this.$refs.headTop.addSystemDictForm.dictVersion = row.dictVersion;
	        },
					delDataClick(row){
							this.$confirm('确认删除该字典, 是否继续?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      this.delDictData(row);
                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消删除'
                      });          
                    });
					},
          async delDictData(row){
							const data = {};
                data.ids = String(row.dictId);
                const jsonString = JSON.stringify(data);
                const result = await deleteSystemDict({jsonString:jsonString});
                if (result.status == 1) {
                  console.log(result)
                  this.$message({
                          type: 'success',
                          message: '删除成功'
                        });
                }else{
                  this.$message({
                          type: 'error',
                          message: result.message
                        });
                }
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
              this.$refs.querySystemDictListForm.resetFields();
            },
            search() {
              this.initData();
            },
            async getSystemDicts(jsonString){
                const Users = await getSystemDictList({offset: this.offset, limit: this.limit,jsonString:jsonString});
                this.tableData = [];
                let i=this.offset = (this.currentPage - 1)*this.limit;
                Users.forEach(item => {
                  const tableData = {};
              tableData.num = i+1,
              i++,
				   		tableData.dictId = item.dictId;
				   		tableData.orgId = item.orgId;
				   		tableData.dictName = item.dictName;
				   		tableData.dictCode = item.dictCode;
				   		tableData.dictAlias = item.dictAlias;
				   		tableData.dictDefaultValue = item.dictDefaultValue;
				   		tableData.dictSeq = item.dictSeq;
				   		tableData.dictMemo = item.dictMemo;
				   		tableData.dictMultiselect = item.dictMultiselect;
				   		tableData.dictInternational = item.dictInternational;
				   		tableData.dictVersion = item.dictVersion;
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

