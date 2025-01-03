<template>
  <div class="grid grid-cols-12 gap-2">
    <div class="col-span-12 lg:col-span-9 ">
      <UITables :data="data" :columns="columns" :has-border="true" :has-action-header="true" :has-column-filter="true"
        :td="{
          base: 'border dark:border-gray-700 align-top'
        }">
        <template #exam_title-data="{ row, index }">
          <span class="uppercase font-bold">{{ row.exam_title }}</span>
        </template>
        <template #success_rate-data="{ row, index }">

          <UProgress :value="row.success_rate" size="xl" :color="row.color" indicator class="relative">
            <template #indicator="{ percent }">
              <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold "
                :class="percent < 50 ? 'text-secondaryColor-950' : 'text-white'">
                {{ percent }}%
              </div>
            </template>
          </UProgress>
        </template>
        <template #score-data="{ row, index }">
          <span class="text-carnation-500">{{ row.correctAnswer }} </span>/<span>{{ row.totalQuestion
            }}</span>
        </template>
      </UITables>
    </div>
    <div class="flex items-center flex-col col-span-12 lg:col-span-3 gap-2 py-3 ">
      <h1>YOUR RATINGS</h1>
      <CircleProgressBar stroke-width="16" size="200" color-filled="#062d19" :color-unfilled="hexColor"
        animation-duration="1s" :value="percentage" :max="100" percentage rounded>
        <span class="font-bold"> {{ label }}</span>
      </CircleProgressBar>
    </div>
  </div>
</template>

<script lang="ts" setup>

const columns = [{
  key: "exam_title",
  label: 'Exam Title',
  sortable: false
}, {
  key: 'success_rate',
  label: 'Percentage',

  sortable: false
}, {
  key: 'score',
  label: 'Score',
  sortable: false
}]


const props = defineProps({
  summaryData: {
    type: Object as PropType<Summary[]>,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  hexColor: {
    type: String,
    required: false
  },
  label: {
    type: String,
    required: true
  }
})

const { summaryData } = toRefs(props)
const { getProgressBarColor } = useProgressBarColor();


const data = computed(() => {
  return summaryData.value.map((item) => ({
    exam_id: item.exam_id,
    exam_title: item.exam_title,
    success_rate: item.success_rate,
    correctAnswer: item.total_correct_answer,
    totalQuestion: item.total_questions,
    color: getProgressBarColor(item.success_rate)
  }))
});








</script>
