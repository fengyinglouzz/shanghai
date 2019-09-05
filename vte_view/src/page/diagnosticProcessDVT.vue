<template>
    <div>
     	<head-top></head-top>
      <el-row style="margin-top: 20px;">
  			<el-col :span="5" :offset="9">
	  			<el-form :model="diagnosticDVTForm" ref="diagnosticDVTForm" label-width="150px">
						<div class="btnScoreLinkD">
							<img :src="dvtsrc">
							<el-button type="text" @click="jumpDVT" class="wells">评估深静脉血栓形成临床可能性<br>（Wells评分）</el-button>
						</div>
						<el-form-item>
							<el-button @click="cancel">返回</el-button>
						</el-form-item>
	  			</el-form>
  			</el-col>
  		</el-row>
    </div>
</template>

<script>
 	import headTop from '@/components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getQueryVteAssessmentLastTime} from '@/api/getData'
	import menuconstants from '../constants/menuconstants'
    import dvt from '../assets/img/DVT.png'
    import dvtdown from '../assets/img/DVT_down.jpg'
    import dvtup from '../assets/img/DVT_up.jpg'
    
    export default {
        inject: ['reload'],
    	data(){
    		return {
    			baseUrl,
    			baseImgPath,
				patientHospitId: this.$route.query.patientHospitId,
				dvtsrc: dvt,
				assessmentScore: 0,
    		}
    	},
    	components: {
    		headTop,
    	},
    	created(){
			this.changeDVTSrc();
		},
    	methods: {
		    cancel(){
            	this.reload();
		    	this.$router.go(-1);
		    },
		    jumpDVT(){
		    	this.reload();
	        	this.$router.push({ 
	        		path: '/wellsDVT',
	        		query: { patientHospitId: this.$route.query.patientHospitId }
	        	});
		    },
		    async changeDVTSrc() {
    			const queryVteAssessmentLastTime = await getQueryVteAssessmentLastTime({modelCode:menuconstants.wellsDVTModelCode, patientHospitId:this.$route.query.patientHospitId});
    			this.assessmentScore = queryVteAssessmentLastTime.assessmentScore;
		    	if((this.assessmentScore<=0)){
    				this.dvtsrc = dvtdown;
    			}else if((this.assessmentScore>=1)){
    				this.dvtsrc = dvtup;
    			}else{
    				this.dvtsrc = dvt;
    			}
    		}
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.btnScoreLinkD{
		position: relative !important;
	}
	.btnScoreLinkD .wells.el-button--text{
      font-size: 14px;
      color: #20a0ff;
	  text-align: center;
	  background-color: #fff;
	  z-index: 1005;
	  position: absolute;
	  top: 86px;
	  left: 90px;
	}
</style>
