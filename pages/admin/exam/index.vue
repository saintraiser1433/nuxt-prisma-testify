<template>
    <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->

    <div class="grid grid-cols-5 gap-5">
        <div class="col-span-5 lg:col-span-1 ">
            <UICard>
                <template #header>
                    <UICardHeader>
                        <h1 class="text-2xl lg:text-lg">Exam Information</h1>
                    </UICardHeader>
                </template>
                <ExamForm :is-update="isUpdate" :form-data="data" @data-exam="submitExam" @reset="resetInstance"/>
            </UICard>

        </div>
        <div class="col-span-5 lg:col-span-4 ">
            <UICard>
                <template #header>
                    <UICardHeader>
                        <h1 class="text-2xl lg:text-lg">List of Exam's</h1>
                    </UICardHeader>
                </template>
                <template #default>
                    <ExamList :exam-data="exam ?? []" @update="editExam" @delete="removeExam"/>

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
const shouldRefetch = ref(0);
const nuxtApp = useNuxtApp()
const examRepo = repository<ApiResponse<ExamModel>>(nuxtApp.$api)


const { data: exam } = await useAPI<ExamModel[]>('/exam', {
    watch: [shouldRefetch],
    getCachedData(key) {
        const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
        if (!data) {
            return
        }
        return data;
    }
})
/* Exam */

const submitExam = async (data: ExamModel) => {
    try {
        let response;
        if (!isUpdate.value) {
            response = await examRepo.addExam(data);
        } else {
            response = await examRepo.updateExam(data);
        }
        setToast('success', response.message)
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
                    const response = await examRepo.removeExam(id);
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