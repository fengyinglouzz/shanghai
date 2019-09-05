<template>
    <div class="line5">
        <div id="line5" class="" style="width: 96%;height:450px;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    import 'echarts/lib/chart/pie';
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
            this.myChart = echarts.init(document.getElementById('line5'));
        },
        methods: {
            initData(department,bleeding,oneDayBleedingRate,recentlyBleedingRate){
                const option = {
				    tooltip: {
				        trigger: 'axis',
				    },
			        legend: {
			            data:['出血风险评估高危率', '出血风险评估及时率']
			        },
				    xAxis: [
				        {
				            type: 'category',
				            name: '科室',
							axisLabel: {
								interval: 0,    //强制文字产生间隔
							    rotate: 30,     //文字逆时针旋转45°
						    },
				            data: department
				        }
				    ],
				    dataZoom: [{
				    	type: 'slider',
				        show: true,
				        xAxisIndex: [0],
				        left: '9%',
				        start: 0,
				        end: 50 //初始化滚动条
				    }],
				    yAxis: [
				        {
				            type: 'value',
				            name: '百分比',
				            min: 0,
				            max: 100,
				            interval: 20,
				            axisLabel: {
				                formatter: '{value} %'
				            }
				        }
				    ],
			        grid: {top: '50%'},
			        series: [
			            {
				            type:'line',
				            name:'出血风险评估高危率',
				            smooth: true,
				            data:recentlyBleedingRate
				        },
			            {
				            type:'line',
				            name:'出血风险评估及时率',
				            smooth: true,
				            data:oneDayBleedingRate
				        },
			            {
			                type: 'pie',
			                radius : '30%',
			                center: ['50%', '25%'],
			                label: {
			                    normal: {
			                        formatter: '{b}：{c}',
			                    }
			                },
			                data:bleeding,
			                itemStyle: {
			                    emphasis: {
			                        shadowBlur: 10,
			                        shadowOffsetX: 0,
			                        shadowColor: 'rgba(0, 0, 0, 0.5)'
			                    }
			                }
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
