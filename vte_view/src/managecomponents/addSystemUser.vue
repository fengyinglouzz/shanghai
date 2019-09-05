<template>
    <div class="header_container">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item v-for="(item, index) in $route.meta.menuTitle" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-button class="btnRightRift" @click="showSaveForm">添加用户</el-button>
		<el-dialog :title="title"  v-model="systemUserFormVisible" :before-close="handleDialogClose" :close-on-click-modal="false">
			<el-form :rules="addSystemUserFormrules" :model="addSystemUserForm" ref="addSystemUserForm" label-width="100px" style="margin-right: 30px;">
				<el-col :span="12">
				<el-form-item label="用户编码" prop="userCode">
					<el-input v-model="addSystemUserForm.userCode"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="用户名" prop="userName" >
					<el-input v-model="addSystemUserForm.userName"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="用户账号" prop="userAccount" >
					<el-input v-model="addSystemUserForm.userAccount"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="用户密码" prop="userPassword">
					<el-input v-model="addSystemUserForm.userPassword"  type="password" ></el-input>
				</el-form-item>
				</el-col>
				
		
			
            <el-col :span="12">
              <el-form-item label="医院名称" prop="hospitalId">
                 <el-select v-model="addSystemUserForm.hospitalId" clearable placeholder="请选择" style="width: 100%;"  @change="changeHospitalSelect(addSystemUserForm.hospitalId)" >
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
                 <el-select v-model="addSystemUserForm.orgId" clearable placeholder="请选择" style="width: 100%;" >
                  <el-option
                      v-for="item in departmentOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
					</el-form>
			<div :span="24" slot="footer" class="dialog-footer">
				<el-button @click="hideSaveForm">取 消</el-button>
				<el-button type="primary" @click="addSystemUsers">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
	import {addSystemUser,getHospitalPojoList} from '@/api/getData'
	import {baseUrl,baseImgPath} from '@/config/env'
	import {mapActions, mapState} from 'vuex'
	import {getDictData} from '@/common/dictCache'
	import { debug } from 'util'
  export default {
		data(){
			return{
				systemUserFormVisible: false,
				title:"",
				addSystemUserForm: {
								userId:'',
		          	userCode: '',
		          	userName: '',
		          	userAccount: '',
		          	userPassword: '',
								orgId: '',
								hospitalId:'',
								orgName:'',
								hospitalName:''
		        },
					addSystemUserFormrules: {
							userCode:[{required:true,message:'用户编码不能为空'}],
							userName:[{required:true,message:'用户姓名不能为空'}],
							userAccount:[{required:true,message:'用户账号不能为空'}],
							userPassword:[{required:true,message:'用户密码不能为空'}],
							hospitalId:[{required:true,message:'用户医院不能为空'}]
						},
						hospitaldData:[],
						hospitaldOptions: [],
            departmentOptions:[]
			}
		},
		created(){
				this.loadHospitaldDataAdd();
				},
		methods: {
			 showSaveForm(){
				this.claerFrom();
				this.addSystemUserFormrules.userPassword=[{required:true,message:'用户密码不能为空'}];//防止点编辑是清空密码校验  然后添加页面不出现密码校验
				this.systemUserFormVisible = true;
				this.title="添加用户";
				
			},
			hideSaveForm(){
				this.systemUserFormVisible = false;
				this.claerFrom();
				this.$refs["addSystemUserForm"].resetFields(); //清空提示信息      
        
			},
			handleDialogClose(){
					this.$refs["addSystemUserForm"].resetFields(); //清空提示信息
					this.systemUserFormVisible = false; 
					this.claerFrom();   
			},
			claerFrom(){
				this.addSystemUserForm = {
					userId:'',
					userCode: '',
					userName: '',
					userAccount: '',
					userPassword: '',
					hospitalId:'',
					orgId: ''
				}
			},
			addSystemUsers(){
		    	this.$refs.addSystemUserForm.validate(async (valid) => {
					if (valid) {
						const params = {
							...this.addSystemUserForm
						}
						try{
							const jsonString = JSON.stringify(params);
							const result = await addSystemUser({jsonString:jsonString});
							if (result.status == 1) {
								const userId=this.addSystemUserForm.userId
								var meg=""
								if(userId != null && userId != ""){
									meg="修改成功";
								}else{
									meg="添加成功";
								}
								console.log(result);
								this.$message({
					            	type: 'success',
					            	message: meg
					          	});
								this.systemUserFormVisible = false;
								this.claerFrom();
								this.$refs["addSystemUserForm"].resetFields(); //清空提示信息
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
				async loadHospitaldDataAdd(){
					if(this.hospitaldData.length == 0){
							const hData = await getHospitalPojoList();
							this.hospitaldData = hData;
					}
					this.hospitaldOptions = [];
					this.hospitaldData.forEach((item, index) => {
							this.hospitaldOptions.push({
								label: item.hospitalName,
								value: item.hospitalId,
								index,
							});
					});
			},
			setHospitaInfo(hospitalId,orgId){
				this.addSystemUserForm.hospitalId = hospitalId; 
					this.loadDepartmentData(hospitalId);
					if(orgId!=0){//orgId等于0 就是没有科室
						this.addSystemUserForm.orgId = orgId; 
					}
			},
			changeHospitalSelect(val){
				this.loadDepartmentData(val);
			},
			loadDepartmentData(hospitalId){
				if(hospitalId!=null){
						this.hospitaldData.forEach((item, index) => {
							if(item.hospitalId == hospitalId){
									const vteDepartmentList = item.vteDepartmentList;
									this.departmentOptions = [];
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
			}
		},
	
    }
		
</script>

<style lang="less">
	@import '../style/mixin';
	.header_container{
		background-color: #fff;
		border-bottom: 1px solid #d1dbe5;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
		margin: 0px 20px;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
</style>
