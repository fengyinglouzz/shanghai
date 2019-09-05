<template>
    <div class="header_container">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item v-for="(item, index) in $route.meta.menuTitle" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-button class="btnRightRift" @click="showSaveForm">添加字典子项</el-button>
		<el-dialog :title="title" v-model="systemDictDataFormVisible" :before-close="handleDialogClose" :close-on-click-modal="false">
			<el-form :rules="addSystemDictDataFormrules" :model="addSystemDictDataForm" ref="addSystemDictDataForm" label-width="100px" style="margin-right: 30px;">
					<el-col :span="12">
					  	<el-form-item label="字典数据" prop="dictId">
			                <el-select v-bind:disabled="disabledInput" v-model="addSystemDictDataForm.dictId" clearable placeholder="请选择" style="width: 100%;">
			                  <el-option
			                      v-for="item in dictOptions"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                  </el-option>
			                </el-select>
			              </el-form-item>
		            </el-col>
				
					<el-col :span="12">
					  	<el-form-item label="字典数据项名称" prop="dictDataName">
			              <el-input v-model="addSystemDictDataForm.dictDataName"></el-input>
			              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  	<el-form-item label="字典数据项值" prop="dictDataValue">
			                 <el-input v-model="addSystemDictDataForm.dictDataValue"></el-input>
			              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  	<el-form-item label="字典数据项备注" prop="dictDataMemo">
			                <el-input v-model="addSystemDictDataForm.dictDataMemo"></el-input>
			              </el-form-item>
		            </el-col>
					<el-col :span="12">
					  	<el-form-item label="字典数据项排序" prop="dictDataSeq">
			                 <el-input v-model="addSystemDictDataForm.dictDataSeq"></el-input>
			              </el-form-item>
		            </el-col>
			</el-form>
			<div :span="24" slot="footer" class="dialog-footer">
				<el-button @click="hideSaveForm">取 消</el-button>
				<el-button type="primary" @click="addSystemDictDatas">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
	import {addSystemDictData,getSystemDictList,getSystemDictPojoList} from '@/api/getData'
	import {baseImgPath} from '@/config/env'
	import {mapActions, mapState} from 'vuex'
    export default {
		data(){
			return{
				systemDictDataFormVisible: false,
				title:"",
				addSystemDictDataForm: {
							 dictDataId:'',
							 dictId:'',
							 dictDataName:'',
							 dictDataValue:'',
							 dictDataMemo:'',
							 dictDataSeq:''
		        },
		        addSystemDictDataFormrules: {
							dictId:[{required:true,message:'字典名称不能为空'}],
							dictDataName:[{required:true,message:'字典项不能为空'}],
							dictDataValue:[{required:true,message:'字典项值不能为空'}],
		        },
						disabledInput:false,
						dictOptions:[]
			}
		},
		created(){
				this.loadDict();
		},
		methods: {
			showSaveForm(){
				this.systemDictDataFormVisible = true;
				this.title="添加字典子项";
				this.disabledInput=false;
				this.claerFrom();
			},
			hideSaveForm(){
				this.systemDictDataFormVisible = false;
				this.claerFrom();
				this.$refs["addSystemDictDataForm"].resetFields(); 
			},
			handleDialogClose(){
				this.systemDictDataFormVisible = false;
				this.claerFrom();
				this.$refs["addSystemDictDataForm"].resetFields(); 
			},
			claerFrom(){
				this.addSystemDictDataForm = {
							 dictDataId:'',
							 dictId:'',
							 dictDataName:'',
							 dictDataValue:'',
							 dictDataMemo:'',
							 dictDataSeq:''
				}
			},
			addSystemDictDatas(){
		    	this.$refs.addSystemDictDataForm.validate(async (valid) => {
					if (valid) {
						const params = {
							...this.addSystemDictDataForm
						}
						try{
							const jsonString = JSON.stringify(params);
							const result = await addSystemDictData({jsonString:jsonString});
							if (result.status == 1) {
								const dictDataId=this.addSystemDictDataForm.dictDataId
								var meg=""
								if(dictDataId != null && dictDataId != ""){
									meg="修改成功";
								}else{
									meg="添加成功";
								}
								console.log(result)
								this.$message({
					            	type: 'success',
					            	message: meg
					          	});
								this.systemDictDataFormVisible = false;
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
				async loadDict(){
                const hData = await getSystemDictPojoList();
                hData.forEach((item, index) => {
                    this.dictOptions.push({
                      label: item.dictName,
                      value: item.dictId,
                      index,
                    })
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
