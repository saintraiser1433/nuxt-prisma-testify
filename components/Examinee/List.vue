<template>
    <UITable :data="examineeData" :header="header">
        <template #row="{ item, index }">
            <td class="table__block">{{ index + 1 }}</td>
            <td class="table__block">{{ item.fullname }}</td>
            <td class="table__block">{{ item.username }}</td>
            <td class="table__block">
                <UIButton type="button" class="bg-success mr-1" size="small" @click="handleUpdate(item)">
                    <i-bx-edit></i-bx-edit>
                </UIButton>
                <UIButton type="button" class="bg-danger" size="small" @click="handleDelete(item.examinee_id)">
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
    examineeData: Object
})

const { examineeData } = toRefs(props)

const header = ref(['#', 'Fullname', 'Username', 'Action'])


const handleUpdate = (val) => {
    emits('update', val)
}
const handleDelete = (val) => {
    emits('delete', val)
}
</script>