<template>
    <HomeSummaryAnalytics></HomeSummaryAnalytics>
    <div class="grid grid-cols-12 my-5 gap-3">
        <div class="col-span-12 lg:col-span-8">
            <UICard>
                <template #header>
                    <h1 class="text-2xl lg:text-lg font-semibold">Recent Activities</h1>
                </template>
                <div class="w-full h-[400px]">
                    <VChart ref="chart" :option="options" class="w-full h-full" :auto-resize="true" />
                </div>

            </UICard>
        </div>
        <div class="col-span-12 lg:col-span-4">
            <UICard>
                <template #header>
                    <h1 class="text-2xl lg:text-lg font-semibold">Recent Activities</h1>
                </template>
                <div class="w-full h-[400px]">
                    <VChart ref="chart" :option="optionsa" class="w-full h-full" :auto-resize="true" />
                </div>
            </UICard>
        </div>
    </div>
    <div class="grid grid-cols-12 my-5 gap-3">
        <div class="col-span-12 lg:col-span-8">
            <UICard>
                <template #header>
                    <h1 class="text-2xl lg:text-lg font-semibold">Recent Activities</h1>
                </template>
                <div class="w-full h-[400px]">
                    <VChart ref="chart" :option="options" class="w-full h-full" :auto-resize="true" />
                </div>

            </UICard>
        </div>
        <div class="col-span-12 lg:col-span-4">
            <UICard>
                <template #header>
                    <h1 class="text-2xl lg:text-lg font-semibold">Recent Activities</h1>
                </template>
                <div class="w-full h-[400px]">
                    <VChart ref="chart" :option="optionsa" class="w-full h-full" :auto-resize="true" />
                </div>
            </UICard>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
definePageMeta({
    requiredRole: 'admin',
});

useSeoMeta({
    title: 'Testify Home Page',
    description: 'Testify Analytics',
    ogTitle: 'Testify Home Page',
    ogDescription: 'Testify Analytics'
});


const options = ref<ECOption>({
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
            name: 'Line 2',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
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
});

const optionsa = ref<ECOption>({
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
});




</script>

<style scoped>
/* Ensure the parent container is responsive */
</style>