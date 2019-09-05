<template>
    <div class="header_container">
    	<!-- 面包屑 -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item v-for="(item, index) in $route.meta.menuTitle" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 时间类型 -->
		<el-radio-group v-model="active" @change="changePatientActive">
			<el-radio-button :label="1">年</el-radio-button>
			<el-radio-button :label="2">月</el-radio-button>
			<el-radio-button :label="3">周</el-radio-button>
		</el-radio-group>
		<!-- 具体时间 -->
		<div class="btnPatientTime">
			<el-date-picker type="year" v-model="yearTime" placeholder="请选择年" :class="{'hideContent': year}" @change="changeYearTime(yearTime)"></el-date-picker>
			<el-date-picker type="month" v-model="monthTime" placeholder="请选择月" :class="{'hideContent': month}" @change="changeMonthTime(monthTime)"></el-date-picker>
			<el-date-picker type="week" :picker-options="pickerOptions" format="yyyy 年第 WW 周" v-model="weekTime" firstDayOfWeek="1" placeholder="请选择周" :class="{'hideContent': week}" @change="changeWeekTime(weekTime)"></el-date-picker>
		</div>
		<el-button class="exportAll" @click="exportExcel">导出质控视图数据</el-button>
		<el-dialog title="导出历史记录" v-model="exportExcelVisible" :close-on-click-modal="false">
			<p>是否确认导出历史记录？</p>
			<div slot="footer" class="dialog-footer">
				<el-button @click="exportCancelExcel">取 消</el-button>
				<el-button type="primary" @click="exportAllInExcel">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
    import {baseUrl, baseImgPath} from '@/config/env'
	import {getDictData} from '@/common/dictCache'
	import {exportAll} from '@/api/getData'

    export default {
    	data(){
    		return {
				exportExcelVisible: false,
    			baseImgPath,
				yearTime: '',
				monthTime: '',
				weekTime: '',
				active: 3,
				year: false,
				month: false,
				week: true,
				pickerOptions: {
					firstDayOfWeek: 1
				},
    		}
    	},
    	created(){
			//this.$parent.initData();
			//初始化默认值
			//this.weekTime = new Date();
    	},
		methods: {
			exportAllInExcel() {
				var dateStr = this.getDateString(); 
				var dateType = this.active;
				this.exportConfirmExcel(dateStr,dateType)
			},
			async exportConfirmExcel(dateStr,dateType){
				const loading = this.$loading({
		          lock: true,
		          text: '正在导出...',
		          spinner: 'el-icon-loading',
		          background: 'rgba(0, 0, 0, 0.7)'
		        });
				const params = {};
					params.date = dateStr;
					params.dateType = dateType;
				const jsonString = JSON.stringify(params);
				const result = await exportAll({jsonString:jsonString});
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
			exportExcel() {
	            console.log("导出");
				this.exportExcelVisible = true;
			},
			exportCancelExcel(){
				console.log("取消导出");
				this.exportExcelVisible = false;
			},
			getDateString(){
				var dateStr = ""; 
				var dateType = this.active;
				if(dateType == '1' && this.yearTime){
					dateStr = this.yearTime.getFullYear();
				}else if(dateType == '2' && this.monthTime){
					dateStr = this.monthTime.getFullYear() + "-";
					const mouthc = this.monthTime.getMonth() + 1;
					if(mouthc<=9){
						dateStr = dateStr+"0";
					}
					dateStr = dateStr+mouthc;
				}else if(dateType == '3' && this.weekTime){
					
					dateStr = this.weekTime.getFullYear() + "-";
					const mouthc = this.weekTime.getMonth() + 1;
					if(mouthc<=9){
						dateStr = dateStr+"0";
					}
					dateStr = dateStr+mouthc + "-" ;
					const datec = this.weekTime.getDate();
					if(datec<=9){
						dateStr = dateStr+"0";
					}
					dateStr = dateStr+datec;
				}
				return dateStr;
			},
			/* 切换时间类型 */
			changePatientActive(){
				if( this.active == 1 ){
					this.year = true;
					this.month = false;
					this.week = false;
					this.$parent.initData();
				}else if( this.active == 2 ){
					this.year = false;
					this.month = true;
				    this.week = false;
				    this.$parent.initData();
				}else{
					this.year = false;
					this.month = false;
					this.week = true;
					this.$parent.initData();
				}
			},
			/* 切换年 */
			changeYearTime(val){
              	this.yearTime = val;
    			this.$parent.initData();
			},
			/* 切换月 */
			changeMonthTime(val){
              	this.monthTime = val;
    			this.$parent.initData();
			},
			/* 切换周 */
			changeWeekTime(val){
              	this.weekTime = val;
				this.$parent.initData();
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
		position: relative;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
	.el-radio-group{
		position: absolute;
		left:200px;
	}
	.btnPatientTime{
		position: absolute;
		left:400px;
	}
	.btnPatientTime .el-date-editor.el-input{
		display: none;
	}
	.btnPatientTime .el-date-editor.el-input.hideContent{
		display: inline-block;
	}
</style>
