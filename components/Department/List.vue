<template>
    <UITables :data="departmentData" :columns="columns">
        <template #header-button>
            <UButton icon="i-heroicons-plus" color="emerald" size="md" @click="handleModal">
                Add Department
            </UButton>
        </template>
        <template #action="{ data }">
            <UButton color="emerald" size="sm" @click="handleUpdate(data)"><i-bx-edit /></UButton>
            <UButton color="carnation" size="sm" @click="handleDelete(data.department_id)">
                <i-icon-park-solid-people-delete />
            </UButton>
        </template>
    </UITables>
</template>

<script setup lang="ts">
const columns = [{
    label: '#',
    sortable: true
}, {
    key: 'department_name',
    label: 'Department Name',
    sortable: true
}, {
    key: 'status',
    label: 'Status',
    sortable: true
}, {
    key: 'actions',
    label: 'Actions',
    sortable: false

}]


const emits = defineEmits<{
    (e: 'update', payload: DepartmentModel): void;
    (e: 'delete', id: number): void;
    (e: 'modalOpen'): void;
}>();


const props = defineProps({
    departmentData: {
        type: Array as PropType<DepartmentModel[]>,
        required: true,
        default: () => [],
    },
})

const { departmentData } = toRefs(props)


const handleUpdate = (val: DepartmentModel) => {
    emits('update', val)
}
const handleDelete = (id: number) => {
    emits('delete', id)
}
const handleModal = () => {
    emits('modalOpen')
}

</script>