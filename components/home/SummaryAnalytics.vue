<script lang="ts" setup>
const { generateOption } = useWidgetOption();

const primaryOption = generateOption('#7367f0');
const successOption = generateOption('#4eda8c');
const warningOption = generateOption('#ff9f43');
const dangerOption = generateOption('#ff6468'); 
</script>


<template>
    <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12 lg:col-span-3 ">
            <UICard :has-header="false">
                <div class="flex justify-between items-center p-5 font-semibold">
                    <div class="flex flex-col">
                        <h6>Registered Examinee's</h6>
                        <h1 class="text-primary-500">2</h1>
                    </div>
                    <div class="rounded-full bg-primary-500 relative p-2">
                        <svg-icon name="dashboard-icons/examinee" title="registered-examinee" width="32" height="32" />
                    </div>
                </div>
                <div class="w-full h-[80px]">
                    <VChart ref="chart" :option="primaryOption" class="w-full h-full" :auto-resize="true" />
                </div>
            </UICard>
        </div>
        <div class="col-span-12 lg:col-span-3">
            <UICard :has-header="false">
                <div class="flex justify-between items-center p-5 font-semibold">
                    <div class="flex flex-col">
                        <h6>Completed Examinee's</h6>
                        <h1 class="text-emerald-500">2</h1>
                    </div>
                    <div class="rounded-full bg-emerald-500 relative p-2">
                        <svg-icon name="dashboard-icons/group" title="registered-examinee" width="32" height="32" />
                    </div>
                </div>
                <div class="w-full h-[80px]">
                    <VChart ref="chart" :option="successOption" class="w-full h-full" :auto-resize="true" />
                </div>
            </UICard>
        </div>
        <div class="col-span-12 lg:col-span-3">
            <UICard :has-header="false">
                <div class="flex justify-between items-center p-5 font-semibold">
                    <div class="flex flex-col">
                        <h6>Total Course's</h6>
                        <h1 class="text-carnation-400">2</h1>
                    </div>
                    <div class="rounded-full bg-carnation-400 relative p-2">
                        <svg-icon name="dashboard-icons/course" title="registered-examinee" width="32" height="32" />
                    </div>
                </div>
                <div class="w-full h-[80px]">
                    <VChart ref="chart" :option="warningOption" class="w-full h-full" :auto-resize="true" />
                </div>
            </UICard>
        </div>
        <div class="col-span-12 lg:col-span-3">
            <UICard :has-header="false">
                <div class="flex justify-between items-center p-5 font-semibold">
                    <div class="flex flex-col">
                        <h6>Total Exam's</h6>
                        <h1 class="text-neon-carrot-400">2</h1>
                    </div>
                    <div class="rounded-full bg-neon-carrot-400 relative p-2">
                        <svg-icon name="dashboard-icons/book" title="registered-examinee" width="32" height="32" />
                    </div>
                </div>
                <div class="w-full h-[80px]">
                    <VChart ref="chart" :option="dangerOption" class="w-full h-full" :auto-resize="true" />
                </div>
            </UICard>
        </div>
    </div>
</template>
