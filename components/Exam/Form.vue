<template>
    <form @submit.prevent="submitExam">
        <div class="mb-2">
            <label class="text-sm" for="exam">Exam Title:</label>
            <UIInput type="text" id="exam" v-model="formExam.exam_title" disabled required />
        </div>
        <div class="mb-2">
            <label class="text-sm" for="description">Exam Description:</label>
            <UIInput type="text" id="description" v-model="formExam.description" required />
        </div>
        <div class="mb-2">
            <label class="text-sm" for="score">Time Limit:</label>
            <UIInput type="number" id="score" v-model.number="formExam.time_limit" required />
        </div>
        <div class="mb-2">
            <label class="text-sm" for="question">Question Limit:</label>
            <UIInput type="number" id="question" v-model.number="formExam.question_limit" required />
        </div>
        <div class="border-t dark:border-colorBorder pt-2">
            <UIButton type="button" v-if="isUpdate" class="bg-danger mb-2" size="block" @click="reset">Reset</UIButton>
            <UIButton type="submit" class="bg-primary" size="block">{{
                isUpdate ? 'Update' : 'Submit'
            }}</UIButton>

        </div>
    </form>
</template>

<script setup>
import { toRefs, ref, watch } from 'vue'

const emits = defineEmits(['dataExam', 'reset'])
const store = useStore();
const props = defineProps({
    isUpdate: {
        type: Boolean,
        default: false
    },
    formData: {
        type: Object
    }
})

const { isUpdate, formData } = toRefs(props)

const formExam = ref({
    exam_title: '',
    description: '',
    time_limit: null,
    question_limit: null
})

watch(
    formData,
    (newData) => {
        if (newData && JSON.stringify(formExam.value) !== JSON.stringify(formData)) {
            formExam.value = { ...newData }
        }
    },
    { deep: true }
)

const reset = () => {
    emits('reset')
}

const submitExam = () => {
    emits('dataExam', { ...formExam.value })
}
</script>