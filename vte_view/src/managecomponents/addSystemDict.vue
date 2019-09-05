<template>
    <div class="header_container">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item v-for="(item, index) in $route.meta.menuTitle" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-button class="btnRightRift" @click="showSaveForm">添加字典</el-button>
		<el-dialog :title="title" v-model="systemDictFormVisible" :before-close="handleDialogClose" :close-on-click-modal="false">
			<el-form :rules="addSystemDictFormrules" :model="addSystemDictForm" ref="addSystemDictForm" label-width="100px" style="margin-right: 30px;">
					
					
					  <el-col :span="12" v-if="show">
              <el-form-item label="医院名称" prop="hospitalId">
                 <el-select v-model="addSystemDictForm.hospitalId" clearable placeholder="请选择">
                  <el-option
                      v-for="item in hospitaldOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
					 <el-col :span="12">
					  	<el-form-item label="字典名称" prop="dictName">
							   <el-input v-model="addSystemDictForm.dictName"></el-input>
			        </el-form-item>
		            </el-col>
					<el-col :span="12">
					  	<el-form-item label="字典编码" prop="dictCode">
							   <el-input v-model="addSystemDictForm.dictCode"></el-input>
			        </el-form-item>
		      </el-col>
					<el-col :span="12">
					  <el-form-item label="国际化编码（参照各国语言缩写）" prop="dictInternational">
		                <el-input v-model="addSystemDictForm.dictInternational"></el-input>
		              </el-form-item>
		      </el-col>
					
			</el-form>
			<div :span="24" slot="footer" class="dialog-footer">
				<el-button @click="hideSaveForm">取 消</el-button>
				<el-button type="primary" @click="addSystemDicts">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
	import {addSystemDict,getHospitalPojoList} from '@/api/getData'
	import {baseImgPath} from '@/config/env'
	import {mapActions, mapState} from 'vuex'
    export default {
		data(){
			return{
				systemDictFormVisible: false,
				title:'',
				addSystemDictForm: {
							 dictId:'',
							 orgId:'',
							 dictName:'',
							 dictCode:'',
							 dictAlias:'',
							 dictDefaultValue:'',
							 dictSeq:'',
							 dictMemo:'',
							 dictMultiselect:'',
							 dictInternational:'',
							 dictVersion:''
		        },
		        addSystemDictFormrules: {
							//orgId:[{required:true,message:'医院不能为空'}],
							dictName:[{required:true,message:'字典名称不能为空'}],
							dictCode:[{required:true,message:'字典编码不能为空'}],
							dictInternational:[{required:true,message:'国际语言编码不能为空'}]
		        },
						hospitaldOptions:[],
						hospitaldData:[],
						show:false
			}
		},
		created(){
			//	this.loadHospitaldDataAdd();
				},
		methods: {
			showSaveForm(){
				this.systemDictFormVisible = true;
				this.title="添加字典";
				this.claerFrom();
			},
			hideSaveForm(){
				this.systemDictFormVisible = false;
				this.claerFrom();
				this.$refs["addSystemDictForm"].resetFields(); //清空提示信息 
			},
			handleDialogClose(){
				this.systemDictFormVisible = false;
				this.claerFrom();
				this.$refs["addSystemDictForm"].resetFields(); //清空提示信息 
			},
			async loadHospitaldDataAdd(){
					if(this.hospitaldData.length == 0){
							const hData = await getHospitalPojoList();
							this.hospitaldData = hData;
					}
					this.hospitaldOptions = [];
					this.hospitaldData.forEach((item, index) => {
							this.hospitaldOptions.push({
								label: item.hospitalName,
								value: item.hospitalId,
								index,
							});
					});
			},
			claerFrom(){
				this.addSystemDictForm = {
							 dictId:'',
							 orgId:'',
							 dictName:'',
							 dictCode:'',
							 dictAlias:'',
							 dictDefaultValue:'',
							 dictSeq:'',
							 dictMemo:'',
							 dictMultiselect:'',
							 dictInternational:'',
							 dictVersion:''
				}
			},
			addSystemDicts(){
		    	this.$refs.addSystemDictForm.validate(async (valid) => {
					if (valid) {
						const params = {
							...this.addSystemDictForm
						}
						try{
							params.orgId=1;
							const jsonString = JSON.stringify(params);
							const result = await addSystemDict({jsonString:jsonString});
							if (result.status == 1) {
								const dictId=this.addSystemDictForm.dictId
								var meg=""
								if(dictId != null && dictId != ""){
									meg="修改成功";
								}else{
									meg="添加成功";
								}
								console.log(result)
								this.$message({
					            	type: 'success',
					            	message: meg
					          	});
								this.systemDictFormVisible = false;
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
