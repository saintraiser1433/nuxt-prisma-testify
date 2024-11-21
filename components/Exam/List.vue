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
    (e: 'update', payload: ExamModel): void,
    (e: 'delete', id: number): void,
    (e: 'assign', id: number): void,
    (e: 'toggleModal'): void,
}>()
const props = defineProps({
    examData: {
        type: Array as PropType<ExamModel[]>,
        required: true,
        default: () => [],
    },

})

const { examData } = toRefs(props)


const toggleModal = () => {
    emits('toggleModal');
}

const handleDelete = (id: number) => {
    emits('delete', id)
}

const handleUpdate = (item: ExamModel) => {
    emits('update', item)
}
const handleAssign = (id: number) => {
    emits('assign', id)
}
</script>

<template>
    <UITables :data="examData" :columns="columns">
        <template #action-header>
            <UButton icon="i-heroicons-plus" color="emerald" size="md" @click="toggleModal">
                Add Exam's
            </UButton>
        </template>
        <template #increment-data="{ row, index }">
            <span>{{ index + 1 }}</span>
        </template>
        <template #exam_title-data="{ row, index }">
            <span class="uppercase">{{ row.exam_title }}</span>
        </template>
        <template #description-data="{ row, index }">
            <span class="capitalize">{{ row.description }}</span>
        </template>
        <template #actions-data="{ row, index }">
            <div class="flex gap-1">
                <UButton color="primary" class="dark:text-white" variant="solid" size="sm"
                    @click="handleAssign(row.exam_id)">
                    <i-bx-show />
                </UButton>
                <UButton color="emerald" class="dark:text-white" variant="solid" size="sm" @click="handleUpdate(row)">
                    <i-bx-edit />
                </UButton>
                <UButton color="carnation" class="dark:text-white" variant="solid" size="sm"
                    @click="handleDelete(row.exam_id)">
                    <i-icon-park-solid-people-delete />
                </UButton>
            </div>
        </template>
    </UITables>
</template>

<style scoped></style>
