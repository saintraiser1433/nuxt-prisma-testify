<script setup lang="ts">
const columns = [{
  key: "exam_title",
  label: 'Exam Title',
  sortable: false
}, {
  key: 'exam_title',
  label: 'Percentage',
  sortable: false
}, {
  key: 'score',
  label: 'Score',
  sortable: false

}]


const props = defineProps({
  examData: {
    type: Object as PropType<ExamModel[]>,
    required: true
  }
})

const { examData } = toRefs(props)



</script>
<template>
  <UITables :data="examData" :columns="columns" :has-action-header="false">


  </UITables>

</template>
