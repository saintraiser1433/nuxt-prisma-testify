<script setup lang="ts">
definePageMeta({
    requiredRole: 'admin',
})
useSeoMeta({
    title: 'Testify Exam Module',
    description: 'CRUD for Exam',
    ogTitle: 'Testify Exam Module',
    ogDescription: 'CRUD for Exam',
});


const { $api, payload, static: stat } = useNuxtApp()
const { setToast } = useToasts();
const { setAlert } = useAlert()


/* fetch exam */
const statuses = computed(() => status.value === 'pending');
const examData = computed(() => data.value || []);

const { data, status, error } = await useAPI<ExamModel[]>('/exam', {
    getCachedData(key) {
        const data = payload.data[key] || stat.data[key]
        return data;
    },
})

if (error.value) {
    setToast('error', error.value.data.message || 'Failed to fetch items')
}




//submit exam

const initialState = {
    exam_id: undefined,
    exam_title: "",
    description: "",
    time_limit: 0,
    status: true
};
const examRepo = repository<ApiResponse<ExamModel>>($api)
const examForm = reactive<ExamModel>({ ...initialState })
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

const editExam = (response: ExamModel) => {
    examForm.exam_id = response.exam_id;
    examForm.description = response.description;
    examForm.exam_title = response.exam_title;
    examForm.time_limit = response.time_limit;
    examForm.status = response.status;
    isOpen.value = true;
    isUpdate.value = true;
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


//utils
const isOpen = ref(false);
const isUpdate = ref(false);


const resetForm = () => {
    Object.assign(examForm, initialState);
}

const toggleModal = () => {
    resetForm();
    isOpen.value = true;
    isUpdate.value = false
}
</script>



<template>
    <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->
    <UModal v-model="isOpen" prevent-close>
        <UICard :body="{
            padding: 'px-4'
        }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h1 class="text-2xl lg:text-lg font-semibold">Exam Information</h1>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="isOpen = false" />
                </div>
            </template>
            <ExamForm v-model="examForm" :is-update="isUpdate" @data-exam="submitExam"></ExamForm>
        </UICard>
    </UModal>

    <div class="grid grid-cols-5 gap-5">
        <div class="col-span-5">
            <UICard>
                <template #header>
                    <h1 class="text-2xl lg:text-lg font-semibold">List of Exam's</h1>
                </template>
                <ExamList :is-loading="statuses" :exam-data="examData" @toggle-modal="toggleModal" @update="editExam"
                    @delete="removeExam" />
            </UICard>
        </div>
    </div>



</template>

