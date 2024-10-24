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
        <div class="border-t border-colorBorder pt-2">
            <UIButton type="submit" class="bg-primary">{{
                isUpdate ? 'Update' : 'Submit'
                }}</UIButton>
            <UIButton type="button" v-if="isUpdate" class="bg-danger ml-2" @click="reset">Reset</UIButton>
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