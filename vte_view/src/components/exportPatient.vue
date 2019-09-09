<template>
    <div class="header_container">
    	<!-- 面包屑 -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item v-for="(item, index) in $route.meta.menuTitle" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 预防策略，预防措施 -->
		<div class="systemRecommendation">基于<el-button type="text" @click="preventionView">预防策略</el-button>，系统根据评估结果推荐：<el-button type="text"  @click="preventionTip">{{assessmentStrategyName}}</el-button></div>
		<!-- 导出历史记录 -->
		<el-button class="btnRightRift" @click="exportExcel">评分明细导出</el-button>
		<!-- 预防策略弹窗 -->
		<el-dialog title="预防策略" v-model="preventionViewVisible" :close-on-click-modal="false">
			<img src="../assets/img/preventionView.png">
		</el-dialog>
		<!-- 预防措施弹窗 -->
		<el-dialog title="预防措施推荐" v-model="preventionTipVisible" :close-on-click-modal="false">
			<img src="../assets/img/preventionTip1.jpg" :class="{'hideContent': tip1}">
			<img src="../assets/img/preventionTip2.jpg" :class="{'hideContent': tip2}">
			<img src="../assets/img/preventionTip3.jpg" :class="{'hideContent': tip3}">
		</el-dialog>
		<!-- 导出弹窗 -->
		<el-dialog title="导出历史记录" v-model="exportExcelVisible" :close-on-click-modal="false">
			<p>是否确认导出历史记录？</p>
			<div slot="footer" class="dialog-footer">
				<el-button @click="exportCancelExcel">取 消</el-button>
				<el-button type="primary" @click="exportConfirmExcel">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
    import {getQueryListExport, getQueryAssessmentStrategy} from '@/api/getData'
    import {getDictData} from '@/common/dictCache'
    import {baseUrl, baseImgPath} from '@/config/env'

    export default {
    	data(){
    		return {
				patientHospitId: this.$route.query.patientHospitId,
    			baseImgPath,
				preventionViewVisible: false,
				preventionTipVisible: false,
				exportExcelVisible: false,
				assessmentStrategyName: '',
				assessmentStrategyType: '',
				tip1: false,
				tip2: true,
				tip3: true,
    		}
    	},
    	created(){
    		this.preventionTip();
    	},
		methods: {
			/* 显示预防策略弹窗 */
			preventionView() {
				this.preventionViewVisible = true;
			},
			/* 显示预防措施弹窗 */
			preventionTip() {
				/* 1-尽早活动、避免脱水；
           		 * 2-抗凝药物预防或机械预防；
           		 * 3-抗凝药物预防
           		 * 4-机械预防
           		 * 5-机械预防，直至出血风险消失可启用药物预防
           		 * 6-抗凝药物预防+机械预防
           		 * 7-尚无结果，需完善评估或关注预防禁忌项
           		 **/
           		if( this.assessmentStrategyType == 2 || this.assessmentStrategyType == 6 ){
           			this.tip1 = false;
           			this.tip2 = true;
           			this.tip3 = true;
					this.preventionTipVisible = true;
           		}else if( this.assessmentStrategyType == 4 || this.assessmentStrategyType == 5 ){
           			this.tip1 = true;
           			this.tip2 = false;
           			this.tip3 = true;
					this.preventionTipVisible = true;
           		}else if( this.assessmentStrategyType == 3 ){
           			this.tip1 = true;
           			this.tip2 = true;
           			this.tip3 = false;
					this.preventionTipVisible = true;
           		}else{
           			this.tip1 = true;
           			this.tip2 = true;
           			this.tip3 = true;
					this.preventionTipVisible = false;
           		};
           		this.$parent.initData();
			},
			/* 显示导出弹窗 */
			exportExcel() {
	            console.log("导出");
				this.exportExcelVisible = true;
			},
			/* 确认导出验证 */
			async exportConfirmExcel(){
				const loading = this.$loading({
		          lock: true,
		          text: '正在导出...',
		          spinner: 'el-icon-loading',
		          background: 'rgba(0, 0, 0, 0.7)'
		        });
				const params = {};
				params.patientHospitId = this.$route.query.patientHospitId;
				const jsonString = JSON.stringify(params);
				const result = await getQueryListExport({jsonString:jsonString,excelStr:".xlsx"});
				this.exportCancelExcel();
				if(result.status == '1'){
					window.open(result.filePath);
					loading.close();
					/*this.$message({
						type: 'success',
						message: '导出成功'
					});*/
				}else{
					this.$message({
						type: 'error',
						message: result.message
					});
				}
			},
			/* 取消导出 */
			exportCancelExcel(){
				console.log("取消导出");
				this.exportExcelVisible = false;
			},
			/* 获取预防措施类型 */
			async getQueryAssessmentStrategy(patientHospitId){
                try{
                	const queryAssessmentStrategyc = await getQueryAssessmentStrategy({patientHospitId:patientHospitId});
               		this.assessmentStrategyName = queryAssessmentStrategyc.assessmentStrategyName;
               		this.assessmentStrategyType = queryAssessmentStrategyc.assessmentStrategyType;
					this.$parent.initData();
                }catch(err){
                    console.log('获取数据失败', err);
                }
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
	.el-dropdown-menu__item{
        text-align: center;
    }
	.systemRecommendation{
		color: #48576a;
		font-size: 14px;
	}
	.systemRecommendation a{
		color: #20a0ff;
		text-decoration: none;
	}
	.systemRecommendation a:hover{
		text-decoration: underline;
	}
	.hideContent{
		display: none;
	}
</style>
