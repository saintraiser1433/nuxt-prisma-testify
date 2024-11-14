<template>
    <UITables :data="transformData" :status="status" :columns="columns">
        <template #header-button>
            <UButton icon="i-heroicons-plus" color="emerald" size="md" @click="handleModal">
                Add Examinee
            </UButton>
        </template>
        <template #action="{ data }">
            <UButton color="emerald" size="sm" @click="handleUpdate(data)"><i-bx-edit /></UButton>
            <UButton color="carnation" size="sm" @click="handleDelete(data.examinee_id)">
                <i-icon-park-solid-people-delete />
            </UButton>
        </template>
    </UITables>
</template>

<script setup lang="ts">
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
    (e: 'update', payload: ExamineeModel): void;
    (e: 'delete', id: number): void;
    (e: 'modalOpen'): void;
}>();


const props = defineProps({
    examineeData: {
        type: Array as PropType<ExamineeModel[]>,
        required: true,
        default: () => [],
    },
    status: String
})

const { examineeData } = toRefs(props)

const transformData = computed(() => {
    return examineeData.value.map((item) => {
        const fullname = item.first_name + ' ' + item.last_name + (item.middle_name ? ' ' + item.middle_name[0] + '.' : '');
        return {
            ...item,
            fullname
        }
    })
})



const handleUpdate = (val: ExamineeModel) => {
    emits('update', val)
}
const handleDelete = (id: number) => {
    emits('delete', id)
}
const handleModal = () => {
    emits('modalOpen')
}

</script>