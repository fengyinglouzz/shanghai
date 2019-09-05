<template>
    <div class="header_container">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item v-for="(item, index) in $route.meta.menuTitle" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-button class="btnRightRift" @click="showSaveForm">添加角色</el-button>
		<el-dialog :title="title" v-model="systemRoleFormVisible" :before-close="handleDialogClose" :close-on-click-modal="false">
			<el-form :rules="addSystemRoleFormrules" :model="addSystemRoleForm" ref="addSystemRoleForm" label-width="100px" style="margin-right: 30px;">
					<el-col :span="12">
					  <el-form-item label="角色名称" prop="roleName">
		                <el-input v-model="addSystemRoleForm.roleName"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="角色编码" prop="roleCode">
		                <el-input v-model="addSystemRoleForm.roleCode"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  	<el-form-item label="数据权限" prop="rolePower">
			                <el-select v-model="addSystemRoleForm.rolePower" clearable placeholder="请选择" style="width: 100%;">
			                  <el-option
			                      v-for="item in rolePowerOptions"
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
				<el-button type="primary" @click="addSystemRoles">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
	import {addSystemRole} from '@/api/getData'
	import {baseImgPath} from '@/config/env'
	import {mapActions, mapState} from 'vuex'
    export default {
		data(){
			return{
				systemRoleFormVisible: false,
				title:"",
				addSystemRoleForm: {
							 roleId:'',
							 roleName:'',
							 roleCode:'',
							 rolePower:''
		        },
		        addSystemRoleFormrules: {
							roleName:[{required:true,message:'角色名称不能为空'}],
							roleCode:[{required:true,message:'角色编码不能为空'}],
							rolePower:[{required:true,message:'角色权限不能为空'}]
						},
						rolePowerOptions:[]
			}
		},
		methods: {
			showSaveForm(){
				this.systemRoleFormVisible = true;
				this.title="添加角色";
				this.claerFrom();
			},
			hideSaveForm(){
				this.systemRoleFormVisible = false;
				this.claerFrom();
				this.$refs["addSystemRoleForm"].resetFields(); //清空提示信息 
			},
			handleDialogClose(){
				this.systemRoleFormVisible = false;
				this.claerFrom();
				this.$refs["addSystemRoleForm"].resetFields(); //清空提示信息 
			},
			claerFrom(){
				this.addSystemRoleForm = {
							 roleId:'',
							 roleName:'',
							 roleCode:'',
							 rolePower:''
				}
			},
			addSystemRoles(){
		    	this.$refs.addSystemRoleForm.validate(async (valid) => {
					if (valid) {
						const params = {
							...this.addSystemRoleForm
						}
						try{
							const jsonString = JSON.stringify(params);
							const result = await addSystemRole({jsonString:jsonString});
							if (result.status == 1) {
								const roleId=this.addSystemRoleForm.roleId
								var meg=""
								if(roleId != null && roleId != ""){
									meg="修改成功";
								}else{
									meg="添加成功";
								}
								console.log(result)
								this.$message({
					            	type: 'success',
					            	message: meg
					          	});
								this.systemRoleFormVisible = false;
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
		    }
		}
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
