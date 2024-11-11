<template>
  <UITable :data="examData" :header="header">
      <template #row="{ item, index }">
          <td class="table__block">{{ item.exam_title }}</td>
          <td class="table__block">{{ item.exam_title }}</td>
          <td class="table__block">10</td>
      </template>
  </UITable>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  (e: 'update', payload: ExamModel): void
  (e: 'delete', id: number): void
}>();

const props = defineProps({
  examData: {
      type: Object as PropType<ExamModel[]>,
      required: true
  }
})

const { examData } = toRefs(props)
const header = ref<string[]>(['Exam Title', 'Percentage',  'Score'])



const handleUpdate = (val: ExamModel) => {
  emits('update', val)
}
const handleDelete = (id:number) => {
  emits('delete', id)
}


</script>