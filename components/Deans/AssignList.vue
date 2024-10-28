<template>
    <UITable :data="assignData" :header="header">
        <template #row="{ item, index }">
            <td class="table__block">{{ index + 1 }}</td>
            <td class="table__block">{{ item.course.description }}</td>
            <td class="table__block">
                <UIButton type="button" size="small" variant="danger" @click="handleDelete(item)">
                    <i-icon-park-solid-people-delete></i-icon-park-solid-people-delete>
                </UIButton>
            </td>
        </template>
    </UITable>
</template>

<script setup>

const emits = defineEmits(['delete'])
const header = ref(['#', 'Course Assigned', 'Action'])
const props = defineProps({
    assignData: Object
});

const { assignData } = toRefs(props);

const handleDelete = (item) => {
    emits('delete', item)
}
</script>