<template>
    <div class="header_container">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item v-for="(item, index) in $route.meta.menuTitle" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-button class="btnRightRift" @click="showSaveForm">添加患者科室</el-button>
		<el-dialog :title="title" v-model="vteDepartmentFormVisible" :before-close="handleDialogClose" :close-on-click-modal="false">
			<el-form :rules="addVteDepartmentFormrules" :model="addVteDepartmentForm" ref="addVteDepartmentForm" label-width="150px" style="margin-right: 30px;">
					<el-col :span="12">
							<el-form-item label="科室编码" prop="departmentCode">
							 <el-select v-model="addVteDepartmentForm.departmentCode" clearable placeholder="请选择" style="width: 100%;">
                  <el-option
                      v-for="item in vteDepartmentOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
					  <el-form-item label="科室名称" prop="departmentName">
		                <el-input v-model="addVteDepartmentForm.departmentName"></el-input>
		              </el-form-item>
		            </el-col>
				<!--	<el-col :span="12">
				 <el-form-item label="是否中高危检测" prop="departmentMonitor">
		                <el-select v-model="addVteDepartmentForm.departmentMonitor" clearable placeholder="请选择" style="width: 100%;">
                  <el-option
                      v-for="item in departmentMonitorOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
		              </el-form-item>
		            </el-col> -->
					<el-col :span="12">
					  <el-form-item label="是否质控视图" prop="departmentQualitycontrol">
		                <el-select v-model="addVteDepartmentForm.departmentQualitycontrol" clearable placeholder="请选择" style="width: 100%;">
                  <el-option
                      v-for="item in departmentQualitycontrolOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
		              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  <el-form-item label="科室排序" prop="departmentSort">
		                <el-input v-model="addVteDepartmentForm.departmentSort"></el-input>
		              </el-form-item>
		            </el-col>
			</el-form>
			<div :span="24" slot="footer" class="dialog-footer">
				<el-button @click="hideSaveForm">取 消</el-button>
				<el-button type="primary" @click="addVteDepartments">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
	import {addVteDepartment,getSystemDepartmentList} from '@/api/getData'
	import {baseImgPath} from '@/config/env'
	import {mapActions, mapState} from 'vuex'
    export default {
		data(){
			return{
				vteDepartmentFormVisible: false,
				addVteDepartmentForm: {
					departmentId:'',
					departmentCode:'',
					departmentName:'',
					departmentMonitor:'',
					departmentQualitycontrol:'',
					departmentSort:''
				},
				addVteDepartmentFormrules: {
					departmentName:[{required:true,message:'科室名称不能为空'}]
				},
				vteDepartmentOptions:[],
			/*	departmentMonitorOptions:[
					 {value:"1",text:"1",label:"是"},
           {value:"2",text:"2",label:"否"}
				],*/
				departmentQualitycontrolOptions:[
					{value:"1",text:"1",label:"是"},
          {value:"2",text:"2",label:"否"}
				],
				title:""
			}
		},
		created(){
				this.loadvteDepartmentCode();
				},
		methods: {
			showSaveForm(){
				this.title="添加患者科室";
				this.vteDepartmentFormVisible = true;
				this.claerFrom();
			},
			hideSaveForm(){
				this.vteDepartmentFormVisible = false;
				this.claerFrom();
				this.reset();
			},
			handleDialogClose(){
				this.vteDepartmentFormVisible = false;
				this.claerFrom();
				this.reset();
			},
			claerFrom(){
				this.addVteDepartmentForm = {
							 departmentId:'',
							 departmentCode:'',
							 departmentName:'',
						//	 departmentMonitor:'',
							 departmentQualitycontrol:'',
							 departmentSort:''
				}
			},
			reset() {
              this.$refs.addVteDepartmentForm.resetFields();
            },
			addVteDepartments(){
		    	this.$refs.addVteDepartmentForm.validate(async (valid) => {
					if (valid) {
						const params = {
							...this.addVteDepartmentForm
						}
						try{
						  const jsonString = JSON.stringify(params);
							const result = await addVteDepartment({jsonString:jsonString});
							if (result.status == 1) {
								const departmentId=this.addVteDepartmentForm.departmentId
								var meg=""
								if(departmentId != null && departmentId != ""){
									meg="修改成功";
								}else{
									meg="添加成功";
								}
								console.log(result)
								this.$message({
					            	type: 'success',
					            	message: meg
					          	});
								this.vteDepartmentFormVisible = false;
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
		    },
			  async	loadvteDepartmentCode(){
					const data={};
					data.orgType="department";
					const jsonString = JSON.stringify(data);
				  const hData = await getSystemDepartmentList({jsonString:jsonString});
					hData.forEach((item, index) => {
							this.vteDepartmentOptions.push({
								label: item.orgCode,
								value: item.orgCode,
								index,
							});
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
