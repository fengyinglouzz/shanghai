<template>
    <div class="line6">
        <div id="line6" class="" style="width: 96%;height:450px;"></div>
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
    var myChart;
    export default {
		 data(){
            return {
				nwData:[],
				data:[],
				nData:[],
				wData:[]
            }
        },
        mounted(){
			myChart = echarts.init(document.getElementById('line6'));
        },
        methods: {
            initData(nwData,data,nData,wData){
                const option = {
				    tooltip: {
				        trigger: 'item',
				        formatter: "{b}: {c} ({d}%)"
				    },
				    series: [
				        {
				            name:'访问来源',
				            type:'pie',
				            selectedMode: 'single',
				            radius: [0, '30%'],
				            label: {
				                normal: {
				                    position: 'inner'
				                }
				            },
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },
							data:nwData
				        },
				        {
				            name:'访问来源',
				            type:'pie',
				            radius: ['40%', '55%'],
				            label: {
				                normal: {
				                    formatter: '{b|{b}：}{c}',
				                    rich: {
				                        b: {
				                            fontSize: 16,
				                            lineHeight: 33
				                        }
				                    }
				                }
				            },
				            data:data
				        }
				    ]
				};
				const option1 = {
				    tooltip: {
				        trigger: 'item',
				        formatter: "{b}: {c} ({d}%)"
				    },
				    series: [
				        {
				            name:'访问来源',
				            type:'pie',
				            selectedMode: 'single',
				            radius: [0, '30%'],
				            label: {
				                normal: {
				                    position: 'inner'
				                }
				            },
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },
							data:nwData
				        },
				        {
				            name:'访问来源',
				            type:'pie',
				            radius: ['40%', '55%'],
				            label: {
				                normal: {
				                    formatter: '{b|{b}：}{c}',
				                    rich: {
				                        b: {
				                            fontSize: 16,
				                            lineHeight: 33
				                        }
				                    }
				                }
				            },
				            data:nData
				        }
				    ]
				};
				const option2 = {
				    tooltip: {
				        trigger: 'item',
				        formatter: "{b}: {c} ({d}%)"
				    },
				    series: [
				        {
				            name:'访问来源',
				            type:'pie',
				            selectedMode: 'single',
				            radius: [0, '30%'],
				            label: {
				                normal: {
				                    position: 'inner'
				                }
				            },
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },
							data:nwData
				        },
				        {
				            name:'访问来源',
				            type:'pie',
				            radius: ['40%', '55%'],
				            label: {
				                normal: {
				                    formatter: '{b|{b}：}{c}',
				                    rich: {
				                        b: {
				                            fontSize: 16,
				                            lineHeight: 33
				                        }
				                    }
				                }
				            },
				            data:wData
				        }
				    ]
				};
				myChart.setOption(option);
				myChart.on('click', function (params) {
					var value = params.name;
					if(value =="内科"){
						myChart.setOption(option1);
					}else if (value =="外科"){
						myChart.setOption(option2);
					}else{
						myChart.setOption(option);
					}
				});
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
