import { exchange } from './N.js'

function getOption(pointLengthAss, pointLengthPri) {
    return {
        legend: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        },
        tooltip: {
            showContent: false,
            trigger: 'axis',
            axisPointer: {
                type: 'line',
                snap: true,
                label: {
                    backgroundColor: '#6a7985',
                    show: false,
                },
                lineStyle: {
                    opacity: 0
                }
            },
        },
        color: ['#243336', '#392332'],
        toolbox: {
            feature: {
                saveAsImage: {
                    show: false
                },
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: "#272c39"
                }
            },
            axisLabel: {
                interval: 80, //隔几个显示标签
                color: '#95a1bd'
            },
        }],
        yAxis: [
        {
            splitLine: {
                show: false
            },
            axisLabel: {
                interval: 5,
                formatter: function (val, index) {
                    if (val > 1000000) {
                        val = (val / 1000000).toFixed(2) + 'M'
                    } else if (val > 1000) {
                        val = (val / 1000).toFixed(2) + 'K'
                    }
                    return val
                },
                color: '#95a1bd'
            },
            axisLine: {
                lineStyle: {
                    color: "#272c39"
                }
            },
            position: 'right',
            type: 'value'
        }],

        series: [
        {
            type: 'line',
            areaStyle: { normal: {} },
            symbolSize: 12,
            label: {
                show: true,
                position: [20, -80],
                formatter: function (params) {
                    return `\n 委托价       ${exchange(params.data[0], pointLengthPri)}           \n\n 累计           ${exchange(params.data[1], pointLengthAss)}          \n `
                },
                backgroundColor: '#171a2a',
                color: '#FFF',
                align: 'left',
                fontSize: 12,
                padding: 10,
                lineHeight: 50,
                borderRadius: 5
            },

            // symbol:'none',
            symbol: 'emptyCircle',
            hoverAnimation: false,
            showSymbol: false,
            data: [
                [3, 50],
                [4, 49],
                [6, 42],
                [12, 40],
                [15, 38],
                [18, 38],
                [20, 38],
                [22, 29],
                [27, 28],
                [35, 25],
                [39, 19],
                [40, 13],
                [52, 3],
                [67, 0],
            ]
        }, {
            type: 'line',
            areaStyle: { normal: {} },
            // symbol:'none',
            symbolSize: 12,
            label: {
                show: true,
                position: [-180, -80],
                formatter: function (params) {
                    return `\n 委托价       ${exchange(params.data[0], pointLengthPri)}           \n\n 累计           ${exchange(params.data[1], pointLengthAss)}          \n `
                },
                backgroundColor: '#171a2a',
                color: '#FFF',
                align: 'left',
                fontSize: 12,
                padding: 10,
                lineHeight: 50,
                borderRadius: 5
            },

            symbol: 'emptyCircle',
            hoverAnimation: false,
            showSymbol: false,
            data: [
                [67, 0],
                [69, 9],
                [80, 16],
                [92, 17],
                [102, 18],
                [104, 25],
                [106, 29],
                [110, 33],
                [126, 38],
                [137, 45],
                [140, 59],
                [144, 60],
                [148, 61],
            ]
        }]
    };
}





export default getOption