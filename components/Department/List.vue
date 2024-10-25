<template>
    <UITable :data="departmentData" :header="header">
        <template #row="{ item, index }">
            <td class="table__block">{{ index + 1 }}</td>
            <td class="table__block">{{ item.department_name }}</td>
            <td class="table__block">
                <UIBadge :variant="item.status ? 'success' : 'danger'">
                    {{ item.status ? 'Active' : 'Inactive' }}
                </UIBadge>
            </td>
            <td class="table__block">
                <UIButton type="button" variant="success" size="small" class="mr-1" @click="handleUpdate(item)">
                    <i-bx-edit></i-bx-edit>
                </UIButton>
                <UIButton type="button" variant="danger" size="small" @click="handleDelete(item.department_id)">
                    <i-icon-park-solid-people-delete></i-icon-park-solid-people-delete>
                </UIButton>
            </td>
        </template>
    </UITable>
</template>

<script setup>
import { computed, ref, toRefs } from 'vue'

const props = defineProps({
    departmentData: {
        type: Object,
        required: true
    }
})
const emits = defineEmits({
    update: Object,
    delete: Object
})
const header = ref(['#', 'Department', 'Status', 'Action'])
const { departmentData } = toRefs(props)


const handleUpdate = (val) => {
    emits('update', val)
}
const handleDelete = (val) => {
    emits('delete', val)
}
</script>