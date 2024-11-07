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

<script setup lang="ts">
const emits = defineEmits<{
    (e: 'update', payload: ExamineeModel): void;
    (e: 'delete', id: number): void;
}>();


const props = defineProps({
    examineeData: {
        type: Array as PropType<ExamineeModel[]>,
        required: true,
        default: () => [],
    }
})

const { examineeData } = toRefs(props)

const header = ref<string[]>(['#', 'Fullname', 'Username', 'Action'])


const handleUpdate = (val: ExamineeModel) => {
    emits('update', val)
}
const handleDelete = (id: number) => {
    emits('delete', id)
}
</script>