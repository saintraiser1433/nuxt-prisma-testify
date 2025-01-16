<script lang="ts" setup>

const columns = [{
  key: "increment",
  label: '#',
  sortable: true
}, {
  key: 'exam_title',
  label: 'Exam Name',
  sortable: true
}, {
  key: 'description',
  label: 'Description',
  sortable: true
}, {
  key: 'time_limit',
  label: 'Time',
  sortable: true
}, {
  key: 'actions',
  label: 'Actions',
  sortable: false

}]


const emits = defineEmits<{
  (e: 'toggleModal'): void,
}>()
const props = defineProps({
  examData: {
    type: Array as PropType<ExamModel[]>,
    required: true,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  }

})

</script>

<template>
  <UITables :is-loading="isLoading" :data="examData" :columns="columns">
    <template #increment-data="{ row, index }">
      <span>{{ index + 1 }}</span>
    </template>
    <template #exam_title-data="{ row, index }">
      <span class="uppercase">{{ row.exam_title }}</span>
    </template>
    <template #description-data="{ row, index }">
      <span class="capitalize">{{ row.description }}</span>
    </template>
  </UITables>
</template>
