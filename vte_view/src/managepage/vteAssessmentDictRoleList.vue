<template>
    <div class="fillcontain">
        <head-top ref="headTop"></head-top>
        <el-col :span="14" :offset="4" class="form_container">
          <el-form :rules="queryVteAssessmentDictRoleListFormrules" :model="queryVteAssessmentDictRoleListForm"  ref="queryVteAssessmentDictRoleListForm" label-width="150px">
				<el-col :span="12">
				  <el-form-item label="" prop="assessmentDictRoleId">
	                <el-input v-model="queryVteAssessmentDictRoleListForm.assessmentDictRoleId"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="角色ID" prop="roleId">
	                <el-input v-model="queryVteAssessmentDictRoleListForm.roleId"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="" prop="assessmentDictId2">
	                <el-input v-model="queryVteAssessmentDictRoleListForm.assessmentDictId2"></el-input>
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
            	 <el-table-column   prop="assessmentDictRoleId"  label=""  min-width="150">  </el-table-column>
            	 <el-table-column   prop="roleId"  label="角色ID"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="assessmentDictId2"  label=""  min-width="150">  </el-table-column>
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
    import headTop from '../managecomponents/addVteAssessmentDictRole'
    import {getVteAssessmentDictRoleList, getVteAssessmentDictRoleCount, addVteAssessmentDictRole} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getDictData} from '@/common/dictCache'
    import { debug } from 'util';

    
    export default {
        data(){
            return {
                queryVteAssessmentDictRoleListForm: {
							 assessmentDictRoleId:'',
							 roleId:'',
							 assessmentDictId2:''
                },
                queryVteAssessmentDictRoleListFormrules: {
                   
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
                      ...this.queryVteAssessmentDictRoleListForm
                    }
                    const jsonString = JSON.stringify(params);
                    const countData = await getVteAssessmentDictRoleCount({jsonString:jsonString});
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getVteAssessmentDictRoles(jsonString);
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
	          handleClick(row) {
              this.$refs.headTop.vteAssessmentDictRoleFormVisible = true;
              			this.$refs.headTop.addVteAssessmentDictRoleForm.assessmentDictRoleId = row.assessmentDictRoleId;
              			this.$refs.headTop.addVteAssessmentDictRoleForm.roleId = row.roleId;
              			this.$refs.headTop.addVteAssessmentDictRoleForm.assessmentDictId2 = row.assessmentDictId2;
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
              this.$refs.queryVteAssessmentDictRoleListForm.resetFields();
            },
            search() {
              this.initData();
            },
            async getVteAssessmentDictRoles(jsonString){
                const Users = await getVteAssessmentDictRoleList({offset: this.offset, limit: this.limit,jsonString:jsonString});
                this.tableData = [];
                Users.forEach(item => {
                  const tableData = {};
				   		tableData.assessmentDictRoleId = item.assessmentDictRoleId;
				   		tableData.roleId = item.roleId;
				   		tableData.assessmentDictId2 = item.assessmentDictId2;
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

