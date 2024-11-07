<template>
    <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->

    <div class="grid grid-cols-5 gap-5">
        <div class="col-span-5 lg:col-span-1 ">
            <UICard title="Exam Information">
                <template #default>
                    <ExamForm :isUpdate="isUpdate" :formData="data" @dataExam="submitExam" @reset="resetInstance">
                    </ExamForm>
                </template>
            </UICard>

        </div>
        <div class="col-span-5 lg:col-span-4 ">
            <UICard title="List of Exam's">
                <template #default>
                    <ExamList :examData="exam ?? []" @update="editExam" @delete="removeExam">
                    </ExamList>
                </template>
            </UICard>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    requiredRole: 'admin',
    // middleware: ['checkRole'],
    breadcrumbs: 'Exam',
})

useHead({
    title: 'Testify Exam Module',
    meta: [
        { name: "description", content: 'CRUD for Exam' },
        { property: "og:title", content: 'Testify Exam Module' },
        { property: "og:description", content: 'CRUD for Exam' },
    ],
});

const { setToast } = useToast()
const { setAlert } = useAlert()
const data = ref<ExamModel>({})
const isUpdate = ref(false)
const config = useRuntimeConfig()
const { token } = useAuthentication()
const shouldRefetch = ref(0);
const nuxtApp = useNuxtApp()
const { data: exam, status, error, refresh } = await useFetch<ExamModel[]>(`${config.public.baseURL}/exam`, {
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
/* Exam */

const submitExam = async (data: ExamModel) => {
    try {

        if (!isUpdate.value) {
            const response = await useFetchApi<ApiResponse<ExamModel>, ExamModel>(
                `${config.public.baseURL}/exam`,
                Method.POST,
                data);
            setToast('success', response.message)
        } else {
            const response = await useFetchApi<ApiResponse<ExamModel>, ExamModel>(
                `${config.public.baseURL}/exam/${data.exam_id}`,
                Method.PUT,
                data);
            setToast('success', response.message)
        }
        shouldRefetch.value++;
        resetInstance();
    } catch (error: any) {
        console.error(error);
        setToast('error', error.data.error || 'An error occurred');
    }
}


const editExam = (response: ExamModel) => {
    data.value = response
    isUpdate.value = true
}

const removeExam = (id: number) => {
    setAlert('warning', 'Are you sure you want to delete?', '', 'Confirm delete').then(
        async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await useFetchApi<ApiResponse<ExamModel>, ExamModel>(
                        `${config.public.baseURL}/exam/${id}`,
                        Method.DELETE);
                    setToast('success', response.message);
                    shouldRefetch.value++;
                } catch (error: any) {
                    console.error(error);
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