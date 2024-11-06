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
const data = ref<ExamModel>(
    {
        exam_id: 0,
        exam_title: '',
        description: '',
        time_limit: 0,
        question_limit: 0,
        status: false,
    }
)
const isUpdate = ref(false)
const config = useRuntimeConfig()
const { token } = useAuthentication()

const { data: exam, status, error, refresh } = await useFetch<ExamModel[]>(`${config.public.baseURL}/exam`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    }
});
/* Exam */

const submitExam = async (data: ExamModel) => {
    try {
        if (!isUpdate.value) {
            const response = await useFetchApi<ApiResponse<ExamModel>>(
                `${config.public.baseURL}/department`,
                Method.POST,
                data);
            setToast('success', response.message)
        } else {
            const response = await useFetchApi<ApiResponse<ExamModel>>(
                `${config.public.baseURL}/department/${data.exam_id}`,
                Method.PUT,
                data);
            setToast('success', response.message)
        }
        refresh();
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
                    const response = await useFetchApi<ApiResponse<ExamModel>>(
                        `${config.public.baseURL}/department/${id}`,
                        Method.DELETE,
                        data);
                    setToast('success', response.message);
                    refresh();
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
    data.value = {
        exam_id: 0,
        exam_title: '',
        description: '',
        time_limit: 0,
        question_limit: 0,
        status: false,
    }
}





</script>