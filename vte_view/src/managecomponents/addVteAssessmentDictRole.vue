<template>
    <div class="header_container">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item v-for="(item, index) in $route.meta.menuTitle" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-button class="btnRightRift" @click="showSaveForm">添加用户</el-button>
		<el-dialog title="添加用户" v-model="vteAssessmentDictRoleFormVisible" :close-on-click-modal="false">
			<el-form :rules="addVteAssessmentDictRoleFormrules" :model="addVteAssessmentDictRoleForm" ref="addVteAssessmentDictRoleForm" label-width="100px" style="margin-right: 30px;">
					<el-col :span="12">
					  <el-form-item label="" prop="assessmentDictRoleId">
		                <el-input v-model="addVteAssessmentDictRoleForm.assessmentDictRoleId"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="角色ID" prop="roleId">
		                <el-input v-model="addVteAssessmentDictRoleForm.roleId"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="" prop="assessmentDictId2">
		                <el-input v-model="addVteAssessmentDictRoleForm.assessmentDictId2"></el-input>
		              </el-form-item>
		            </el-col>
			</el-form>
			<div :span="24" slot="footer" class="dialog-footer">
				<el-button @click="hideSaveForm">取 消</el-button>
				<el-button type="primary" @click="addVteAssessmentDictRoles">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
	import {addVteAssessmentDictRole} from '@/api/getData'
	import {baseImgPath} from '@/config/env'
	import {mapActions, mapState} from 'vuex'
    export default {
		data(){
			return{
				vteAssessmentDictRoleFormVisible: false,
				addVteAssessmentDictRoleForm: {
							 assessmentDictRoleId:'',
							 roleId:'',
							 assessmentDictId2:''
		        },
		        addVteAssessmentDictRoleFormrules: {
							
		        }
			}
		},
		methods: {
			showSaveForm(){
				this.vteAssessmentDictRoleFormVisible = true;
				this.claerFrom();
			},
			hideSaveForm(){
				this.vteAssessmentDictRoleFormVisible = false;
				this.claerFrom();
			},
			claerFrom(){
				this.addVteAssessmentDictRoleForm = {
							 assessmentDictRoleId:'',
							 roleId:'',
							 assessmentDictId2:''
				}
			},
			addVteAssessmentDictRoles(){
		    	this.$refs.addVteAssessmentDictRoleForm.validate(async (valid) => {
					if (valid) {
						const params = {
							...this.addVteAssessmentDictRoleForm
						}
						try{
							const jsonString = JSON.stringify(params);
							const result = await addVteAssessmentDictRole({jsonString:jsonString});
							if (result.status == 1) {
								console.log(result)
								this.$message({
					            	type: 'success',
					            	message: '添加成功'
					          	});
								this.vteAssessmentDictRoleFormVisible = false;
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
