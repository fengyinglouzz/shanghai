<template>
    <div class="line4">
        <div id="line4" class="" style="width: 96%;height:450px;"></div>
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
            this.myChart = echarts.init(document.getElementById('line4'));
        },
        methods: {
            initData(department,middleHighRiskRate,oneDayVteRiskAssessmentRate,vteRiskAssessmentPatient){
                const option = {
				    tooltip: {
				        trigger: 'axis',
				    },
			        legend: {
			            data:['VTE风险评估中高危率', 'VTE风险评估及时率']
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
				            name:'VTE风险评估中高危率',
				            smooth: true,
				            data:middleHighRiskRate
				        },
			            {
				            type:'line',
				            name:'VTE风险评估及时率',
				            smooth: true,
				            data:oneDayVteRiskAssessmentRate
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
			                data:vteRiskAssessmentPatient,
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
