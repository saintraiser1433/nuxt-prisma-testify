<template>
    <form @submit.prevent="submitCourse">
        <div class="mb-2">
            <label class="text-sm" for="course">Course:</label>
            <UIInput type="text" id="course" v-model="formCourse.description" required />
        </div>
        <div class="mb-2">
            <label class="text-sm" for="score">Score Attained:</label>
            <UIInput type="number" id="score" v-model.number="formCourse.score" required />
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

const emits = defineEmits(['dataCourse', 'reset'])

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

const formCourse = ref({
    description: '',
    score: null
})

const reset = () => {
    emits('reset')
}

const submitCourse = () => {
    emits('dataCourse', { ...formCourse.value })
}

watch(
    formData,
    (newData) => {
        if (newData) {
            formCourse.value = { ...newData }
        }
    },
    { deep: true }
)
</script>