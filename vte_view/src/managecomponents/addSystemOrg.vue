<template>
    <div class="header_container">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item v-for="(item, index) in $route.meta.menuTitle" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<!--<el-button class="btnRightRift" @click="showSaveForm">添加机构</el-button>-->
		<el-dialog :title="title" v-model="systemOrgFormVisible"  :before-close="handleDialogClose" :close-on-click-modal="false">
			<el-form :rules="addSystemOrgFormrules" :model="addSystemOrgForm" ref="addSystemOrgForm" label-width="100px" style="margin-right: 30px;">

					<el-col :span="12">
					  <el-form-item label="组织机构名称" prop="orgName">
		                <el-input v-model="addSystemOrgForm.orgName"></el-input>
		              </el-form-item>
		            </el-col>
				
					 
					<el-col :span="12">
					  <el-form-item label="组织机构联系人" prop="orgContact">
		                <el-input v-model="addSystemOrgForm.orgContact"></el-input>
		              </el-form-item>
		            </el-col>
					
          <el-col :span="12" v-if="show">
          <el-form-item label="机构编码" prop="orgCode">
                  <el-input v-model="addSystemOrgForm.orgCode"></el-input>
                </el-form-item>
          </el-col>
					  
					<el-col :span="12">
					  <el-form-item label="组织机构电话" prop="orgPhone">
		                <el-input v-model="addSystemOrgForm.orgPhone"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="组织机构邮箱" prop="orgEmail">
		                <el-input v-model="addSystemOrgForm.orgEmail"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="组织机构地址" prop="orgAddress">
		                <el-input v-model="addSystemOrgForm.orgAddress"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12" v-if="show">
					  	<el-form-item label="组织机构是否是叶子（0：否，1：是）（字典）" prop="orgLeaf">
			                <el-select v-model="addSystemOrgForm.orgLeaf" clearable placeholder="请选择" style="width: 100%;">
			                  <el-option
			                      v-for="item in orgLeafOptions"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                  </el-option>
			                </el-select>
			              </el-form-item>
		            </el-col>
					<el-col :span="12" v-if="show">
					  	<el-form-item label="组织机构字典版本号" prop="orgVersion">
			                <el-select v-model="addSystemOrgForm.orgVersion" clearable placeholder="请选择" style="width: 100%;">
			                  <el-option
			                      v-for="item in orgVersionOptions"
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
				<el-button type="primary" @click="addSystemOrgs">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
	import {addSystemOrg} from '@/api/getData'
	import {baseImgPath} from '@/config/env'
	import {mapActions, mapState} from 'vuex'
    export default {
		data(){
			return{
				systemOrgFormVisible: false,
				title:"",
				show:false,
				addSystemOrgForm: {
							 orgId:'',
							 orgName:'',
							 orgCode:'',
							 orgContact:'',
							 orgType:'',
							 orgPhone:'',
							 orgEmail:'',
							 orgAddress:'',
							 orgLeaf:'',
							 orgVersion:''
		        },
		        addSystemOrgFormrules: {
							orgName:[{required:true,message:'机构名称不能为空'}]
							}
			}
		},
		methods: {
			showSaveForm(){
				this.systemOrgFormVisible = true;
				this.title="添加机构";
				this.claerFrom();
					this.$refs["addSystemOrgForm"].resetFields(); //清空提示信息 
			},
			hideSaveForm(){
				this.systemOrgFormVisible = false;
				this.$refs["addSystemOrgForm"].resetFields(); //清空提示信息
				this.claerFrom();
			},
			handleDialogClose(){
					this.systemOrgFormVisible = false; 
					this.$refs["addSystemOrgForm"].resetFields(); //清空提示信息
					this.claerFrom();   
			},
			claerFrom(){
				this.addSystemOrgForm = {
							 orgId:'',
							 orgName:'',
							 orgCode:'',
							 orgContact:'',
							 orgType:'',
							 orgPhone:'',
							 orgEmail:'',
							 orgAddress:'',
							 orgLeaf:'',
							 orgVersion:''
				}
			},
			addSystemOrgs(){
		    	this.$refs.addSystemOrgForm.validate(async (valid) => {
					if (valid) {
						
						const params = {
							...this.addSystemOrgForm
						}
						try{
							params.orgType="hospital";
							const jsonString = JSON.stringify(params);
							const result = await addSystemOrg({jsonString:jsonString});
							if (result.status == 1) {
								const orgId=this.addSystemOrgForm.orgId
								var meg=""
								if(orgId != null && orgId != ""){
									meg="修改成功";
								}else{
									meg="添加成功";
								}
								console.log(result)
								this.$message({
					            	type: 'success',
					            	message: meg
					          	});
								this.systemOrgFormVisible = false;
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
