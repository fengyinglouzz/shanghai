<template>
    <div class="line3">
        <div id="line3" class="" style="width: 96%;height:450px;"></div>
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
            this.myChart = echarts.init(document.getElementById('line3'));
        },
        methods: {
            initData(department,mechanicalPreventiveRate,medicinePreventiveRate){
                const option = {
				    tooltip : {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'cross',
				            label: {
				                backgroundColor: '#6a7985'
				            }
				        }
				    },
				    legend: {
				        data:['药物预防率','机械预防率']
				    },
				    grid: {
				        left: '3%',
				        right: '6%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis : [
				        {
				            type : 'category',
				            name: '科室',
							axisLabel: {
								interval: 0,    //强制文字产生间隔
							    rotate: 30,     //文字逆时针旋转45°
						    },
				            data : department
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
				    yAxis : [
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
				    series : [
				        {
				            name:'药物预防率',
				            type:'line',
				            smooth:true,
				            itemStyle: {normal: {areaStyle: {type: 'default'}}},
				            data:medicinePreventiveRate
				        },
				        {
				            name:'机械预防率',
				            type:'line',
				            smooth:true,
				            itemStyle: {normal: {areaStyle: {type: 'default'}}},
				            data:mechanicalPreventiveRate
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
