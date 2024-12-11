<template>
    <div>
        <UICard :body="{ padding: 'sm:p-0 p-0', base: 'h-[65vh] lg:h-[71vh] w-full overflow-y-auto' }"
            :header="{ padding: 'sm:p-0 p-0' }" :footer="{
                base: 'flex justify-center items-center py-2 dark:bg-darken'
            }">
            <template #header>
                <div
                    class="bg-[url('@/assets/images/bgheaders.png')] w-full h-16 bg-cover flex gap-2 justify-between items-center px-3 text-xs lg:text-2xl font-semibold text-white">
                    <h2>EXAM TITLE: LEARNING IN FILIPINO USING BLAH</h2>
                    <h2>ITEMS: 0/76</h2>
                </div>
            </template>
            <template #default>

                <UITables :data="question ?? []" :columns="columns" :has-border="true" :has-column-filter="false"
                    :hasActionHeader="false" :has-pagination="false" :has-page-count="false" :td="{
                        base: 'border dark:border-gray-700 align-top py-5'
                    }">
                    <template #increment-data="{ row, index }">
                        <td class="font-bold"
                            style="max-width: 1rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                            {{ index + 1 }}
                        </td>
                    </template>
                    <template #question-data="{ row, index }">
                        <td class="lg:max-w-6xl whitespace-normal text-wrap">
                            <p class="font-bold" v-html="row.question"></p>
                            <URadioGroup v-model="selectedAnswers[index]" @click="pushData(index)" color="primary"
                                size="xl" :options="row.choices" :ui="{
                                    fieldset: 'lg:grid lg:grid-cols-2 lg:gap-5 lg: pt-2 cursor-pointer  ',
                                }">
                                <template #label="{ option, index }">
                                    <p class="text-sm break-words whitespace-normal" v-html="option.label"></p>
                                </template>
                            </URadioGroup>
                        </td>
                    </template>

                </UITables>

            </template>

            <template #footer>
                <UButton type="submit" color="gray" size="md" @click="submitExam" :ui="{
                    color: {
                        gray: {
                            solid: 'bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 text-white hover:dark:bg-emerald-600'
                        }
                    }
                }">Submit Exam</UButton>
            </template>
        </UICard>


    </div>
</template>


<script lang="ts" setup>
import type { SubmitExamModel } from '~/types';

definePageMeta({
    requiredRole: 'examinee',
    layout: 'user',
    middleware: 'next-question'
})

useSeoMeta({
    title: 'Testify User Exam',
    description: 'This is an examination page',
    ogTitle: 'Testify User Exam',
    ogDescription: 'This is an examination page',
});
type submitAnswer = {
    question_id: number,
    examinee_id: string,
    choices_id: string,
    exam_id: number
}


const { userId } = useAuthentication();


const data = ref<submitAnswer[]>([]);
const selectedAnswers = ref<Record<number, string>>({})
const columns = [{
    key: 'increment',
    label: '#',
    class: 'w-10 max-w-[10rem]',
    sortable: true
}, {
    key: 'question',
    label: 'Question',
    sortable: true
}]


const { $api } = useNuxtApp()

const examData = useState('exam')
// const exam = repository<ApiResponse<SubmitExamModel>>($api)


const { data: question, status, error } = await useAPI(`/exam/available/${examData.value}`, {
    transform: (data: any) => {
        // return data;
        return data.map((item: any) => ({
            question_id: item.question_id,
            question: item.question,
            choices: item.Choices.map((choice: any) => ({
                label: choice.description,
                value: choice.choices_id,

            })
            )
        }))
    },

})


const pushData = (index: number) => {

    data.value.push({
        examinee_id: userId,
        choices_id: question.value[index].choices[index].value,
        question_id: question.value[index].question_id,
        exam_id: Number(examData.value),
    })


}


const submitExam = () => {
    console.log(data);
}






</script>



<style scoped></style>
