<template>
    <UITable :data="examData" :header="header">
        <template #row="{ item, index }">
            <td class="table__block">{{ index + 1 }}</td>
            <td class="table__block">{{ item.exam_title }}</td>
            <td class="table__block max-w-xs truncate overflow-hidden whitespace-nowrap">
                {{ item.description }}
            </td>
            <td class="table__block">{{ item.time_limit }}</td>
            <td class="table__block">{{ item.question_limit }}</td>
            <td class="table__block">
                <UIButton type="button" class="bg-info mr-1" size="small" @click="setSelect(item.exam_id)">
                    <i-lets-icons-question-duotone></i-lets-icons-question-duotone>
                </UIButton>
                <UIButton type="button" class="bg-success mr-1" size="small" @click="handleUpdate(item)">
                    <i-bx-edit></i-bx-edit>
                </UIButton>
                <UIButton type="button" class="bg-danger" size="small" @click="handleDelete(item.exam_id)">
                    <i-icon-park-solid-people-delete></i-icon-park-solid-people-delete>
                </UIButton>
            </td>
        </template>
    </UITable>
</template>

<script setup>

const emits = defineEmits({
    update: Object,
    delete: Object
})
const props = defineProps({
    examData: Object
})
const { examData } = toRefs(props)
const header = ref(['#', 'Exam Title', 'Description', 'Time Limit', 'Question Limit', 'Action'])

const setSelect = async (id) => {
    await navigateTo(`Exam/${id}`);
}

const handleUpdate = (val) => {
    emits('update', val)
}
const handleDelete = (val) => {
    emits('delete', val)
}


</script>