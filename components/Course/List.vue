<template>
    <UITable :data="courseData" :header="header">
        <template #row="{ item, index }">
            <td class="table__block">{{ index + 1 }}</td>
            <td class="table__block max-w-xs truncate overflow-hidden">{{ item.description }}</td>
            <td class="table__block">{{ item.score }}</td>
            <td class="table__block">
                <UIButton type="button" class="bg-success mr-1" size="small" @click="handleUpdate(item)">
                    <i-bx-edit></i-bx-edit>
                </UIButton>
                <UIButton type="button" class="bg-danger" size="small" @click="handleDelete(item.course_id)">
                    <i-icon-park-solid-people-delete></i-icon-park-solid-people-delete>
                </UIButton>
            </td>
        </template>
    </UITable>
</template>

<script setup>
import { ref, toRefs } from 'vue'

const emits = defineEmits({
    update: Object,
    delete: Object
})

const props = defineProps({
    courseData: Object
})
const { courseData } = toRefs(props)
const header = ref(['#', 'Course', 'Score Attained', 'Action'])
const handleUpdate = (val) => {
    emits('update', val)
}
const handleDelete = (val) => {
    emits('delete', val)
}


</script>