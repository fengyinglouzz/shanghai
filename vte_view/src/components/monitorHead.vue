<template>
    <div class="header_container">
    	<!-- 面包屑 -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item v-for="(item, index) in $route.meta.menuTitle" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 在/出院 -->
		<el-radio-group v-model="patientOutHospital" @change="changePatientOutHospitalSelect(patientOutHospital)">
			<el-radio-button :label="1">在院</el-radio-button>
			<el-radio-button :label="2">出院</el-radio-button>
		</el-radio-group>
		<!-- 时间 -->
		<div class="btnPatientTime">
			<el-select v-model="patientLastRisk" placeholder="请选择时间" clearable style="width: 100%;" @change="changepatientLastRisk(patientLastRisk)">
				<el-option label="近一个月" value="1"></el-option>
				<el-option label="近三个月" value="2"></el-option>
				<el-option label="全部" value="3"></el-option>
			</el-select>
		</div>
    </div>
</template>

<script>
    import {getDictData} from '@/common/dictCache'
    import {baseUrl, baseImgPath} from '@/config/env'

    export default {
    	data(){
    		return {
    			baseImgPath,
				patientLastRisk: '1',
				patientOutHospital: '1'
    		}
    	},
    	created(){
    		this.$parent.initData();
    		this.patientOutHospital = '1';
    		this.patientLastRisk = '1';
    	},
    	methods: {
    		/* 切换在/出院 */
			changePatientOutHospitalSelect(val){
				this.patientOutHospital = val;
    			this.$parent.initData();
			},
			/* 切换时间 */
			changepatientLastRisk(val){
				this.patientLastRisk = val;
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
</style>
