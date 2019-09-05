<template>
    <div class="fillcontain">
        <head-top ref="headTop"></head-top>
        <el-col :span="14" :offset="4" class="form_container">
          <el-form :rules="querySystemUserListFormrules" :model="querySystemUserListForm"  ref="querySystemUserListForm" label-width="150px">
            <el-col :span="12">
              <el-form-item label="医院名称" prop="hospitalId">
                 <el-select v-model="querySystemUserListForm.hospitalId" clearable placeholder="请选择" style="width: 100%;"  @change="changeHospitalSelect(querySystemUserListForm.hospitalId)" >
                  <el-option
                      v-for="item in hospitaldOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="科室名称" prop="orgId">
                 <el-select v-model="querySystemUserListForm.orgId" clearable placeholder="请选择" style="width: 100%;" >
                  <el-option
                      v-for="item in departmentOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户编码" prop="userCode">
                <el-input v-model="querySystemUserListForm.userCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户名" prop="userName">
                <el-input v-model="querySystemUserListForm.userName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户账号" prop="userAccount">
                <el-input v-model="querySystemUserListForm.userAccount"></el-input>
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
            <el-table-column
              prop="num"
              label="序号"
              min-width="50">
            </el-table-column>
            <el-table-column
              prop="userCode"
              label="用户编码"
              min-width="150">
            </el-table-column>
            <el-table-column
              prop="userName"
              label="用户名"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="userAccount"
              label="用户账号"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="hospitalName"
              label="医院名称"
              min-width="150">
            </el-table-column>
            <el-table-column
              prop="orgName"
              label="科室名称"
              min-width="150">
            </el-table-column>
            <el-table-column
              v-if="show"
              prop="orgId"
              min-width="150">
            </el-table-column>
            <el-table-column
              v-if="show"
              prop="hospitalId"
             min-width="150">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="240">
              <template slot-scope="scope">
                <el-button @click="chooseRoleData(scope.row)" size="small">角色管理</el-button>
                <el-button @click="handleClick(scope.row)" size="small">编辑</el-button>
                <el-button @click="deleteData(scope.row)" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          

          <el-dialog title="选择角色" v-model="chooseRoleFormVisible" :close-on-click-modal="false">
            <el-form rules="addSystemUserRoleListFormrules" :model="addSystemUserRoleListForm" ref="addSystemUserRoleListForm">
              <el-col :span="12">
                <el-form-item label="用户id" prop="userId" v-if="show">
                  <el-input v-model="addSystemUserRoleListForm.userId"></el-input>
                </el-form-item>
              </el-col>
              <el-form-item label="角色名称"  prop="roleId">
                <el-select v-model="addSystemUserRoleListForm.roleId" clearable placeholder="请选择" style="width: 100%;" >
                  <el-option
                      v-for="item in roleOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              </el-form>
            <div :span="24" slot="footer" class="dialog-footer">
              <el-button @click="chooseRoleFormVisible = false">取 消</el-button>
              <el-button @click="addUserRole()">确 定</el-button>
            </div>
          </el-dialog>
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
    import headTop from '../managecomponents/addSystemUser'
    import {getSystemUserList, getSystemUserCount, addSystemUser,deleteSystemUser,getHospitalPojoList,getsystemUserRolePojoList,addSystemUserRole,querySystemUserRole} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getDictData} from '@/common/dictCache'
    import { debug } from 'util';
    import {mapActions, mapState} from 'vuex'

    
    export default {
        data(){
            return {
                querySystemUserListForm: {
                  userId:"",
                  userCode: '',
                  userName: '',
                  userAccount: '',
                  userPassword: '',
                  hospitalName:'',
                  orgName:''
                },
                querySystemUserListFormrules: {
                   
		            },
                chooseRoleFormVisible: false,
                addSystemUserRoleListForm: {
                  userRoleId:"",
                  roleId:"",
                  userId:""
                },
                addSystemUserRoleListFormrules: {
                   
		            },
                show: false,
                baseUrl,
                baseImgPath,
                hisRiskOptions: [],
                hospitaldOptions: [],
                roleOptions: [],
                departmentOptions:[],
                hospitaldData:[],
                tableData: [],
                currentPage: 1,
                offset: 0,
                limit: 10,
                count: 0,
               
                
            }
        },
        components: {
          headTop,
          ...mapState(['adminInfo']),
        },
        created(){
            this.initData();
            this.loadHospitaldData();
        },
        methods: {
            ...mapActions(['getAdminData']),
            async initData(){
                try{
                    const params = {
                      ...this.querySystemUserListForm
                    }
                    const jsonString = JSON.stringify(params);
                    const countData = await getSystemUserCount({jsonString:jsonString});
                    if (countData.status == 1) {
                        this.count = countData.count;
                        this.getSystemUsers(jsonString);
                    }else{
                        throw new Error('获取数据失败');
                    }
                    
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
	          handleClick(row) {
              this.$refs.headTop.claerFrom();
              this.$refs.headTop.systemUserFormVisible = true;
              this.$refs.headTop.title="用户信息";
              //this.$refs.headTop.addSystemUserFormrules= {};
              this.$refs.headTop.addSystemUserFormrules= {
                userCode:[{required:true,message:'用户编码不能为空'}],
                userName:[{required:true,message:'用户姓名不能为空'}],
                userAccount:[{required:true,message:'用户账号不能为空'}],
                hospitalId:[{required:true,message:'用户医院不能为空'}]
						  };
              this.$refs.headTop.addSystemUserForm.userId = row.userId;
              this.$refs.headTop.addSystemUserForm.userCode = row.userCode;
              this.$refs.headTop.addSystemUserForm.userName = row.userName;
              this.$refs.headTop.addSystemUserForm.userAccount = row.userAccount;
              //this.$refs.headTop.addSystemUserForm.userPassword = row.userPassword;
              this.$refs.headTop.setHospitaInfo(Number(row.hospitalId),Number(row.orgId));
            },
            chooseRoleData(row){
                this.chooseRoleFormVisible = true;
                this.roleOptions = [];
                this.clearFrom();
                this.addSystemUserRoleListForm.userId=row.userId;
                this.getSystemUserRoles();
                const jsonString = JSON.stringify({"userId":row.userId});
               // const result= await querySystemUserRole(jsonString);
                this.querySystemUserRoleinfo(jsonString);
               // this.addSystemUserRoleListForm.roleId=Number(result.roleId);
                
            },
            async querySystemUserRoleinfo(jsonString){
                 const result= await querySystemUserRole({jsonString:jsonString});
                 this.addSystemUserRoleListForm.roleId=Number(result.roleId);
                 this.addSystemUserRoleListForm.userRoleId=result.userRoleId;
            },
            deleteData(row){
                 this.$confirm('确认删除该用户, 是否继续?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      this.deleteSystemUserData(row);
                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消删除'
                      });          
                    });
            },
            async deleteSystemUserData(row){
                const data = {};
                data.ids = String(row.userId);
                const jsonString = JSON.stringify(data);
                const result = await deleteSystemUser({jsonString:jsonString});
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
              console.log(`每页 ${val} 条`);
              this.initData();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.initData();
            },
            reset() {
              this.$refs.querySystemUserListForm.resetFields();
            },
            search() {
              this.initData();
            },
           async loadHospitaldData(){
                const hData = await getHospitalPojoList();
                hData.forEach((item, index) => {
                    this.hospitaldOptions.push({
                      label: item.hospitalName,
                      value: item.hospitalId,
                      index,
                    })
                });
                this.hospitaldData = hData;
            },
            changeHospitalSelect(val){
              this.loadDepartmentData(val);
            },
            loadDepartmentData(hospitalId){
              if(hospitalId!=null){
                  this.hospitaldData.forEach((item, index) => {
                    if(item.hospitalId == hospitalId){
                        const vteDepartmentList = item.vteDepartmentList;
                        vteDepartmentList.forEach((departmentItem, index) => {
                          this.departmentOptions.push({
                             label: departmentItem.departmentName,
                             value: departmentItem.departmentId,
                             index,
                          })
                        });
                    }
                });
              }
            },
            async getSystemUsers(jsonString){
                const Users = await getSystemUserList({offset: this.offset, limit: this.limit,jsonString:jsonString});
                this.tableData = [];
                let i=this.offset = (this.currentPage - 1)*this.limit;
                Users.forEach((item,index) => {
                  const tableData = {};
                    tableData.num = i+1,
                    i++,
                    tableData.userId = item.userId,
                    tableData.userCode = item.userCode,
                    tableData.userName = item.userName,
                    tableData.userAccount = item.userAccount,
                    tableData.userPassword = item.userPassword,
                    tableData.hospitalName = item.hospitalName,
                    tableData.orgName = item.orgName,
                    tableData.hospitalId = item.hospitalId,
                    tableData.orgId = item.orgId,
                    this.tableData.push(tableData)
                    
                })
            },
            async getSystemUserRoles(){
                const roles = await getsystemUserRolePojoList();
                roles.forEach((item, index) => {
                    this.roleOptions.push({
                      label: item.roleName,
                      value: item.roleId,
                      index,
                    })
                });    
            },
            clearFrom(){
                  this.addSystemUserRoleListForm={
                            roleId:"",
                            userId:""
                          }
              },
           addUserRole(){
                 this.$refs.addSystemUserRoleListForm.validate(async (valid) => {
            if (valid) {
              const params = {
                ...this.addSystemUserRoleListForm
              }
               try{
                const jsonString = JSON.stringify(params);
                const result = await addSystemUserRole({jsonString:jsonString});
                if (result.status == 1) {
                  console.log(result)
                  this.$message({
                          type: 'success',
                          message: '添加成功'
                        });
                  this.chooseRoleFormVisible = false;
                  this.claerFrom();
                }else{
                  this.$message({
                          type: 'error',
                          message: result.message
                        });
                }
                this.$parent.initData();
              }catch(err){
                console.log(err)
              }
            } else {
              this.$notify.error({
                title: '错误',
                message: '请检查输入是否正确',
                offset: 100
              });
              return false;
            }
          });
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

