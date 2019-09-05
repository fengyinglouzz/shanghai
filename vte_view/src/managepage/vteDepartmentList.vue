<template>
    <div class="fillcontain">
        <head-top ref="headTop"></head-top>
        <el-col :span="14" :offset="4" class="form_container">
          <el-form :rules="queryVteDepartmentListFormrules" :model="queryVteDepartmentListForm"  ref="queryVteDepartmentListForm" label-width="150px">
				<el-col :span="12">
				  <el-form-item label="科室编码" prop="departmentCode">
	                <el-select v-model="queryVteDepartmentListForm.departmentCode" clearable placeholder="请选择" style="width: 100%;"  >
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
	                <el-input v-model="queryVteDepartmentListForm.departmentName"></el-input>
	              </el-form-item>
	            </el-col>
				<!-- <el-col :span="12">
				<el-form-item label="是否进行中高危检测" prop="departmentMonitor">
	                <el-select v-model="queryVteDepartmentListForm.departmentMonitor" clearable placeholder="请选择" style="width: 100%;">
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
				  <el-form-item label="是否进行质控视图" prop="departmentQualitycontrol">
	               <el-select v-model="queryVteDepartmentListForm.departmentQualitycontrol" clearable placeholder="请选择" style="width: 100%;">
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
	                <el-input v-model="queryVteDepartmentListForm.departmentSort"></el-input>
	              </el-form-item>
	            </el-col>
            <el-col :span="12" :offset="8">
              <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
                <el-button @click="reset">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
        <div class="table_container">
          <el-table
            :data="tableData"
            max-height="460"
            border>
            	 <el-table-column   prop="departmentCode"  label="科室编码"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="departmentName"  label="科室名称"  min-width="150">  </el-table-column>
            	<!-- <el-table-column   prop="departmentMonitor"  label="是否进行中高危检测"  min-width="150">  </el-table-column>-->
            	 <el-table-column   prop="departmentQualitycontrol"  label="是否进行质控视图"  min-width="150">  </el-table-column>
               <el-table-column   prop="departmentQualitycontrolE"  label="是否进行质控视图" v-if="false"  min-width="150">  </el-table-column><!-- 编辑回显需要用的字段 -->
            	 <el-table-column   prop="departmentSort"  label="科室排序"  min-width="150">  </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="80">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="Pagination" style="text-align: left;margin-top: 10px;">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40, 50, 100]"
                :page-size="limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="count">
              </el-pagination>
          </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../managecomponents/addVteDepartment'
    import {getVteDepartmentList, getVteDepartmentCount, addVteDepartment,getSystemDepartmentList} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getDictData} from '@/common/dictCache'
    import { debug } from 'util';

    
    export default {
        data(){
            return {
              queryVteDepartmentListForm: {
							 departmentId:'',
							 departmentCode:'',
							 departmentName:'',
							 departmentMonitor:'',
							 departmentQualitycontrol:'',
							 departmentSort:''
                },
                queryVteDepartmentListFormrules: {
                   
		            },
                vteDepartmentOptions:[],
               /* departmentMonitorOptions:[
                  {value:"1",text:"是",label:"是"},
                  {value:"2",text:"否",label:"否"}
                ],*/
                departmentQualitycontrolOptions:[
                  {value:"1",text:"1",label:"是"},
                  {value:"2",text:"2",label:"否"}
                ],
			          baseUrl,
                baseImgPath,
                tableData: [],
                currentPage: 1,
                offset: 0,
                limit: 10,
                count: 0
            }
        },
        components: {
          headTop,
        },
        created(){
            this.initData();
            this.loadvteDepartmentCode();
        },
        methods: {
            async initData(){
                try{
                    const params = {
                      ...this.queryVteDepartmentListForm
                    }
                    const jsonString = JSON.stringify(params);
                    const countData = await getVteDepartmentCount({jsonString:jsonString});
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getVteDepartments(jsonString);
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
	          handleClick(row) {
              this.$refs.headTop.vteDepartmentFormVisible = true;
              this.$refs.headTop.title="患者科室管理信息";
              this.$refs.headTop.addVteDepartmentForm.departmentId = row.departmentId;
              if(row.departmentCode!=null) this.$refs.headTop.addVteDepartmentForm.departmentCode = row.departmentCode;
              if(row.departmentName!=null) this.$refs.headTop.addVteDepartmentForm.departmentName = row.departmentName;
              
           // if(row.departmentMonitor!=null)  this.$refs.headTop.addVteDepartmentForm.departmentMonitor = String(row.departmentMonitor);
              if(row.departmentQualitycontrol!=null) 	this.$refs.headTop.addVteDepartmentForm.departmentQualitycontrol = String(row.departmentQualitycontrolE);
              if(row.departmentSort!=null) this.$refs.headTop.addVteDepartmentForm.departmentSort = row.departmentSort;
	        },
            handleSizeChange(val) {
              this.limit = val;
              console.log(`每页 $#{val} 条`);
               this.initData();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.initData();
            },
            reset() {
              this.$refs.queryVteDepartmentListForm.resetFields();
            },
            search() {
              this.initData();
            },
            async getVteDepartments(jsonString){
                const Users = await getVteDepartmentList({offset: this.offset, limit: this.limit,jsonString:jsonString});
                this.tableData = [];
                Users.forEach(item => {
                  const tableData = {};
				   		tableData.departmentId = item.departmentId;
				   		tableData.departmentCode = item.departmentCode;
				   		tableData.departmentName = item.departmentName;
              /* if(item.departmentMonitor==1){
                 tableData.departmentMonitor = "是";
               }else if(item.departmentMonitor==2){
                  tableData.departmentMonitor = "否";
               }*/
				   		if(item.departmentQualitycontrol==1){
                 tableData.departmentQualitycontrol = "是";
              }else if(item.departmentQualitycontrol==2){
                  tableData.departmentQualitycontrol = "否";
               }
              tableData.departmentQualitycontrolE=item.departmentQualitycontrol;
				   		tableData.departmentSort = item.departmentSort;
                    this.tableData.push(tableData);
                })
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
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
    .form_container{
      padding-top: 20px;
    }
    .line{
      text-align: center;
    }
    .hideContent{
      display: none;
    }
</style>

