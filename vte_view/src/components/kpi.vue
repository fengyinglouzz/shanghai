<template>
    <div class="line1">
        <div id="line1" class="" style="width: 96%;height:450px;"></div>
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
            this.myChart = echarts.init(document.getElementById('line1'));
        },
        methods: {
            initData(department,numberPatient,onsetOfNumberPatient,vteRiskAssessmentPatient,bleedingRiskAssessmentPatient){
                const option = {
                	tooltip : {
						trigger: 'axis',
				        axisPointer: {
				            type: 'cross',
				            crossStyle: {
				                color: '#999'
				            }
				        }
				    },
				    legend: {
				        data:['患者人数','发病率','VTE风险评估率','出血风险评估率']
				    },
				    xAxis: [
				        {
				            type: 'category',
				            data: department,
				            name: '       科室',
				            axisPointer: {
				                type: 'shadow'
				            },
							axisLabel: {
								interval: 0,    //强制文字产生间隔
							    rotate: 45,     //文字逆时针旋转45°
						    }
				        }
				    ],
				    dataZoom: [{
				    	type: 'slider',
				        show: true,
				        xAxisIndex: [0],
				        left: '9%',
				        start: 0,
				        end: 70 //初始化滚动条
				    }],
				    yAxis: [
				        {
				            type: 'value',
				            name: '人数',
				            min: 0,
				            minInterval: 1,
				            axisLabel: {
				                formatter: '{value}'
				            }
				        },
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
				    series: [
				        {
				            name:'患者人数',
				            type:'bar',
				            itemStyle: {
                    			normal: {
                    				color: '#37a2da'
                    			}
                    		},
				            barMaxWidth : 30,
				            data:numberPatient
				        },
				        {
				            name:'发病率',
				            type:'line',
				            smooth: true,
				            yAxisIndex: 1,
				            itemStyle: {
                    			normal: {
                    				color: '#2f4554'
                    			}
                    		},
				            data:onsetOfNumberPatient
				        },
				        {
				            name:'VTE风险评估率',
				            type:'line',
				            smooth: true,
				            yAxisIndex: 1,
				            itemStyle: {
                    			normal: {
                    				color: '#ffdb5c'
                    			}
                    		},
				            data:vteRiskAssessmentPatient
				        },
				        {
				            name:'出血风险评估率',
				            type:'line',
				            smooth: true,
				            yAxisIndex: 1,
				            itemStyle: {
                    			normal: {
                    				color: '#ff4300'
                    			}
                    		},
				            data:bleedingRiskAssessmentPatient
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
