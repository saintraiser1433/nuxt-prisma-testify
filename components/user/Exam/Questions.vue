<template>
    <UITables :data="props.questionData" :columns="columns" :has-border="true" :has-column-filter="false"
        :hasActionHeader="false" :has-pagination="false" :has-page-count="false" :td="{
            base: 'border dark:border-gray-700 align-top',
            padding: 'p-0'
        }">
        <template #question_id-data="{ row, index }">
            <div class="font-bold text-gray-800 dark:text-gray-100 p-5">
                {{ index + 1 }}
            </div>
        </template>

        <template #question-data="{ row, index: indexQuestion }">

            <div class="w-full h-full p-5 text-wrap" :id="`question-${row.question_id.value}`">
                <p class="font-bold text-gray-800 dark:text-gray-100" v-html="row.question.value"></p>
                <div class="grid grid-cols-2 gap-5 mt-2">
                    <URadio v-for="(method, index) in row.choices"
                        :ui="{ base: 'cursor-pointer dark:bg-white ', background: 'dark:bg-white' }"
                        :name="`question-${row.question_id.value}`" @change="handleAnswerChange(indexQuestion, index)"
                        :key="method.value" v-bind="method" v-model="answers[row.question_id.value]">
                        <template #label="{ label }">
                            <div class="text-gray-900 dark:text-gray-100" v-html="label"></div>
                        </template>
                    </URadio>
                </div>
            </div>
        </template>

    </UITables>

</template>

<script lang="ts" setup>
const columns = [
    {
        key: 'question_id',
        label: '#',
        sortable: true,
        rowClass: 'w-10'
    },
    {
        key: 'question',
        label: 'Question',
        sortable: true,
    }
];
const emits = defineEmits<{
    (e: 'pushData', payload: IndexExamAnswers): void;
}>();

const props = defineProps({
    questionData: {
        type: Array,
        required: true,
        default: () => [],
    },
    sessionData: {
        type: Array,
        required: true,
        default: () => []
    }
})

const { sessionData } = toRefs(props)
const answers = computed(() => {
    return props.sessionData.reduce((acc, item) => {
        acc[item.question_id] = item.choices_id
        return acc
    }, {} as Record<number, number>)
})


const handleAnswerChange = (indexQuestion: number, indexChoice: number) => {
    emits('pushData', { indexQuestion, indexChoice })

}






</script>
