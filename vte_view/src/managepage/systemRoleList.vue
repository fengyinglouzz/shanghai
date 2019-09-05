<template>
    <div class="fillcontain">
        <head-top ref="headTop"></head-top>
        <role-model ref="roleModel"></role-model>
        <role-assessment ref="roleAssessment"></role-assessment>
        <el-col :span="14" :offset="4" class="form_container">
          <el-form :rules="querySystemRoleListFormrules" :model="querySystemRoleListForm"  ref="querySystemRoleListForm" label-width="150px">
				<el-col :span="12">
				  <el-form-item label="角色名称" prop="roleName">
	                <el-input v-model="querySystemRoleListForm.roleName"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="角色编码" prop="roleCode">
	                <el-input v-model="querySystemRoleListForm.roleCode"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  	<el-form-item label="数据权限" prop="rolePower">
		                <el-select v-model="querySystemRoleListForm.rolePower" clearable placeholder="请选择" style="width: 100%;">
		                  <el-option
		                      v-for="item in rolePowerOptions"
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
               <el-table-column   prop="num"  label="序号"  min-width="50">  </el-table-column>
            	 <el-table-column   prop="roleName"  label="角色名称"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="roleCode"  label="角色编码"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="rolePowerExplain"  label="数据权限"  min-width="150">  </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              min-width="280">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" size="small">编辑</el-button>
                <el-button @click="delRoleDataClick(scope.row)" size="small">删除</el-button>
                <el-button @click="addModelRole(scope.row)" size="small">编辑模块</el-button>
                <el-button @click="addAssessmentDictRole(scope.row)" size="small">编辑评估内容</el-button>
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
    import headTop from '../managecomponents/addSystemRole'
    import roleModel from '../managecomponents/editRoleModel'
    import roleAssessment from '../managecomponents/editVteAssessmentDictRole'
    import {getSystemRoleList, getSystemRoleCount, addSystemRole,deleteSystemRole,getQueryAssessmentDicByRoleId,getQueryVteModelByRoleId} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getDictData} from '@/common/dictCache'
    import { debug } from 'util';

    
    export default {
        data(){
            return {
                querySystemRoleListForm: {
                  roleId:'',
                  roleName:'',
                  roleCode:'',
                  rolePower:'',
                  rolePowerExplain:'',
                },
                querySystemRoleListFormrules: {
                   
                },
                rolePowerOptions:[],
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
          roleModel,
          roleAssessment
        },
        created(){
            this.initData();
            this.showRolePowerOptions();
        },
        methods: {
            async initData(){
                try{
                    const params = {
                      ...this.querySystemRoleListForm
                    }
                    const jsonString = JSON.stringify(params);
                    const countData = await getSystemRoleCount({jsonString:jsonString});
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getSystemRoles(jsonString);
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            async showRolePowerOptions(){
                        const dictLocalData = await	getDictData();
                        const rolePower = dictLocalData.rolePower;
                        rolePower.forEach((item, index) => {
                            this.rolePowerOptions.push({
                              label: item.dictDataName,
                              value: item.dictDataValue,
                              index,
                            })
                           	this.$refs.headTop.rolePowerOptions.push({
                              label: item.dictDataName,
                              value: item.dictDataValue,
                              index,
                            })
                        });
            },
          delRoleDataClick(row){
              this.$confirm('确认删除该角色, 是否继续?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      this.deleteRoleData(row);
                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消删除'
                      });          
                    });
            },
           async deleteRoleData(row) {
                const data = {};
                data.ids = String(row.roleId);
                const jsonString = JSON.stringify(data);
                await deleteSystemRole({jsonString:jsonString});
                this.initData();
	          },
            async addModelRole(row) {
                  this.$refs.roleModel.showSaveForm();
                  this.$refs.roleModel.roleId = Number(row.roleId);
                  const dictLocalData = await	getQueryVteModelByRoleId({roleId:Number(row.roleId)});
                  this.$refs.roleModel.setChecked(dictLocalData);
	          },
            async addAssessmentDictRole(row) { 
                  this.$refs.roleAssessment.showSaveForm();
                  this.$refs.roleAssessment.roleId = Number(row.roleId);
                  const dictLocalData = await	getQueryAssessmentDicByRoleId({roleId:Number(row.roleId)});
                  this.$refs.roleAssessment.setChecked(dictLocalData);
	          },
	          handleClick(row) {
                    this.$refs.headTop.systemRoleFormVisible = true;
                    this.$refs.headTop.title = "角色信息";
                    this.$refs.headTop.claerFrom();
              			this.$refs.headTop.addSystemRoleForm.roleId = row.roleId;
              			this.$refs.headTop.addSystemRoleForm.roleName = row.roleName;
              			this.$refs.headTop.addSystemRoleForm.roleCode = row.roleCode;
                    this.$refs.headTop.addSystemRoleForm.rolePower = row.rolePower;
                    this.$refs.headTop.rolePowerOptions = this.rolePowerOptions;
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
              this.$refs.querySystemRoleListForm.resetFields();
            },
            search() {
              this.initData();
            },
            async getSystemRoles(jsonString){
                const Users = await getSystemRoleList({offset: this.offset, limit: this.limit,jsonString:jsonString});
                this.tableData = [];
                let i=this.offset = (this.currentPage - 1)*this.limit;
                Users.forEach(item => {
                  const tableData = {};
              tableData.num = i+1,
              i++,
				   		tableData.roleId = item.roleId;
				   		tableData.roleName = item.roleName;
				   		tableData.roleCode = item.roleCode;
               tableData.rolePower = item.rolePower;
               tableData.rolePowerExplain = item.rolePowerExplain;
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

