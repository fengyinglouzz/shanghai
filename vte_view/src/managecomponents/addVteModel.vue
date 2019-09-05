<template>
    <div class="header_container">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item v-for="(item, index) in $route.meta.menuTitle" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-button class="btnRightRift" @click="showSaveForm">添加根模块</el-button>
		<el-dialog :title="title" v-model="vteModelFormVisible" :before-close="handleDialogClose" :close-on-click-modal="false">
			<el-form :rules="addVteModelFormrules" :model="addVteModelForm" ref="addVteModelForm" label-width="100px" style="margin-right: 30px;">
					<el-col :span="12">
					  <el-form-item label="模块名称" prop="modelName">
		                <el-input v-model="addVteModelForm.modelName"></el-input>
		              </el-form-item>
		            </el-col>
								<el-col :span="12">
					    <el-form-item label="允许访问地址" prop="modelAllowUrl">
		                <el-input v-model="addVteModelForm.modelAllowUrl"></el-input>
		              </el-form-item>
		            </el-col>
			</el-form>
			<div :span="24" slot="footer" class="dialog-footer">
				<el-button @click="hideSaveForm">取 消</el-button>
				<el-button type="primary" @click="addVteModels">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
	import {addVteModel} from '@/api/getData'
	import {baseImgPath} from '@/config/env'
	import {mapActions, mapState} from 'vuex'
    export default {
		data(){
			return{
				vteModelFormVisible: false,
				title:"",
				addVteModelForm: {
							 modelId:'',
							 modelCode:'',
							 modelName:'',
							 modelFatherCode:'',
							 modelAllowUrl:''
		        },
		        addVteModelFormrules: {
								modelName:[{required:true,message:'模块名称不能为空'}]
		        }
			}
		},
		methods: {
			showSaveForm(){
				this.vteModelFormVisible = true;
				this.title="添加模块";
				this.claerFrom();
			},
			hideSaveForm(){
				this.vteModelFormVisible = false;
				this.claerFrom();
				this.$refs["addVteModelForm"].resetFields(); //清空提示信息 
			},
			handleDialogClose(){
				this.vteModelFormVisible = false;
				this.claerFrom();
				this.$refs["addVteModelForm"].resetFields(); //清空提示信息 
			},
			claerFrom(){
				this.addVteModelForm = {
							 modelId:'',
							 modelCode:'',
							 modelName:'',
							 modelFatherCode:'',
							 modelAllowUrl:''
				}
			},
			addVteModels(){
		    	this.$refs.addVteModelForm.validate(async (valid) => {
					if (valid) {
						const params = {
							...this.addVteModelForm
						}
						try{
							const jsonString = JSON.stringify(params);
							const result = await addVteModel({jsonString:jsonString});
							if (result.status == 1) {
								const modelId=this.addVteModelForm.modelId
								var meg=""
								if(modelId != null && modelId != ""){
									meg="修改成功";
								}else{
									meg="添加成功";
								}
								console.log(result)
								this.$message({
					            	type: 'success',
					            	message: meg
					          	});
								this.vteModelFormVisible = false;
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
