<template>
    <div>
     	<head-top></head-top>
      <el-row style="margin-top: 20px;">
  			<el-col :span="16" :offset="4">
  				<el-tabs type="border-card">
				  <el-tab-pane label="第一步：疑诊">
				  	<el-col class="btnScoreLink" :offset="7" :span="12">
						<img src="../assets/img/PTE_1.jpg">
						<el-button type="text" @click="jumpPTE" class="wel">简化的Wells评分量表</el-button>
						<el-button type="text" @click="jumpgen" class="gen">修订版Geneva评分量表</el-button>
					</el-col>
				  </el-tab-pane>
				  <el-tab-pane label="第二步：确诊">
					<el-col class="btnScoreLink2" :offset="7" :span="12">
						<img :src="ptesrc">
						<el-button type="text" @click="clinical" class="diagnose">临床经验决策/临床可能性评估</el-button>
					</el-col>
				  </el-tab-pane>
				  <el-tab-pane label="第三步：求因">
					<img style="margin-left: 30px;" src="../assets/img/PTE_3.jpg">
				  </el-tab-pane>
				  <el-tab-pane label="第四步：危险分层">
				  	<el-col :offset="7" :span="12">
						<img src="../assets/img/PTE_4.png">
					</el-col>
				  </el-tab-pane>
				</el-tabs>
				<!-- 临床可能性评估弹窗 -->
				<el-dialog title="临床可能性评估" v-model="clinicalVisible" :close-on-click-modal="false">
					<el-form :model="clinicalForm" ref="clinicalForm" label-width="120px" style="margin-right: 30px;">
							<el-form-item label="临床可能性评估" prop="clinical">
				                <el-select v-model="clinicalForm.clinical" clearable placeholder="请选择" style="width: 100%;">
				                  <!--<el-option
				                      v-for="item in clinicalOptions"
				                      :key="item.value"
				                      :label="item.label"
				                      :value="item.value">
				                  </el-option>-->
							      <el-option label="简化Wells评分" value="1"></el-option>
							      <el-option label="修订版Geneva评分" value="2"></el-option>
				                </el-select>
							</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="clinicalCancel">取 消</el-button>
						<el-button type="primary" @click="clinicalConfirm">确 定</el-button>
					</div>
				</el-dialog>
				<br>
				<el-col :span="6" :offset="11">
					<el-button @click="cancel">返回</el-button>
				</el-col>
  			</el-col>
  		</el-row>
    </div>
</template>

<script>
 	import headTop from '@/components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getQueryVteAssessmentLastTime} from '@/api/getData'
	import menuconstants from '../constants/menuconstants'
    import pte from '../assets/img/PTE_2.jpg'
    import ptedown from '../assets/img/PTE_2_down.jpg'
    import pteup from '../assets/img/PTE_2_up.jpg'
    
    export default {
    	inject: ['reload'],
    	data(){
    		return {
    			baseUrl,
    			baseImgPath,
				patientHospitId: this.$route.query.patientHospitId,
				ptesrc: pte,
				assessmentScore: 0,
				assessmentItem: '',
    			clinicalVisible: false,
    			clinicalForm: {
    				clinical: '',
    			},
    		}
    	},
    	components: {
    		headTop,
    	},
    	created(){
			this.changePTESrc();
		},
    	methods: {
		    cancel(){
            	this.reload();
		    	this.$router.go(-1);
		    },
		    clinical(){
		    	this.clinicalVisible = true;
		    },
		    clinicalCancel(){
		    	this.clinicalVisible = false;
		    	this.clinicalForm = {
    				clinical: '',
    			}
		    },
		    clinicalConfirm(){
		    	this.clinicalVisible = false;
		    	if ( this.clinicalForm.clinical == 1 ){
		    		this.reload();
		        	this.$router.push({ 
		        		path: '/wellsPTE',
		        		query: { patientHospitId: this.$route.query.patientHospitId }
		        	});
		    	}else if ( this.clinicalForm.clinical == 2 ){
		    		this.reload();
		        	this.$router.push({ 
		        		path: '/geneva',
		        		query: { patientHospitId: this.$route.query.patientHospitId }
		        	});
		    	};
		    },
		    jumpPTE(){
		    	this.reload();
	        	this.$router.push({ 
	        		path: '/wellsPTE',
	        		query: { patientHospitId: this.$route.query.patientHospitId }
	        	});
		    },
		    jumpgen(){
		    	this.reload();
	        	this.$router.push({ 
	        		path: '/geneva',
	        		query: { patientHospitId: this.$route.query.patientHospitId }
	        	});
		    },
		    async changePTESrc() {
    			const queryVteAssessmentLastTime = await getQueryVteAssessmentLastTime({modelCode:menuconstants.wellsPTEModelCode, patientHospitId:this.$route.query.patientHospitId, superModelCode:menuconstants.wellsPTEModelCode});
    			this.assessmentScore = queryVteAssessmentLastTime.assessmentScore;
    			this.assessmentItem = queryVteAssessmentLastTime.assessmentItem;
		    	if(this.assessmentItem == '8'){
			    	if((this.assessmentScore<=1)){
	    				this.ptesrc = ptedown;
	    			}else if((this.assessmentScore>=2)){
	    				this.ptesrc = pteup;
	    			}else{
	    				this.ptesrc = pte;
	    			};
		    	}else if(this.assessmentItem == '9'){
			    	if((this.assessmentScore<=2)){
	    				this.ptesrc = ptedown;
	    			}else if((this.assessmentScore>=3)){
	    				this.ptesrc = pteup;
	    			}else{
	    				this.ptesrc = pte;
	    			};
		    	}else{
		    		this.ptesrc = pte;
		    	}
    		}
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.btnScoreLink, .btnScoreLink2{
		position: relative;
	}
	.btnScoreLink .wel,
	.btnScoreLink .gen,
	.btnScoreLink2 .diagnose{
      font-size: 14px;
      color: #20a0ff;
	  text-align: center;
	  background-color: #fff;
	  z-index: 1005;
	  position: absolute;
	  top: 28px;
	  left: 46px;
	}
	.btnScoreLink .gen{
	  left: 203px;
	}
	.btnScoreLink2 .diagnose{
	  top: 478px;
	  left: 115px;
	  padding: 5px;
	}
</style>
