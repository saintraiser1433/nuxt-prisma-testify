<template>
    <div class="grid grid-cols-12 gap-2">
        <div class="col-span-12 lg:col-span-4 xl:col-span-4">
            <UICard title="Question Information">
                <QuestionForm @dataQuestChoice="submitQuestion" :formData="data" :isUpdate="isUpdate"
                    @reset="resetInstance">
                </QuestionForm>
            </UICard>
        </div>
        <div class="col-span-12 lg:col-span-4 xl:col-span-8">
            <UICard title="Question List">
                <QuestionList :questionData="question" @update="edit" @delete="remove"></QuestionList>
            </UICard>
        </div>
    </div>
</template>

<script setup>
const { setToast } = useToast()
const { setAlert } = useAlert()
const { createQuestion, updateQuestion, deleteQuestion } = useQuestion()
const route = useRoute().params;
const data = ref({})
const isUpdate = ref(false)

const { data: question, status, error, refresh } = await useFetch(`/api/question/${route.id}`, {
    method: 'GET',
});

/* Question */
const submitQuestion = async (data) => {
    try {

        if (!isUpdate.value) {
            const reqBody = {
                ...data,
                exam_id: Number(route.id)
            }
            const response = await createQuestion(reqBody);
            setToast('success', response.message)
        } else {
            delete data.status;
            const response = await updateQuestion(data, data.exam_id)
            setToast('success', response.message)
        }
        refresh();
        resetInstance();
    } catch (error) {
        console.log(error)
        setToast('error', error.statusMessage || 'An error occurred');
    }
}


const edit = (response) => {
    data.value = response
    isUpdate.value = true
}

const remove = (id) => {
    setAlert('warning', 'Are you sure you want to delete?', '', 'Confirm delete').then(
        async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteQuestion(id);
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