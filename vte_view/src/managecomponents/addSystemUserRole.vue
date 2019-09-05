<template>
    <div class="header_container">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item v-for="(item, index) in $route.meta.menuTitle" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-button class="btnRightRift" @click="showSaveForm">添加用户</el-button>
		<el-dialog title="添加用户" v-model="systemUserRoleFormVisible" :close-on-click-modal="false">
			<el-form :rules="addSystemUserRoleFormrules" :model="addSystemUserRoleForm" ref="addSystemUserRoleForm" label-width="100px" style="margin-right: 30px;">
					<el-col :span="12">
					  <el-form-item label="" prop="userRoleId">
		                <el-input v-model="addSystemUserRoleForm.userRoleId"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="角色ID" prop="roleId">
		                <el-input v-model="addSystemUserRoleForm.roleId"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="" prop="userId">
		                <el-input v-model="addSystemUserRoleForm.userId"></el-input>
		              </el-form-item>
		            </el-col>
			</el-form>
			<div :span="24" slot="footer" class="dialog-footer">
				<el-button @click="hideSaveForm">取 消</el-button>
				<el-button type="primary" @click="addSystemUserRoles">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
	import {addSystemUserRole} from '@/api/getData'
	import {baseImgPath} from '@/config/env'
	import {mapActions, mapState} from 'vuex'
    export default {
		data(){
			return{
				systemUserRoleFormVisible: false,
				addSystemUserRoleForm: {
							 userRoleId:'',
							 roleId:'',
							 userId:''
		        },
		        addSystemUserRoleFormrules: {
							
		        }
			}
		},
		methods: {
			showSaveForm(){
				this.systemUserRoleFormVisible = true;
				this.claerFrom();
			},
			hideSaveForm(){
				this.systemUserRoleFormVisible = false;
				this.claerFrom();
			},
			claerFrom(){
				this.addSystemUserRoleForm = {
							 userRoleId:'',
							 roleId:'',
							 userId:''
				}
			},
			addSystemUserRoles(){
		    	this.$refs.addSystemUserRoleForm.validate(async (valid) => {
					if (valid) {
						const params = {
							...this.addSystemUserRoleForm
						}
						try{
							const jsonString = JSON.stringify(params);
							const result = await addSystemUserRole({jsonString:jsonString});
							if (result.status == 1) {
								const userRoleId=this.addSystemUserRoleForm.userRoleId
								var meg=""
								if(userRoleId != null && userRoleId != ""){
									meg="修改成功";
								}else{
									meg="添加成功";
								}
								console.log(result)
								this.$message({
					            	type: 'success',
					            	message: meg
					          	});
								this.systemUserRoleFormVisible = false;
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
