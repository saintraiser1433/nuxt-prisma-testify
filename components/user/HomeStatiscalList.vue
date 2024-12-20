<script setup lang="ts">


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
    type: Object as PropType<GetSummary[]>,
    required: true
  }
})

const { summaryData } = toRefs(props)

type legendColor = 'primary' | 'cyan' | 'emerald' | 'rose';


const defineLegends = (rate: number): legendColor => {
  if (rate >= 0.00 && rate <= 50.99) {
    return 'rose';
  } else if (rate >= 51.00 && rate <= 69.99) {
    return 'primary';
  } else if (rate >= 70.00 && rate <= 89.99) {
    return 'cyan';
  } else if (rate >= 90.00 && rate <= 100) {
    return 'emerald';
  } else {
    return 'rose';
  }
}


</script>
<template>
  <UITables :data="summaryData" :columns="columns" :has-border="true" :has-action-header="false" :td="{
    base: 'border dark:border-gray-700 align-top'
  }">
    <template #success_rate-data="{ row, index }">
      <UProgress :value="row.success_rate" size="lg" :color="defineLegends(row.success_rate)" indicator />
    </template>
    <template #score-data="{ row, index }">
      <span class="text-carnation-500">{{ row.total_correct_answers }} </span>/<span>{{ row.total_questions }}</span>
    </template>
  </UITables>

</template>
