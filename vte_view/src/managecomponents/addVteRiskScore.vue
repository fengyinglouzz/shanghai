<template>
    <div class="header_container">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item v-for="(item, index) in $route.meta.menuTitle" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-button class="btnRightRift" @click="showSaveForm">添加用户</el-button>
		<el-dialog title="添加用户" v-model="vteRiskScoreFormVisible" :close-on-click-modal="false">
			<el-form :rules="addVteRiskScoreFormrules" :model="addVteRiskScoreForm" ref="addVteRiskScoreForm" label-width="100px" style="margin-right: 30px;">
					<el-col :span="12">
					  <el-form-item label="" prop="riskScoreId">
		                <el-input v-model="addVteRiskScoreForm.riskScoreId"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="VTE风险分度名称（文）" prop="riskScoreName">
		                <el-input v-model="addVteRiskScoreForm.riskScoreName"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="VTE风险分度编码（文）" prop="riskScoreCode">
		                <el-input v-model="addVteRiskScoreForm.riskScoreCode"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="VTE风险分度评分文本显示（文）" prop="riskScoreShowText">
		                <el-input v-model="addVteRiskScoreForm.riskScoreShowText"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="VTE风险分度范围最小值（数）" prop="riskScoreMinValue">
		                <el-input v-model="addVteRiskScoreForm.riskScoreMinValue"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="VTE风险分度范围最大值（数）" prop="riskScoreMaxValue">
		                <el-input v-model="addVteRiskScoreForm.riskScoreMaxValue"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="VTE发生率（数）" prop="riskScoreRate">
		                <el-input v-model="addVteRiskScoreForm.riskScoreRate"></el-input>
		              </el-form-item>
		            </el-col>
			</el-form>
			<div :span="24" slot="footer" class="dialog-footer">
				<el-button @click="hideSaveForm">取 消</el-button>
				<el-button type="primary" @click="addVteRiskScores">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
	import {addVteRiskScore} from '@/api/getData'
	import {baseImgPath} from '@/config/env'
	import {mapActions, mapState} from 'vuex'
    export default {
		data(){
			return{
				vteRiskScoreFormVisible: false,
				addVteRiskScoreForm: {
							 riskScoreId:'',
							 riskScoreName:'',
							 riskScoreCode:'',
							 riskScoreShowText:'',
							 riskScoreMinValue:'',
							 riskScoreMaxValue:'',
							 riskScoreRate:''
		        },
		        addVteRiskScoreFormrules: {
							
		        }
			}
		},
		methods: {
			showSaveForm(){
				this.vteRiskScoreFormVisible = true;
				this.claerFrom();
			},
			hideSaveForm(){
				this.vteRiskScoreFormVisible = false;
				this.claerFrom();
			},
			claerFrom(){
				this.addVteRiskScoreForm = {
							 riskScoreId:'',
							 riskScoreName:'',
							 riskScoreCode:'',
							 riskScoreShowText:'',
							 riskScoreMinValue:'',
							 riskScoreMaxValue:'',
							 riskScoreRate:''
				}
			},
			addVteRiskScores(){
		    	this.$refs.addVteRiskScoreForm.validate(async (valid) => {
					if (valid) {
						const params = {
							...this.addVteRiskScoreForm
						}
						try{
							const jsonString = JSON.stringify(params);
							const result = await addVteRiskScore({jsonString:jsonString});
							if (result.status == 1) {
								const riskScoreId=this.addVteRiskScoreForm.riskScoreId
								var meg=""
								if(riskScoreId != null && riskScoreId != ""){
									meg="修改成功";
								}else{
									meg="添加成功";
								}
								console.log(result)
								this.$message({
					            	type: 'success',
					            	message: meg
					          	});
								this.vteRiskScoreFormVisible = false;
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
