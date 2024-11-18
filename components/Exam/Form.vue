<template>

    <UForm :schema="schema" :state="formExam" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Exam Title" name="exam_title" required>
            <UInput v-model="formExam.exam_title" />
        </UFormGroup>
        <UFormGroup label="Exam Description" name="description" required>
            <UInput v-model="formExam.description" />
        </UFormGroup>
        <UFormGroup label="Time Limit" name="time_limit" required>
            <UInput v-model="formExam.time_limit" />
        </UFormGroup>
        <UFormGroup v-if="isUpdate" label="Status" name="status">
            <UToggle v-model="formExam.status" />
        </UFormGroup>

        <UButton type="submit" block>
            Submit
        </UButton>
    </UForm>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'

const emits = defineEmits<{
    (e: 'dataExam', payload: ExamModel): void;
    (e: 'reset'): void;
}>();
const props = defineProps({
    formData: {
        type: Object as PropType<ExamModel>,
        required: true
    },
    isUpdate: {
        type: Boolean,
        required: true
    }
})

const { formData, isUpdate } = toRefs(props)
const { $joi } = useNuxtApp()
const formExam = ref<ExamModel>({
    exam_id: undefined,
    exam_title: undefined,
    description: undefined,
    time_limit: undefined,
    status: undefined,
});

const schema = $joi.object({
    exam_id: $joi.number().optional(),
    exam_title: $joi.string().required().messages({
        "any.required": `Department Name is Required`,
    }),
    description: $joi.string().required().messages({
        "any.required": `Score  is Required`,
    }),
    time_limit: $joi.number().required().messages({
        "any.required": `Score  is Required`,
    }),
    status: $joi.boolean().optional()


})


const onSubmit = async (event: FormSubmitEvent<ExamModel>) => {
    emits('dataExam', event.data)
}

watch(
    formData,
    (newData) => {
        if (newData) {
            formExam.value = { ...newData };
        }
    },
    { deep: true, immediate: true }
);
</script>