<script lang="ts" setup>
const columns = [{
    key: "increment",
    label: '#',
    sortable: true
}, {
    key: 'description',
    label: 'Course',
    sortable: true
}, {
    key: 'score',
    label: 'Score Attained',
    sortable: true
}, {
    key: 'actions',
    label: 'Actions',
    sortable: false

}]


const emits = defineEmits<{
    (e: 'update', payload: CourseModel): void,
    (e: 'delete', id: number): void,
    (e: 'toggleModal'): void,
}>()
const props = defineProps({
    courseData: {
        type: Array as PropType<CourseModel[]>,
        required: true,
        default: () => [],
    },

})

const { courseData } = toRefs(props)


const toggleModal = () => {
    emits('toggleModal');
}

const handleDelete = (id: number) => {
    emits('delete', id)
}

const handleUpdate = (item: CourseModel) => {
    emits('update', item)
}
</script>

<template>
    <UITables :data="courseData" :columns="columns">
        <template #action-header>
            <UButton icon="i-heroicons-plus" color="emerald" size="md" @click="toggleModal">
                Add course's
            </UButton>
        </template>
        <template #increment-data="{ row, index }">
            <span>{{ index + 1 }}</span>
        </template>
        <template #description-data="{ row, index }">
            <span class="capitalize">{{ row.description }}</span>
        </template>
        <template #actions-data="{ row, index }">
            <div class="flex gap-1">
                <UButton color="emerald" class="dark:text-white" variant="solid" size="sm" @click="handleUpdate(row)">
                    <i-bx-edit />
                </UButton>
                <UButton color="carnation" class="dark:text-white" variant="solid" size="sm"
                    @click="handleDelete(row.course_id)">
                    <i-icon-park-solid-people-delete />
                </UButton>
            </div>
        </template>
    </UITables>
</template>

<style scoped></style>
