import * as echarts from 'echarts';
export const useWidgetOption = () => {
    const generateOption = (baseColor: string) => {
        const primaryColor = baseColor;
        const primaryLight = generateLighterColor(primaryColor, 0.5);
        const primaryLighter = generateLighterColor(primaryColor, 0.2);

        return ref<ECOption>({
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
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
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
        });
    };

    return {
        generateOption
    };
};