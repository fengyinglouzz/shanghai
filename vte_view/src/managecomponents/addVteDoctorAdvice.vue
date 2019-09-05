<template>
    <div class="header_container">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item v-for="(item, index) in $route.meta.menuTitle" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-button class="btnRightRift" @click="showSaveForm">添加用户</el-button>
		<el-dialog title="添加用户" v-model="vteDoctorAdviceFormVisible" :close-on-click-modal="false">
			<el-form :rules="addVteDoctorAdviceFormrules" :model="addVteDoctorAdviceForm" ref="addVteDoctorAdviceForm" label-width="100px" style="margin-right: 30px;">
					<el-col :span="12">
					  <el-form-item label="" prop="doctorAdviceId">
		                <el-input v-model="addVteDoctorAdviceForm.doctorAdviceId"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="" prop="patientHospitId">
		                <el-input v-model="addVteDoctorAdviceForm.patientHospitId"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="患者数据编码（系统自动生成）" prop="patientCode">
		                <el-input v-model="addVteDoctorAdviceForm.patientCode"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  	<el-form-item label="医嘱处理诊断结果（字典）" prop="doctorAdviceResult">
			                <el-select v-model="addVteDoctorAdviceForm.doctorAdviceResult" clearable placeholder="请选择" style="width: 100%;">
			                  <el-option
			                      v-for="item in doctorAdviceResultOptions"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                  </el-option>
			                </el-select>
			              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="" prop="doctorAdviceRisk">
		                <el-input v-model="addVteDoctorAdviceForm.doctorAdviceRisk"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="医嘱处理医嘱（文）" prop="doctorAdviceCent">
		                <el-input v-model="addVteDoctorAdviceForm.doctorAdviceCent"></el-input>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="" prop="doctorAdviceIsTemp">
		                <el-input v-model="addVteDoctorAdviceForm.doctorAdviceIsTemp"></el-input>
		              </el-form-item>
		            </el-col>
			</el-form>
			<div :span="24" slot="footer" class="dialog-footer">
				<el-button @click="hideSaveForm">取 消</el-button>
				<el-button type="primary" @click="addVteDoctorAdvices">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
	import {addVteDoctorAdvice} from '@/api/getData'
	import {baseImgPath} from '@/config/env'
	import {mapActions, mapState} from 'vuex'
    export default {
		data(){
			return{
				vteDoctorAdviceFormVisible: false,
				addVteDoctorAdviceForm: {
							 doctorAdviceId:'',
							 patientHospitId:'',
							 patientCode:'',
							 doctorAdviceResult:'',
							 doctorAdviceRisk:'',
							 doctorAdviceCent:'',
							 doctorAdviceIsTemp:''
		        },
		        addVteDoctorAdviceFormrules: {
							
		        }
			}
		},
		methods: {
			showSaveForm(){
				this.vteDoctorAdviceFormVisible = true;
				this.claerFrom();
			},
			hideSaveForm(){
				this.vteDoctorAdviceFormVisible = false;
				this.claerFrom();
			},
			claerFrom(){
				this.addVteDoctorAdviceForm = {
							 doctorAdviceId:'',
							 patientHospitId:'',
							 patientCode:'',
							 doctorAdviceResult:'',
							 doctorAdviceRisk:'',
							 doctorAdviceCent:'',
							 doctorAdviceIsTemp:''
				}
			},
			addVteDoctorAdvices(){
		    	this.$refs.addVteDoctorAdviceForm.validate(async (valid) => {
					if (valid) {
						const params = {
							...this.addVteDoctorAdviceForm
						}
						try{
							const jsonString = JSON.stringify(params);
							const result = await addVteDoctorAdvice({jsonString:jsonString});
							if (result.status == 1) {
								console.log(result)
								this.$message({
					            	type: 'success',
					            	message: '添加成功'
					          	});
								this.vteDoctorAdviceFormVisible = false;
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
