<template>
    <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->
    <UModal v-model="isOpen">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <h1 class="text-2xl lg:text-lg">Exam Information</h1>
            </template>
            <ExamForm :form-data="data" :is-update="isUpdate" @data-exam="submitExam"></ExamForm>
        </UCard>
    </UModal>

    <div class="grid grid-cols-5 gap-5">
        <div class="col-span-5">
            <UCard class="w-full" :ui="{
                base: '',
                ring: '',
                divide: 'divide-y divide-gray-200 dark:divide-gray-700',
                header: { padding: 'px-4 py-5' },
                body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
                footer: { padding: 'p-4' }
            }">
                <template #header>
                    <h1 class="text-2xl lg:text-lg">List of Exam's</h1>
                </template>
                <ExamList :exam-data="examData" @toggle-modal="toggleModal" @assign="routeToQuestion" @update="editExam"
                    @delete="removeExam" />

            </UCard>
        </div>
    </div>



</template>

<script setup lang="ts">
definePageMeta({
    requiredRole: 'admin',
    // middleware: ['checkRole'],
})
useHead({
    title: 'Testify Exam Module',
    meta: [
        { name: "description", content: 'CRUD for Exam' },
        { property: "og:title", content: 'Testify Exam Module' },
        { property: "og:description", content: 'CRUD for Exam' },
    ],
});





const { $api, payload, static: stat } = useNuxtApp()
const { setToast } = useToasts();
const isUpdate = ref(false);
const { setAlert } = useAlert()
const examRepo = repository<ApiResponse<ExamModel>>($api)
const examData = ref<ExamModel[]>([])
const isOpen = ref(false);
const data = ref<ExamModel>({})
const { data: exam, error, status } = await useAPI<ExamModel[]>('/exam', {
    getCachedData(key) {
        const data = payload.data[key] || stat.data[key]
        if (!data) {
            return
        }
        return data;
    },

})

if (exam && exam.value) {
    examData.value = exam.value;
} else {
    console.error(error.value)
    setToast('error', error.value?.data.message || 'An error occurred');
}



/* Exam */

const submitExam = async (response: ExamModel) => {
    try {
        if (!isUpdate.value) {
            const res = await examRepo.addExam(response);
            examData.value.unshift(res.data as ExamModel)
            setToast('success', res.message)
        } else {
            const res = await examRepo.updateExam(response);
            const index = examData.value.findIndex((item) => item.exam_id === res.data?.exam_id);
            examData.value[index] = { ...examData.value[index], ...res.data }
            setToast('success', res.message)
        }
        isOpen.value = false;
        isUpdate.value = false;

    } catch (error: any) {
        setToast('error', error.data.message || 'An error occurred');
    }
}

const toggleModal = () => {
    data.value = {}
    isOpen.value = true;
    isUpdate.value = false
}


const routeToQuestion = async (id: number) => {
    await navigateTo(`/admin/exam/${id}`)
}




const editExam = (response: ExamModel) => {
    data.value = {
        exam_id: response.exam_id,
        description: response.description,
        exam_title: response.exam_title,
        time_limit: response.time_limit,
        status: response.status,
    };
    isOpen.value = true;
    isUpdate.value = true
}

const removeExam = (id: number) => {
    setAlert('warning', 'Are you sure you want to delete?', '', 'Confirm delete').then(
        async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await examRepo.removeExam(id);
                    const index = examData.value.findIndex((item) => item.exam_id === id);
                    examData.value.splice(index, 1);
                    setToast('success', response.message);
                } catch (error: any) {
                    console.error(error)
                    setToast('error', error.data.message || 'An error occurred');
                }
            }
        }
    )
}




</script>