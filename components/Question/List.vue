<script setup lang="ts">
const columns = [{
    key: "increment",
    label: '#',
    sortable: true
}, {
    key: 'question',
    label: 'Questions',
    sortable: true
}, {
    key: 'actions',
    label: 'Actions',
    sortable: false

}]

const { convertToLetter } = useConvertLetter();
const emits = defineEmits<{
    (e: 'update', payload: QuestionModel): void;
    (e: 'delete', id: number): void;
}>();

const props = defineProps({
    questionData: {
        type: Array as PropType<QuestionModel[]>,
        required: true,
        default: () => [],
    }
})

const { questionData } = toRefs(props)

const handleUpdate = (val: QuestionModel) => {
    emits('update', val)
}
const handleDelete = (id: number) => {
    emits('delete', id)
}

</script>
<template>
    <UITables :data="questionData" :columns="columns" :has-action-header="false">
        <template #increment-data="{ row, index }">
            {{ index + 1 }}
        </template>
        <template #question-data="{ row, index }">
            <td class="max-w-lg whitespace-normal text-wrap">
                <p class="font-bold text-warning">{{ row.question }}</p>
                <div class="grid grid-cols-12 gap-2 mt-2">
                    <div class="lg:col-span-4 col-span-12" v-for="(choices, index) in row.Choices"
                        :key="choices.choices_id">
                        <p :class="{ 'text-success': choices.status }">{{ convertToLetter(index) + ').' +
                            choices.description }}</p>
                    </div>
                </div>
            </td>
        </template>
        <template #actions-data="{ row, index }">
            <div class="flex gap-1">
                <UButton color="emerald" class="dark:text-white" variant="solid" size="sm" @click="handleUpdate(row)">
                    <i-bx-edit />
                </UButton>
                <UButton color="carnation" class="dark:text-white" variant="solid" size="sm"
                    @click="handleDelete(row.question_id)">
                    <i-icon-park-solid-people-delete />
                </UButton>
            </div>
        </template>
    </UITables>
</template>
