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
                    <ExamList :examData="exam" @update="editExam" @delete="removeExam">
                    </ExamList>
                </template>
            </UICard>
        </div>
    </div>
</template>

<script setup>
const { setToast } = useToast()
const { setAlert } = useAlert()
const { createExam, updateExam, deleteExam } = useExam()
const data = ref({})
const isUpdate = ref(false)

const { data: exam, status, error, refresh } = await useFetch('/api/exam', {
    method: 'GET',
});

/* Exam */
const submitExam = async (data) => {
    try {
        if (!isUpdate.value) {
            const response = await createExam(data);
            setToast('success', response.message)
        } else {
            delete data.status;
            const response = await updateExam(data, data.exam_id)
            setToast('success', response.message)
        }
        refresh();
        resetInstance();
    } catch (error) {
        console.log(error)
        setToast('error', error.statusMessage || 'An error occurred');
    }
}


const editExam = (response) => {
    data.value = response
    isUpdate.value = true
}

const removeExam = (id) => {
    setAlert('warning', 'Are you sure you want to delete?', '', 'Confirm delete').then(
        async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteExam(id);
                    setToast('success', response.message);
                    refresh();
                } catch (error) {
                    setToast('error', error.statusMessage || 'An error occurred');
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