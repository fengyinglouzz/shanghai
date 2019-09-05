<template>
    <div class="fillcontain">
        <head-top ref="headTop"></head-top>
        <el-col :span="14" :offset="4" class="form_container">
          <el-form :rules="queryVteRiskScoreListFormrules" :model="queryVteRiskScoreListForm"  ref="queryVteRiskScoreListForm" label-width="150px">
				<el-col :span="12">
				  <el-form-item label="" prop="riskScoreId">
	                <el-input v-model="queryVteRiskScoreListForm.riskScoreId"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="VTE风险分度名称（文）" prop="riskScoreName">
	                <el-input v-model="queryVteRiskScoreListForm.riskScoreName"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="VTE风险分度编码（文）" prop="riskScoreCode">
	                <el-input v-model="queryVteRiskScoreListForm.riskScoreCode"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="VTE风险分度评分文本显示（文）" prop="riskScoreShowText">
	                <el-input v-model="queryVteRiskScoreListForm.riskScoreShowText"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="VTE风险分度范围最小值（数）" prop="riskScoreMinValue">
	                <el-input v-model="queryVteRiskScoreListForm.riskScoreMinValue"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="VTE风险分度范围最大值（数）" prop="riskScoreMaxValue">
	                <el-input v-model="queryVteRiskScoreListForm.riskScoreMaxValue"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="VTE发生率（数）" prop="riskScoreRate">
	                <el-input v-model="queryVteRiskScoreListForm.riskScoreRate"></el-input>
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
            	 <el-table-column   prop="riskScoreId"  label=""  min-width="150">  </el-table-column>
            	 <el-table-column   prop="riskScoreName"  label="VTE风险分度名称（文）"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="riskScoreCode"  label="VTE风险分度编码（文）"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="riskScoreShowText"  label="VTE风险分度评分文本显示（文）"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="riskScoreMinValue"  label="VTE风险分度范围最小值（数）"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="riskScoreMaxValue"  label="VTE风险分度范围最大值（数）"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="riskScoreRate"  label="VTE发生率（数）"  min-width="150">  </el-table-column>
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
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="count">
              </el-pagination>
          </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../managecomponents/addVteRiskScore'
    import {getVteRiskScoreList, getVteRiskScoreCount, addVteRiskScore} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getDictData} from '@/common/dictCache'
    import { debug } from 'util';

    
    export default {
        data(){
            return {
                queryVteRiskScoreListForm: {
							 riskScoreId:'',
							 riskScoreName:'',
							 riskScoreCode:'',
							 riskScoreShowText:'',
							 riskScoreMinValue:'',
							 riskScoreMaxValue:'',
							 riskScoreRate:''
                },
                queryVteRiskScoreListFormrules: {
                   
		            },
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
        },
        methods: {
            async initData(){
                try{
                    const params = {
                      ...this.queryVteRiskScoreListForm
                    }
                    const jsonString = JSON.stringify(params);
                    const countData = await getVteRiskScoreCount({jsonString:jsonString});
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getVteRiskScores(jsonString);
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
	          handleClick(row) {
              this.$refs.headTop.vteRiskScoreFormVisible = true;
              			this.$refs.headTop.addVteRiskScoreForm.riskScoreId = row.riskScoreId;
              			this.$refs.headTop.addVteRiskScoreForm.riskScoreName = row.riskScoreName;
              			this.$refs.headTop.addVteRiskScoreForm.riskScoreCode = row.riskScoreCode;
              			this.$refs.headTop.addVteRiskScoreForm.riskScoreShowText = row.riskScoreShowText;
              			this.$refs.headTop.addVteRiskScoreForm.riskScoreMinValue = row.riskScoreMinValue;
              			this.$refs.headTop.addVteRiskScoreForm.riskScoreMaxValue = row.riskScoreMaxValue;
              			this.$refs.headTop.addVteRiskScoreForm.riskScoreRate = row.riskScoreRate;
	        },
            handleSizeChange(val) {
              this.limit = val;
              console.log(`每页 $#{val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.initData();
            },
            reset() {
              this.$refs.queryVteRiskScoreListForm.resetFields();
            },
            search() {
              this.initData();
            },
            async getVteRiskScores(jsonString){
                const Users = await getVteRiskScoreList({offset: this.offset, limit: this.limit,jsonString:jsonString});
                this.tableData = [];
                Users.forEach(item => {
                  const tableData = {};
				   		tableData.riskScoreId = item.riskScoreId;
				   		tableData.riskScoreName = item.riskScoreName;
				   		tableData.riskScoreCode = item.riskScoreCode;
				   		tableData.riskScoreShowText = item.riskScoreShowText;
				   		tableData.riskScoreMinValue = item.riskScoreMinValue;
				   		tableData.riskScoreMaxValue = item.riskScoreMaxValue;
				   		tableData.riskScoreRate = item.riskScoreRate;
                    this.tableData.push(tableData);
                })
            },
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

