<template>
    <UITable :data="assignData" :header="header">
        <template #row="{ item, index }">
            <td class="table__block">{{ index + 1 }}</td>
            <td class="table__block">{{ item.course.description }}</td>
            <td class="table__block">
                <UIButton type="button" size="small" variant="danger"
                    @click="handleDelete(item.deans.deans_id, item.course.course_id)">
                    <i-icon-park-solid-people-delete></i-icon-park-solid-people-delete>
                </UIButton>
            </td>
        </template>
    </UITable>
</template>

<script setup lang="ts">


const emits = defineEmits<{
    (e: 'delete', deans_id: number, course_id: number): void
}>();
const header = ref<string[]>(['#', 'Course Assigned', 'Action'])
const props = defineProps({
    assignData: {
        type: Array as PropType<AssignDeansModel[]>,
        required: true,
        default: () => [],
    }

});

const { assignData } = toRefs(props);

const handleDelete = (deans_id: number, course_id: number) => {
    emits('delete', deans_id, course_id)
}
</script>