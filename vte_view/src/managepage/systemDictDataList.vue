<template>
    <div class="fillcontain">
        <head-top ref="headTop"></head-top>
        <el-col :span="14" :offset="4" class="form_container">
          <el-form :rules="querySystemDictDataListFormrules" :model="querySystemDictDataListForm"  ref="querySystemDictDataListForm" label-width="150px">
				<el-col :span="12">
            <el-form-item label="字典名称" prop="dictId">
            <el-select v-model="querySystemDictDataListForm.dictId" clearable placeholder="请选择" style="width: 100%;">
			                  <el-option
			                      v-for="item in dictOptions"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                  </el-option>
			      </el-select>
		         </el-form-item>
	      </el-col>
        <el-col :span="12">
            <el-form-item label="字典数据名称" prop="dictDataName">
		              <el-input v-model="querySystemDictDataListForm.dictDataName"></el-input>  
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
            	 <el-table-column   prop="dictDataName"  label="字典数据名称"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="dictDataValue"  label="字典数据值"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="dictDataSeq"  label="字典数据排序"  min-width="150">  </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" size="small">编辑</el-button>
                <el-button @click="delDictDataClick(scope.row)" size="small">删除</el-button>
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
    import headTop from '../managecomponents/addSystemDictData'
    import {getSystemDictDataList, getSystemDictDataCount, addSystemDictData,getSystemDictPojoList,deleteSystemDictData} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getDictData} from '@/common/dictCache'
    import { debug } from 'util';

    
    export default {
        data(){
            return {
                querySystemDictDataListForm: {
							 dictDataId:'',
							 dictId:'',
							 dictDataName:'',
							 dictDataValue:'',
							 dictDataMemo:'',
							 dictDataSeq:''
                },
                querySystemDictDataListFormrules: {
                   
		            },
                dictOptions:[],
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
            this.loadDict();
        },
        methods: {
            async initData(){
                try{
                    const params = {
                      ...this.querySystemDictDataListForm
                    }
                    const jsonString = JSON.stringify(params);
                    const countData = await getSystemDictDataCount({jsonString:jsonString});
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getSystemDictDatas(jsonString);
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
	          handleClick(row) {
              this.$refs.headTop.systemDictDataFormVisible = true;
              this.$refs.headTop.title="字典子项信息";
                    this.$refs.headTop.addSystemDictDataForm.dictDataId = row.dictDataId;
              			this.$refs.headTop.addSystemDictDataForm.dictId = row.dictId;
                    this.$refs.headTop.disabledInput=true;
                   if(row.dictDataName!=null) this.$refs.headTop.addSystemDictDataForm.dictDataName = row.dictDataName;
              		 if(row.dictDataValue!=null)	this.$refs.headTop.addSystemDictDataForm.dictDataValue = row.dictDataValue;
              	   if(row.dictDataMemo!=null)	this.$refs.headTop.addSystemDictDataForm.dictDataMemo = row.dictDataMemo;
              	   if(row.dictDataSeq!=null)	this.$refs.headTop.addSystemDictDataForm.dictDataSeq = row.dictDataSeq;
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
              this.$refs.querySystemDictDataListForm.resetFields();
            },
            search() {
              this.initData();
            },
            async getSystemDictDatas(jsonString){
                const Users = await getSystemDictDataList({offset: this.offset, limit: this.limit,jsonString:jsonString});
                this.tableData = [];
                let i=this.offset = (this.currentPage - 1)*this.limit;
                Users.forEach(item => {
                  const tableData = {};
              tableData.num = i+1,
              i++,
				   		tableData.dictDataId = item.dictDataId;
				   		tableData.dictId = item.dictId;
				   		tableData.dictDataName = item.dictDataName;
				   		tableData.dictDataValue = item.dictDataValue;
				   		tableData.dictDataMemo = item.dictDataMemo;
				   		tableData.dictDataSeq = item.dictDataSeq;
                    this.tableData.push(tableData);
                })
            },
            async loadDict(){
                const hData = await getSystemDictPojoList();
                hData.forEach((item, index) => {
                    this.dictOptions.push({
                      label: item.dictName,
                      value: item.dictId,
                      index,
                    })
                });
               
            },
            delDictDataClick(row){
              this.$confirm('确认删除该字典项, 是否继续?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      this.delSystemDictData(row);
                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消删除'
                      });          
                    });
            },
            async delSystemDictData(row){
              const data = {};
                data.ids = String(row.dictDataId);
                const jsonString = JSON.stringify(data);
                const result = await deleteSystemDictData({jsonString:jsonString});
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
</style>

