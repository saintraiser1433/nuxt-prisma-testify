    <template>
        <div>
            <div class="absolute end-5 bottom-20">
                <UButton variant="solid" color="neon-carrot" size="lg">
                    <i-fluent-emoji-flat-magnifying-glass-tilted-left></i-fluent-emoji-flat-magnifying-glass-tilted-left>
                    Find my missing
                </UButton>
            </div>
            <UICard :body="{ padding: 'sm:p-0 p-0', base: 'h-[65vh] lg:h-[71vh] w-full overflow-y-auto' }"
                :header="{ padding: 'sm:p-0 p-0' }" :footer="{
                    base: 'flex justify-center items-center py-2 dark:bg-darken'
                }">
                <template #header>
                    <div
                        class="bg-[url('@/assets/images/bgheaders.png')] w-full h-16 bg-cover flex gap-2 justify-between items-center px-3 text-xs lg:text-2xl font-semibold text-white">
                        <h2 class="uppercase">EXAM TITLE: {{ question?.exam_title ?? 'NO EXAM' }}</h2>
                        <h2>ITEMS: {{ answerData.length }}/{{ question?.data.length ?? 0 }}</h2>
                    </div>
                </template>
                <template #default>
                    <UITables :data="question?.data ?? []" :columns="columns" :has-border="true"
                        :has-column-filter="false" :hasActionHeader="false" :has-pagination="false"
                        :has-page-count="false" :td="{
                            base: 'border dark:border-gray-700 align-top py-5'
                        }">
                        <template #increment-data="{ row, index }">
                            <td class="font-bold"
                                style="max-width: 1rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                {{ index + 1 }}
                            </td>
                        </template>
                        <template #question-data="{ row, index: indexQuestion }">
                            <td class="lg:max-w-6xl whitespace-normal text-wrap">

                                <p class="font-bold" v-html="row.question"></p>
                                <div class="grid grid-cols-2 gap-5 mt-2">
                                    <URadio v-for="(method, index) of row.choices" v-model="row.selectedChoice"
                                        @click="pushData(indexQuestion, index)" :key="method.value" v-bind="method">

                                        <template #label="{ label }">
                                            <div v-html="label"></div>
                                        </template>
                                    </URadio>
                                </div>
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
definePageMeta({
    requiredRole: 'examinee',
    layout: 'user',
})

useSeoMeta({
    title: 'Testify User Exam',
    description: 'This is an examination page',
    ogTitle: 'Testify User Exam',
    ogDescription: 'This is an examination page',
});




const { info } = useAuthentication();
const inf = JSON.parse(info.value);
const { setToast } = useToasts();


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


const nuxtApp = useNuxtApp()
const repo = repository<ApiResponse<SubmitExamModel>>(nuxtApp.$api);
const checkingExam = repository(nuxtApp.$api);
const store = useExamStore();
const shouldRefetch = ref(0);
const answerData = ref<ExamAnswerDetails[]>([])

const { data: question, status, error } = await useAPI<ExamDetails>(`/exam/available/${inf.id}`, {
    watch: [shouldRefetch]
})

if (error.value) {
    setToast('error', error.value.data.message)
    navigateTo({ name: 'user' })

}







const pushData = (indexQuestion: number, indexChoice: number) => {
    if (!question?.value?.data || !question.value.data[indexQuestion]) {
        setToast('error', 'Invalid question data')
        return;
    }
    const currentQuestion = question.value.data[indexQuestion];
    const currentChoice = currentQuestion.choices[indexChoice];
    if (!currentChoice) {
        setToast('error', 'Invalid choice')
        return;
    }
    const checkValue = answerData.value.findIndex(
        (item) => item.question_id === currentQuestion.question_id
    );
    const newEntry: ExamAnswerDetails = {
        choices_id: currentChoice.value,
        question_id: currentQuestion.question_id,
    };

    if (checkValue !== -1) {
        answerData.value[checkValue] = newEntry;
    } else {
        answerData.value.push(newEntry);
    }

}


const submitExam = async () => {

    if (answerData.value.length !== question.value?.data.length) {
        setToast('error', 'Please answer all questions');
        return;
    }

    const db = {
        examinee_id: inf.id,
        exam_id: question.value.exam_id,
        details: answerData.value
    }
    try {
        await repo.submitExam(db);
        const checkExistingExam = await checkingExam.getCheckExistingExam<[]>(inf.id);
        if (checkExistingExam && checkExistingExam.length > 0) {
            answerData.value = [];
            shouldRefetch.value++;

            setToast('success', 'Successfully added');
        } else {
            store.setExam();
            navigateTo({ name: 'user' })
        }

    } catch (err: any) {
        setToast('error', err.data.error || 'Error submitting exam');
        console.error(err.data.error);
    }


}



</script>



