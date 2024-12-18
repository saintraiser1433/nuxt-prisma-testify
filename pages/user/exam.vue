    <template>
        <div>
            <div class="absolute end-5 bottom-14">
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
                        <h2>EXAM TITLE: LEARNING IN FILIPINO USING BLAH</h2>
                        <h2>ITEMS: 0/76</h2>
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
                                    <URadio v-for="(method, index) of row.choices" v-model="row.selectedChoice" :key="method.choices_id"
                                        v-bind="method">

                                        <template #label="{ label }">
                                            <div v-html="label"></div>
                                        </template>
                                    </URadio>
                                </div>
                            </td>
                        </template>

                    </UITables>

                </template>

                <!-- <template #footer>
                    <UButton type="submit" color="gray" size="md" @click="submitExam" :ui="{
                        color: {
                            gray: {
                                solid: 'bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 text-white hover:dark:bg-emerald-600'
                            }
                        }
                    }">Submit Exam</UButton>
                </template> -->
            </UICard>


        </div>

    </template>


<script lang="ts" setup>
interface ExamChoice {
    choices_id: number;
    description: string;
}
interface ExamQuestion {
    question_id: number;
    question: string;
    selectedChoice?: number | null;
    choices: ExamChoice[];
}

interface ExamDetails {
    exam_id: number;
    time_limit: number;
    exam_title: string;
    data: ExamQuestion[];
}


definePageMeta({
    requiredRole: 'examinee',
    layout: 'user',
    // middleware: 'next-question'
})

useSeoMeta({
    title: 'Testify User Exam',
    description: 'This is an examination page',
    ogTitle: 'Testify User Exam',
    ogDescription: 'This is an examination page',
});



const { info } = useAuthentication();
const inf = JSON.parse(info.value);
const data = ref<any[]>([]);
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





const { data: question, status, error } = await useAPI<ExamDetails>(`/exam/available/${inf.id}`, {
    watch: [shouldRefetch]


})

if (error.value) {
    setToast('error', error.value.data.message)
    navigateTo({ name: 'user' })

}


// const pushData = (indexQuestion: number, indexChoice: number) => {
//     data.value.push({
//         examinee_id: inf.id,
//         exam_id: question.value[indexQuestion].exam_id,
//         choices_id: question.value[indexQuestion].choices[indexChoice].value,
//         question_id: question.value[indexQuestion].question_id,
//     })


// }




// const submitExam = async () => {

//     if (data.value.length !== question.value.length) {
//         setToast('error', 'Please answer all questions');
//         return;
//     }

//     const mydata = {
//         examinee_id: inf.id,
//         exam_id: question.value[0].exam_id,
//         details: data.value.map((item) => ({
//             choices_id: Number(item.choices_id),
//             question_id: Number(item.question_id)
//         }))
//     }

//     try {
//         await repo.submitExam(mydata);
//         const checkExistingExam = await checkingExam.getCheckExistingExam<ExamType[]>(inf.id);
//         if (checkExistingExam && checkExistingExam.length > 0) {
//             data.value = [];
//             shouldRefetch.value++;
//             store.setExam();
//             setToast('success', 'Successfully added');
//         } else {
//             navigateTo({ name: 'user' })
//         }

//     } catch (err: any) {
//         setToast('error', err.data.error || 'Error submitting exam');
//         console.error(err.data.error);
//     }



// }






</script>



<style scoped></style>
