<template>
    <div class="header_container">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item v-for="(item, index) in $route.meta.menuTitle" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-button class="btnRightRift" @click="showSaveForm">添加用户</el-button>
		<el-dialog title="添加用户" v-model="vteDvtAdviceFormVisible" :close-on-click-modal="false">
			<el-form :rules="addVteDvtAdviceFormrules" :model="addVteDvtAdviceForm" ref="addVteDvtAdviceForm" label-width="100px" style="margin-right: 30px;">
					<el-col :span="12">
					  <el-form-item label="" prop="dvtAdviceId">
		                <el-input v-model="addVteDvtAdviceForm.dvtAdviceId"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="" prop="patientHospitId">
		                <el-input v-model="addVteDvtAdviceForm.patientHospitId"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="患者数据编码（系统自动生成）" prop="patientCode">
		                <el-input v-model="addVteDvtAdviceForm.patientCode"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="DVT诊断流程建议所在环节（文）" prop="dvtAdviceNodeName">
		                <el-input v-model="addVteDvtAdviceForm.dvtAdviceNodeName"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  	<el-form-item label="DVT诊断流程建议是否历史（字典）" prop="dvtAdviceIshistory">
			                <el-select v-model="addVteDvtAdviceForm.dvtAdviceIshistory" clearable placeholder="请选择" style="width: 100%;">
			                  <el-option
			                      v-for="item in dvtAdviceIshistoryOptions"
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
				<el-button type="primary" @click="addVteDvtAdvices">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
	import {addVteDvtAdvice} from '@/api/getData'
	import {baseImgPath} from '@/config/env'
	import {mapActions, mapState} from 'vuex'
    export default {
		data(){
			return{
				vteDvtAdviceFormVisible: false,
				addVteDvtAdviceForm: {
							 dvtAdviceId:'',
							 patientHospitId:'',
							 patientCode:'',
							 dvtAdviceNodeName:'',
							 dvtAdviceIshistory:''
		        },
		        addVteDvtAdviceFormrules: {
							
		        }
			}
		},
		methods: {
			showSaveForm(){
				this.vteDvtAdviceFormVisible = true;
				this.claerFrom();
			},
			hideSaveForm(){
				this.vteDvtAdviceFormVisible = false;
				this.claerFrom();
			},
			claerFrom(){
				this.addVteDvtAdviceForm = {
							 dvtAdviceId:'',
							 patientHospitId:'',
							 patientCode:'',
							 dvtAdviceNodeName:'',
							 dvtAdviceIshistory:''
				}
			},
			addVteDvtAdvices(){
		    	this.$refs.addVteDvtAdviceForm.validate(async (valid) => {
					if (valid) {
						const params = {
							...this.addVteDvtAdviceForm
						}
						try{
							const jsonString = JSON.stringify(params);
							const result = await addVteDvtAdvice({jsonString:jsonString});
							if (result.status == 1) {
								console.log(result)
								this.$message({
					            	type: 'success',
					            	message: '添加成功'
					          	});
								this.vteDvtAdviceFormVisible = false;
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
