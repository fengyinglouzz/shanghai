<template>
    <div class="header_container">
    	<!-- 面包屑 -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item v-for="(item, index) in $route.meta.menuTitle" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 添加患者 -->
		<el-button class="btnRightRift" @click="showSaveForm">添加患者</el-button>
		<!-- 添加患者弹窗 -->
		<el-dialog title="添加患者" v-model="addPatientFormVisible" :close-on-click-modal="false" @close="closeAddForm">
			<el-form :rules="addPatientFormrules" :model="addPatientForm" ref="addPatientForm" label-width="100px" style="margin-right: 30px;">
				<el-col :span="12">
				<el-form-item label="住院号" prop="patientCode">
					<el-input v-model="addPatientForm.patientCode"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="病案号" prop="patientNumber">
					<el-input v-model="addPatientForm.patientNumber"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="姓名" prop="patientName">
					<el-input v-model="addPatientForm.patientName"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="身份证号" prop="patientIdCode">
					<el-input v-model="addPatientForm.patientIdCode"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="性别" prop="patientSex">
					<el-input v-model="addPatientForm.patientSex"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="年龄" prop="patientAge">
					<el-input v-model="addPatientForm.patientAge"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="籍贯" prop="patientNativePlace">
					<el-input v-model="addPatientForm.patientNativePlace"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="民族" prop="patientNation">
					<el-input v-model="addPatientForm.patientNation"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="职业" prop="patientJob">
					<el-input v-model="addPatientForm.patientJob"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="婚姻状况" prop="patientMarital">
					<el-input v-model="addPatientForm.patientMarital"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="手机号" prop="patientPhoneNumber">
					<el-input v-model="addPatientForm.patientPhoneNumber"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="科室" prop="patientDepartment">
					<el-input v-model="addPatientForm.patientDepartment"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="病区" prop="patientArea">
					<el-input v-model="addPatientForm.patientArea"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="病床" prop="patientBed">
					<el-input v-model="addPatientForm.patientBed"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="责任医生" prop="patientDoctor">
					<el-input v-model="addPatientForm.patientDoctor"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="入院时间" prop="patientInHospital">
					<el-date-picker type="datetime" :picker-options="pickerOptionsin" v-model="addPatientForm.patientInHospital" style="width: 100%;"></el-date-picker>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="出院时间" prop="patientOutHospital">
					<el-date-picker type="datetime" :picker-options="pickerOptionsout" v-model="addPatientForm.patientOutHospital"  style="width: 100%;"></el-date-picker>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label=" ">
					<el-input readonly class="noBorderWrap"></el-input>
				</el-form-item>
				</el-col>
			</el-form>
			<div :span="24" slot="footer" class="dialog-footer">
				<el-button @click="hideSaveForm">取 消</el-button>
				<el-button type="primary" @click="addPatients" :disabled="queding">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
    import {addPatient} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getDictData} from '@/common/dictCache'

    export default {
		data(){
			return{
				addPatientFormVisible: false,
				addPatientForm: {
		          	patientCode: '',
		          	patientNumber: '',
		          	patientName: '',
		          	patientIdCode: '',
		          	patientSex: '',
		          	patientAge: '',
		          	patientNativePlace: '',
		          	patientNation: '',
		          	patientJob: '',
		          	patientMarital: '',
		          	patientPhoneNumber: '',
		          	patientDepartment: '',
		          	patientArea: '',
		          	patientBed: '',
		          	patientDoctor: '',
		          	patientInHospital: '',
		          	patientOutHospital: '',
		        },
		        pickerOptionsin: {
					firstDayOfWeek: 1
				},
				pickerOptionsout: {
					firstDayOfWeek: 1
				},
		        addPatientFormrules: {
		        	patientCode: [
						{ required: true, message: '请输入住院号', trigger: 'blur' },
					],
		        	patientNumber: [
						{ required: true, message: '请输入病案号', trigger: 'blur' },
					],
		        	patientName: [
						{ required: true, message: '请输入姓名', trigger: 'blur' },
					],
		        	patientIdCode: [
						{ required: true, message: '请输入身份证号', trigger: 'blur' },
					],
		        	patientSex: [
						{ required: true, message: '请输入性别', trigger: 'blur' },
					],
		        	patientAge: [
						{ required: true, message: '请输入年龄', trigger: 'blur' },
					],
		        	patientDepartment: [
						{ required: true, message: '请输入科室', trigger: 'blur' },
					],
		        	patientArea: [
						{ required: true, message: '请输入病区', trigger: 'blur' },
					],
		        	patientBed: [
						{ required: true, message: '请输入病床', trigger: 'blur' },
					],
		        	patientDoctor: [
						{ required: true, message: '请输入责任医生', trigger: 'blur' },
					],
		        	patientInHospital: [
						{ required: true, type:'date', message: '请输入正确的入院时间', trigger: 'change'},
					],
		        },
		        queding: false,
			}
		},
		methods: {
			/* 显示添加患者弹窗 */
			showSaveForm(){
				this.addPatientFormVisible = true;
				this.claerFrom();
				this.queding = false;
			},
			/* 隐藏添加患者弹窗 */
			hideSaveForm(){
				this.claerFrom();
				this.addPatientFormVisible = false;
				this.$refs["addPatientForm"].resetFields();
				this.queding = false;
			},
			/* 清除弹窗内容 */
			claerFrom(){
				this.addPatientForm = {
    				patientCode: '',
					patientNumber: '',
					patientName: '',
					patientIdCode: '',
					patientSex: '',
					patientAge: '',
					patientNativePlace: '',
					patientNation: '',
					patientJob: '',
					patientMarital: '',
					patientPhoneNumber: '',
					patientDepartment: '',
					patientArea: '',
					patientBed: '',
					patientDoctor: '',
					patientInHospital: '',
					patientOutHospital: '',
				}
			},
			closeAddForm(){
				this.claerFrom();
				this.addPatientFormVisible = false;
				this.$refs["addPatientForm"].resetFields();
				this.queding = false;
			},
			/* 添加提交验证 */
		    async	addPatients(){
		    	this.$refs.addPatientForm.validate(async (valid) => {
					if (valid) {
						this.queding = true;
						const params = {
							...this.addPatientForm
						}
						try{
							const jsonString = JSON.stringify(params);
							const result = await addPatient({jsonString:jsonString});
							if (result.status == 1) {
								console.log(result)
								this.$message({
					            	type: 'success',
					            	message: '添加成功'
					          	});
								this.addPatientFormVisible = false;
								this.claerFrom();
								this.$refs["addPatientForm"].resetFields();
							}else{
								this.$message({
					            	type: 'error',
					            	message: result.message
					          	});
							}
							this.$parent.initData();
							this.queding = false;
						}catch(err){
							console.log(err);
							this.queding = false;
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
