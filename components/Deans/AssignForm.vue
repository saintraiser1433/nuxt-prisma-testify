<template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Deans Name" name="first_name">
            <UInput :model-value="deansName" :ui="{ base: 'capitalize' }" disabled />
        </UFormGroup>
        <UFormGroup label="Course Name" name="course_id" required>
            <USelect v-model.number="state.course_id" :options="courseList" option-attribute="name" />
        </UFormGroup>

        <UButton type="submit" block>
            Submit
        </UButton>
    </UForm>
</template>

<script setup lang="ts">
import Joi from 'joi'
import type { FormSubmitEvent } from '#ui/types'
const props = defineProps({
    deansId: {
        type: Number,
        required: true
    },
    deansName: {
        type: String,
        required: true
    },
    courseData: {
        type: Array as PropType<CourseModel[]>,
        required: true

    }
})
const { deansId, courseData, deansName } = toRefs(props)

const emits = defineEmits<{
    (e: 'dataAssign', payload: AssignDeansModel): void,
    (e: 'reset'): void,
}>()



const courseList = computed(() => {
    return courseData.value.map((item) => ({
        name: item.description,
        value: item.course_id,
    }))
})

const schema = Joi.object({
    course_id: Joi.number().required().messages({
        "any.required": `Course is Required`,
    }),


})

const state = ref<AssignDeansModel>({
    course_id: undefined
})




const onSubmit = async (event: FormSubmitEvent<AssignDeansModel>) => {
    const data = {
        deans_id: deansId.value,
        course_id: state.value.course_id
    }
    emits('dataAssign', data)
    state.value.course_id = 0;
}


</script>