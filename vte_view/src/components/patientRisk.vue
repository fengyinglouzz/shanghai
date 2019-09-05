<template>
    <div class="line2">
        <div id="line2" class="" style="width: 96%;height:450px;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
    import 'echarts/lib/component/toolbox';
    import 'echarts/lib/component/markPoint';
    import 'echarts/lib/component/tooltip';
	import 'echarts/lib/component/dataZoom';
    export default {
        mounted(){
            this.myChart = echarts.init(document.getElementById('line2'));
        },
        methods: {
            initData(department,capriniHighRisk,capriniMiddleRisk,paduaHighRisk){
                const option = {
				    tooltip : {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    legend: {
				        data: ['Caprini中危人数', 'Caprini高危人数','Padua高危人数']
				    },
				    grid: {
				        left: '3%',
				        right: '6%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis:  {
			            type: 'value',
			            name: '人数',
			            min: 0,
			            minInterval: 1,
			            axisLabel: {
			                formatter: '{value}'
			            }
			        },
				    yAxis: {
				        type: 'category',
				        data:department,
			            name: '科室',
						axisLabel: {
				               interval: 0,    //强制文字产生间隔
							    rotate: 30     //文字逆时针旋转45°
				            }
				    },
					dataZoom: [{
				    	type: 'slider',
				        show: true,
				        yAxisIndex: [0],
				        left: '3%',
				        start: 0,
				        end: 50 //初始化滚动条
				    }],
				    series: [
				        {
				            name: 'Caprini中危人数',
				            type: 'bar',
				            stack: '总量',
				            barMaxWidth : 30,
				            data: capriniMiddleRisk
				        },
				        {
				            name: 'Caprini高危人数',
				            type: 'bar',
				            stack: '总量',
				            barMaxWidth : 30,
				            data: capriniHighRisk
				        },
				        {
				            name: 'Padua高危人数',
				            type: 'bar',
				            stack: '总量',
				            barMaxWidth : 30,
				            data: paduaHighRisk
				        }
				    ]
              };
                this.myChart.setOption(option);
            }
        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .line1{
        display: flex;
        justify-content: center;
    }
</style>
