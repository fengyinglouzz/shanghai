<template>
    <div class="header_container">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item v-for="(item, index) in $route.meta.menuTitle" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-button class="btnRightRift" @click="showSaveForm">添加用户</el-button>
		<el-dialog title="添加用户" v-model="vteAssessmentFormVisible" :close-on-click-modal="false">
			<el-form :rules="addVteAssessmentFormrules" :model="addVteAssessmentForm" ref="addVteAssessmentForm" label-width="100px" style="margin-right: 30px;">
					<el-col :span="12">
					  <el-form-item label="" prop="assessmentId">
		                <el-input v-model="addVteAssessmentForm.assessmentId"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="" prop="patientHospitId">
		                <el-input v-model="addVteAssessmentForm.patientHospitId"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="患者数据编码（系统自动生成）" prop="patientCode">
		                <el-input v-model="addVteAssessmentForm.patientCode"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  	<el-form-item label="风险评估阶段（字典）" prop="assessmentStage">
			                <el-select v-model="addVteAssessmentForm.assessmentStage" clearable placeholder="请选择" style="width: 100%;">
			                  <el-option
			                      v-for="item in assessmentStageOptions"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                  </el-option>
			                </el-select>
			              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  	<el-form-item label="风险评估类型（字典）" prop="assessmentType">
			                <el-select v-model="addVteAssessmentForm.assessmentType" clearable placeholder="请选择" style="width: 100%;">
			                  <el-option
			                      v-for="item in assessmentTypeOptions"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                  </el-option>
			                </el-select>
			              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  	<el-form-item label="风险评估项目（字典）" prop="assessmentItem">
			                <el-select v-model="addVteAssessmentForm.assessmentItem" clearable placeholder="请选择" style="width: 100%;">
			                  <el-option
			                      v-for="item in assessmentItemOptions"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                  </el-option>
			                </el-select>
			              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  	<el-form-item label="风险评估结果（字典）" prop="assessmentResult">
			                <el-select v-model="addVteAssessmentForm.assessmentResult" clearable placeholder="请选择" style="width: 100%;">
			                  <el-option
			                      v-for="item in assessmentResultOptions"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                  </el-option>
			                </el-select>
			              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="风险评估分值（数）" prop="assessmentScore">
		                <el-input v-model="addVteAssessmentForm.assessmentScore"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="" prop="assessmentSelectData">
		                <el-input v-model="addVteAssessmentForm.assessmentSelectData"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="" prop="assessmentFrom">
		                <el-input v-model="addVteAssessmentForm.assessmentFrom"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="" prop="assessmentStatus">
		                <el-input v-model="addVteAssessmentForm.assessmentStatus"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="" prop="assessmentIsTemp">
		                <el-input v-model="addVteAssessmentForm.assessmentIsTemp"></el-input>
		              </el-form-item>
		            </el-col>
			</el-form>
			<div :span="24" slot="footer" class="dialog-footer">
				<el-button @click="hideSaveForm">取 消</el-button>
				<el-button type="primary" @click="addVteAssessments">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
	import {addVteAssessment} from '@/api/getData'
	import {baseImgPath} from '@/config/env'
	import {mapActions, mapState} from 'vuex'
    export default {
		data(){
			return{
				vteAssessmentFormVisible: false,
				addVteAssessmentForm: {
							 assessmentId:'',
							 patientHospitId:'',
							 patientCode:'',
							 assessmentStage:'',
							 assessmentType:'',
							 assessmentItem:'',
							 assessmentResult:'',
							 assessmentScore:'',
							 assessmentSelectData:'',
							 assessmentFrom:'',
							 assessmentStatus:'',
							 assessmentIsTemp:''
		        },
		        addVteAssessmentFormrules: {
							
		        }
			}
		},
		methods: {
			showSaveForm(){
				this.vteAssessmentFormVisible = true;
				this.claerFrom();
			},
			hideSaveForm(){
				this.vteAssessmentFormVisible = false;
				this.claerFrom();
			},
			claerFrom(){
				this.addVteAssessmentForm = {
							 assessmentId:'',
							 patientHospitId:'',
							 patientCode:'',
							 assessmentStage:'',
							 assessmentType:'',
							 assessmentItem:'',
							 assessmentResult:'',
							 assessmentScore:'',
							 assessmentSelectData:'',
							 assessmentFrom:'',
							 assessmentStatus:'',
							 assessmentIsTemp:''
				}
			},
			addVteAssessments(){
		    	this.$refs.addVteAssessmentForm.validate(async (valid) => {
					if (valid) {
						const params = {
							...this.addVteAssessmentForm
						}
						try{
							const jsonString = JSON.stringify(params);
							const result = await addVteAssessment({jsonString:jsonString});
							if (result.status == 1) {
								console.log(result)
								this.$message({
					            	type: 'success',
					            	message: '添加成功'
					          	});
								this.vteAssessmentFormVisible = false;
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
