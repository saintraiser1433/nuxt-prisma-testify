<script lang="ts" setup>

const { $echarts } = useNuxtApp();
const { optionForNightingale, optionForAreaChart, optionForPieChart,optionForBarChart } = useDashboard();
const props = defineProps({
  successRateCourse: {
    type: Array as PropType<ChartModel[]>,
    required: true,
  },

  successRateExam: {
    type: Array as PropType<ChartModel[]>,
    required: true,
  },



})

const { successRateCourse, successRateExam } = toRefs(props);

const successRatePerCourses = optionForNightingale(successRateCourse.value)
const testx = optionForBarChart(successRateExam.value)

</script>

<style></style>


<template>
  <div class="grid grid-cols-12 my-5 gap-3">
    <div class="col-span-12 lg:col-span-8">
      <UICard :defaults="{ base: 'border-b-2 border-emerald-400 overflow-hidden' }" :has-action-header="false">
        <template #header>
          <div class="flex justify-between items-center p-0">
            <div class="flex flex-col">
              <h1 class="text-2xl lg:text-lg font-semibold">DAILY REGISTERED EXAMINEES' VS COMPLETED EXAMINEES'</h1>
            </div>

            <svg-icon name="dashboard-icons/exam" title="examineeicon" width="32" height="32"></svg-icon>
          </div>

        </template>
        <div class="w-full h-[400px]">
          <!-- <VChart ref="chart" :option="testx.options" class="w-full h-full" :auto-resize="true" /> -->
        </div>

      </UICard>
    </div>
    <div class="col-span-12 lg:col-span-4">
      <UICard :defaults="{ base: 'border-b-2 border-emerald-400 overflow-hidden' }">
        <template #header>
          <div class="flex justify-between items-center p-0">
            <div class="flex flex-col">
              <h1 class="text-2xl lg:text-lg font-semibold">PASSING EXAMINEE BY COURSE</h1>
            </div>
            <svg-icon name="dashboard-icons/percentage" title="examineeicon" width="32" height="32"></svg-icon>
          </div>

        </template>
        <div class="w-full h-[400px] relative">
          <VChart ref="chart" :option="successRatePerCourses" class="w-full h-full" :auto-resize="true" />
        </div>
      </UICard>
    </div>
  </div>
  <div class="grid grid-cols-12 my-5 gap-3">
    <div class="col-span-12">
      <UICard :defaults="{ base: 'border-b-2 border-emerald-400 overflow-hidden' }">
        <template #header>
          <div class="flex justify-between items-center p-0">
            <div class="flex flex-col">
              <h1 class="text-2xl lg:text-lg font-semibold">PERCENTAGE PASSED BY EXAM</h1>
            </div>
            <svg-icon name="dashboard-icons/check" title="examineeicon" width="32" height="32"></svg-icon>
          </div>


        </template>
        <div class="w-full h-[400px] relative">
          <VChart ref="chart" :option="testx.options" class="w-full h-full" :auto-resize="true" />
        </div>

      </UICard>
    </div>
  
  </div>

  <!-- <div class="grid grid-cols-12 my-5 gap-3">
    <div class="col-span-12">
      <UICard :defaults="{ base: 'border-b-2 border-emerald-400 overflow-hidden' }">
        <template #header>
          <div class="flex justify-between items-center p-0">
            <div class="flex flex-col">
              <h1 class="text-2xl lg:text-lg font-semibold">ENROLLED EXAMINEES' PER COURSES</h1>
            </div>
            <svg-icon name="dashboard-icons/student" title="examineeicon" width="32" height="32"></svg-icon>
          </div>

        </template>
        <div class="w-full h-[400px]">
          <VChart ref="chart" :option="options" class="w-full h-full" :auto-resize="true" />
        </div>
      </UICard>
    </div>

  </div> -->
</template>
