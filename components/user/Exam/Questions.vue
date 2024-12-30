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

            <div class="w-full h-full p-5 text-wrap">
                <p class="font-bold text-gray-800 dark:text-gray-100" v-html="row.question.value"></p>
                <div class="grid grid-cols-2 gap-5 mt-2">
                    <URadio v-for="(method, index) of row.choices"
                        :ui="{ base: 'cursor-pointer dark:bg-white ', background: 'dark:bg-white' }"
                        :name="`question-${row.question_id.value}`" @click="addAnswer(indexQuestion, index)"
                        :key="method.value" v-bind="method">
                        <template #label="{ label }">
                            <div class="text-gray-900 dark:text-gray-100" v-html="label"></div>
                            {{ }}
                        </template>
                    </URadio>
                </div>
            </div>
        </template>

    </UITables>
</template>

<script lang="ts" setup>
import type { IndexExamAnswers } from '~/types';

const props = defineProps({
    questionData: {
        type: Array,
        required: true,
        default: () => [],
    },
})

const emits = defineEmits<{
    (e: 'pushData', payload: IndexExamAnswers): void;
}>();

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

const addAnswer = (indexQuestion: number, indexChoice: number) => {
    emits('pushData', { indexQuestion, indexChoice })

}






</script>
