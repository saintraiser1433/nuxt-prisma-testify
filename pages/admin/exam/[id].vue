<template>
    <div class="grid grid-cols-12 gap-2">
        <div class="col-span-12 lg:col-span-4">
            <UICard :base="{ padding: 'sm:py-3' }" :body="{ padding: 'sm:px-3 ' }">
                <template #header>
                    <h1 class="text-2xl lg:text-lg font-semibold">Manage Questions</h1>
                </template>
                <QuestionForm @data-quest-choice="submitQuestion" v-model="formQuestion" :is-update="isUpdate"
                    @reset="resetForm" />
            </UICard>

        </div>
        <div class="col-span-12 lg:col-span-8">

            <UICard>
                <template #header>
                    <h1 class="text-2xl lg:text-lg font-semibold">Question List</h1>
                </template>
                <QuestionList :is-loading="statuses" :question-data="question ?? []" @update="editQuestion" @delete="removeQuestion" />

            </UICard>

        </div>

    </div>

</template>

<script setup lang="ts">
definePageMeta({
    requiredRole: 'admin',
    middleware: 'check-exam'
})

const { setToast } = useToasts()
const { setAlert } = useAlert()
const { params } = useRoute();

const isUpdate = ref(false)
const nuxtApp = useNuxtApp()

const questionRepo = repository<ApiResponse<QuestionModel>>(nuxtApp.$api)
const shouldRefetch = ref(0);
const statuses = computed(() => status.value === 'pending');
const { data: question, status, error } = await useAPI<QuestionModel[]>(`/question/${params.id}`, {
    watch: [shouldRefetch],
    lazy: true,
    getCachedData(key) {
        const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
        if (!data) {
            return
        }
        return data;
    }
})

if (error.value) {
    console.error(error.value)
    setToast('error', error.value?.data.message || 'An error occurred');
}



/* Question */


const formQuestion = reactive<QuestionModel>({
    question_id: undefined,
    question: '',
    Choices: []
});
const submitQuestion = async (data: QuestionModel): Promise<void> => {
    try {
        let response;
        if (!isUpdate.value) {
            response = await questionRepo.addQuestion(data);
        } else {
            response = await questionRepo.updateQuestion(data);
        }
        setToast('success', response.message)
        shouldRefetch.value++;
        resetForm();
    } catch (error: any) {
        setToast('error', error.data.message || 'An error occurred');
    }
}


const editQuestion = (response: QuestionModel) => {
    formQuestion.question_id = response.question_id;
    formQuestion.question = response.question;
    formQuestion.Choices = response.Choices;
    isUpdate.value = true
}

const removeQuestion = (id: number) => {
    setAlert('warning', 'Are you sure you want to delete?', '', 'Confirm delete').then(
        async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await questionRepo.removeQuestion(id);
                    setToast('success', response.message);
                    shouldRefetch.value++;
                } catch (error: any) {
                    setToast('error', error.data.message || 'An error occurred');
                }
            }
        }
    )
}


const resetForm = () => {
    formQuestion.question = ''
    formQuestion.Choices = []
    formQuestion.question_id = undefined
    isUpdate.value = false

}







</script>