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

const { letterWithText } = useConvertLetter();
const emits = defineEmits<{
    (e: 'update', payload: QuestionModel): void;
    (e: 'delete', id: number): void;
}>();

const props = defineProps({
    questionData: {
        type: Array as PropType<QuestionModel[]>,
        required: true,
        default: () => [],
    },
    isLoading: {
        type: Boolean,
        default: false,
    }
})

const { questionData, isLoading } = toRefs(props)

const handleUpdate = (val: QuestionModel) => {
    emits('update', val)
}
const handleDelete = (id: number) => {
    emits('delete', id)
}

</script>
<template>
    <UITables :is-loading="isLoading" :data="questionData" :hasBorder="true" :columns="columns"
        :has-action-header="false" :td="{
            base: 'border dark:border-gray-700 align-top py-5'
        }">
        <template #increment-data="{ row, index }">
            <span class="font-semibold">{{ index + 1 }}</span>
        </template>
        <template #question-data="{ row, index }">
            <td class="max-w-lg whitespace-normal text-wrap">
                <p class="font-bold" v-html="row.question"></p>
                <div class="grid grid-cols-12 gap-2 mt-2">
                    <div class="lg:col-span-4 col-span-12" v-for="(choices, index) in row.Choices"
                        :key="choices.choices_id">

                        <p :class="{ 'text-success': choices.status }" class="flex gap-2"
                            v-html="letterWithText(index, choices.description)"></p>
                    </div>

                </div>
            </td>
        </template>
        <template #actions-data="{ row, index }">
            <div class="flex gap-1">
                <UButton color="emerald" class="dark:text-white" variant="solid" size="xs" @click="handleUpdate(row)">
                    <i-bx-edit />
                </UButton>
                <UButton color="carnation" class="dark:text-white" variant="solid" size="xs"
                    @click="handleDelete(row.question_id)">
                    <i-icon-park-solid-people-delete />
                </UButton>
            </div>
        </template>
    </UITables>
</template>
