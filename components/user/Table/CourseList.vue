<script setup lang="ts">
const columns = [{
  key: "increment",
  label: '#',
}, {
  key: 'description',
  label: 'Course',
}]


const props = defineProps({
  courseData: {
    type: Object as PropType<CourseModel[]>,
    required: true
  }
})

const { courseData } = toRefs(props)



</script>
<template>
  <UITables :data="courseData" :columns="columns" :has-action-header="false">
    <template #increment-data="{ row, index }">
      <span class="font-bold">{{ index + 1 }}</span>
    </template>
    <template #description-data="{ row, index }">
      <span class="uppercase">{{ row.description }}</span>
    </template>

  </UITables>

</template>
