<script lang="ts" setup>
const columns = [{
    key: 'id',
    label: '#',
    sortable: true
}, {
    key: 'fullname',
    label: 'Fullname',
    sortable: true
}, {
    key: 'username',
    label: 'Username',
    sortable: true
}, {
    key: 'actions',
    label: 'Actions',
    sortable: false

}]


const emits = defineEmits<{
    (e: 'update', payload: ExamineeModel): void,
    (e: 'delete', id: number): void,
    (e: 'toggleModal'): void,
}>()
const props = defineProps({
    examineeData: {
        type: Array as PropType<ExamineeModel[]>,
        required: true,
        default: () => [],
    },

})

const { examineeData } = toRefs(props)


const toggleModal = () => {
    emits('toggleModal');
}

const handleDelete = (id: number) => {
    emits('delete', id)
}

const handleUpdate = (item: ExamModel) => {
    emits('update', item)
}

</script>

<template>
    <UITables :data="examineeData" :columns="columns">
        <template #action-header>
            <UButton icon="i-heroicons-plus" color="emerald" size="md" @click="toggleModal">
                Add Examinee's
            </UButton>
        </template>
        <template #id-data="{ row, index }">
            <span>{{ index + 1 }}</span>
        </template>
        <template #actions-data="{ row, index }">
            <div class="flex gap-1">
                <UButton color="emerald" class="dark:text-white" variant="solid" size="sm" @click="handleUpdate(row)">
                    <i-bx-edit />
                </UButton>
                <UButton color="carnation" class="dark:text-white" variant="solid" size="sm"
                    @click="handleDelete(row.examinee_id)">
                    <i-icon-park-solid-people-delete />
                </UButton>
            </div>
        </template>
    </UITables>
</template>

<style scoped></style>
