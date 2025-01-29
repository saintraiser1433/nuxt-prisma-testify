
export const useDashboard = () => {
    const { $echarts } = useNuxtApp();

    
    //for summary
    const generateOption = (baseColor: string) => {
        const primaryColor = baseColor;
        const primaryLight = generateLighterColor(primaryColor, 0.5);
        const primaryLighter = generateLighterColor(primaryColor, 0.2);

        const option: ECOption = {
            animation: true,
            animationEasing: 'elasticIn',
            grid: {
                left: 'auto',
                top: 'auto',
                right: 'auto',
                bottom: 'auto',
                width: 'auto',
                height: 'auto',
                // containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    show: false // Hide x-axis labels
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    show: false // Hide y-axis labels
                }
            ],
            series: [
                {
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        width: 2,
                        cap: 'round'
                    },
                    itemStyle: {
                        color: primaryColor // Custom color for the series
                    },
                    label: {
                        show: false,
                        position: 'top'
                    },
                    areaStyle: {
                        color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: primaryLight },
                            { offset: 1, color: primaryLighter }
                        ]),
                        shadowBlur: 10,
                        shadowColor: primaryColor,
                        shadowOffsetX: 0,
                        shadowOffsetY: 3
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [240, 160, 671, 414, 555, 257, 901, 613, 727, 414, 555, 257]
                }
            ],
            media: [
                {

                    option: {
                        grid: {
                            left: 'auto',
                            top: 'auto',
                            right: 'auto',
                            bottom: 'auto',
                            width: 'auto',
                            height: 'auto',
                            // containLabel: true
                        }
                    }
                }
            ]
        }
        return {
            option
        };
    };

    //end



    const optionForAreaChart = () => {
        const options: ECOption = {
            color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
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
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [

                {
                    name: 'Line 1',
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    lineStyle: {
                        width: 0
                    },
                    showSymbol: false,
                    areaStyle: {
                        opacity: 0.8,
                        color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgb(0, 221, 255)'
                            },
                            {
                                offset: 1,
                                color: 'rgb(77, 119, 255)'
                            }
                        ])
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [120, 282, 111, 234, 220, 340, 310]
                },
            ]
        };
        return {
            options
        }
    }

    const optionForPieChart = () => {
        const options: ECOption = {
            legend: {
                left: 'center',
                top: 'bottom',
                data: [
                    'rose1',
                    'rose2',
                    'rose3',
                    'rose4',
                    'rose5',
                    'rose6',
                    'rose7',
                    'rose8'
                ]
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            series: [

                {
                    name: 'Area Mode',
                    type: 'pie',
                    radius: [20, 140],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 5
                    },
                    data: [
                        { value: 30, name: 'rose 1' },
                        { value: 28, name: 'rose 2' },
                        { value: 26, name: 'rose 3' },
                        { value: 24, name: 'rose 4' },
                        { value: 22, name: 'rose 5' },
                        { value: 20, name: 'rose 6' },
                        { value: 18, name: 'rose 7' },
                        { value: 16, name: 'rose 8' }
                    ]
                }
            ]
        }

        return {
            options
        }
    }

    return {
        generateOption,
        optionForAreaChart,
        optionForPieChart
    };
};