<template>
    <div class="grid grid-cols-12 gap-2">
        <div class="col-span-12 lg:col-span-4">
            <UICard title="Question Information">
                <QuestionForm @dataQuestChoice="submitQuestion" :formData="data" :isUpdate="isUpdate"
                    @reset="resetInstance">
                </QuestionForm>
            </UICard>
        </div>
        <div class="col-span-12 lg:col-span-8">
            <UICard title="Question List">
                <QuestionList :questionData="question ?? []" @update="edit" @delete="remove"></QuestionList>
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
const config = useRuntimeConfig();
const route = useRoute().params;
const data = ref<QuestionModel>({})
const isUpdate = ref(false)
const nuxtApp = useNuxtApp()
console.log(nuxtApp)
const { token } = useAuthentication()

const shouldRefetch = ref(0);
const { data: question, status, error, refresh } = await useFetch<QuestionModel[]>(`${config.public.baseURL}/question/${route.id}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
    watch: [shouldRefetch],
    getCachedData(key) {
        const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
        //if first time load it will load the data
        if (!data) {
            return
        }
        return data;
    }
});



/* Question */
const submitQuestion = async (data: QuestionModel): Promise<void> => {
    try {

        if (!isUpdate.value) {
            const response = await useFetchApi<ApiResponse<QuestionModel>, QuestionModel>(
                `${config.public.baseURL}/question`,
                Method.POST,
                data);
            setToast('success', response.message)
        } else {
            const response = await useFetchApi<ApiResponse<QuestionModel>, QuestionModel>(
                `${config.public.baseURL}/question/${data.question_id}`,
                Method.PUT,
                data);
            setToast('success', response.message)
        }
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
                    const response = await useFetchApi<ApiResponse<QuestionModel>, QuestionModel>(
                        `${config.public.baseURL}/question/${id}`,
                        Method.DELETE,
                    );
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