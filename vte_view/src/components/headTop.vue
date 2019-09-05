<template>
    <div class="header_container">
		<!-- 面包屑 -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item v-for="(item, index) in $route.meta.menuTitle" :key="index" :index="item.path">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
    </div>
</template>

<script>
	import {baseImgPath} from '@/config/env'

    export default {
    	data(){
    		return {
    			baseImgPath,
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
