<template>
    <div class="grid grid-cols-12 gap-2">
        <div class="col-span-12 lg:col-span-4">
            <UICard title="Question Information">
                <template #header>
                    <UICardHeader>
                        <h1 class="text-2xl lg:text-lg">Question Information</h1>
                    </UICardHeader>
                </template>
                <QuestionForm @data-quest-choice="submitQuestion" :form-data="data" :is-update="isUpdate"
                    @reset="resetInstance" />

            </UICard>
        </div>
        <div class="col-span-12 lg:col-span-8">
            <UICard title="Question List">
                <template #header>
                    <UICardHeader>
                        <h1 class="text-2xl lg:text-lg">Question List</h1>
                    </UICardHeader>
                </template>
                <QuestionList :question-data="question ?? []" @update="edit" @delete="remove"/>
            </UICard>
        </div>

    </div>

</template>

<script setup lang="ts">
definePageMeta({
    requiredRole: 'admin',
    // middleware: ['checkExam'],
})

const { setToast } = useToast()
const { setAlert } = useAlert()
const route = useRoute().params;
const data = ref<QuestionModel>({})
const isUpdate = ref(false)
const nuxtApp = useNuxtApp()
const questionRepo = repository<ApiResponse<QuestionModel>>(nuxtApp.$api)
const shouldRefetch = ref(0);

const { data: question, status, error } = await useAPI<QuestionModel[]>(`/question/${route.id}`, {
    watch: [shouldRefetch],
    getCachedData(key) {
        const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
        if (!data) {
            return
        }
        return data;
    }
})



/* Question */
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
        resetInstance();
    } catch (error: any) {
        setToast('error', error.data.error || 'An error occurred');
    }
}


const edit = (response: QuestionModel) => {
    data.value = response
    isUpdate.value = true
}

const remove = (id: number) => {
    setAlert('warning', 'Are you sure you want to delete?', '', 'Confirm delete').then(
        async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await questionRepo.removeQuestion(id);
                    setToast('success', response.message);
                    shouldRefetch.value++;
                } catch (error: any) {
                    setToast('error', error.data.error || 'An error occurred');
                }
            }
        }
    )
}


const resetInstance = () => {
    isUpdate.value = false
    data.value = {}
}





</script>