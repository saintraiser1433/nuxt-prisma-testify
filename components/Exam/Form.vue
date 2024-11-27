<template>

    <UForm :schema="schema" :state="formExam" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Exam Title" name="exam_title" required>
            <UInput v-model="formExam.exam_title" color="gray" :ui="{ base: 'uppercase' }" />
        </UFormGroup>
        <UFormGroup label="Exam Description" name="description" required>
            <UInput v-model="formExam.description" color="gray" :ui="{ base: 'capitalize' }" />
        </UFormGroup>
        <UFormGroup label="Time Limit" name="time_limit" required>
            <USelect v-model="formExam.time_limit" color="gray" :options="timeLimit" :ui="{ base: 'uppercase' }"
                option-attribute="name" />
        </UFormGroup>
        <UFormGroup v-if="isUpdate" label="Status" name="status">
            <UToggle v-model="formExam.status" :ui="{
                container: {
                    base: 'dark:bg-white'
                },
                active: 'bg-primary-500 dark:bg-primary-400',
                inactive: 'bg-gray-400 dark:bg-primary-500',
            }" />
        </UFormGroup>

        <UButton type="submit" block color="gray" size="md" :ui="{
            color: {
                gray: {
                    solid: 'bg-primary-500 hover:bg-primary-600 dark:bg-primary-500 text-white hover:dark:bg-primary-600'
                }
            }
        }">Submit</UButton>
    </UForm>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'

const timeLimit = [
    { name: '10 minutes', value: 600 },
    { name: '20 minutes', value: 1200 },
    { name: '25 minutes', value: 1500 },
    { name: '30 minutes', value: 1800 },
    { name: '35 minutes', value: 2100 },
    { name: '45 minutes', value: 2700 },
    { name: '50 minutes', value: 3000 },
    { name: '1 hour', value: 3600 },
    { name: '1 hour and 30 minutes', value: 5400 },
    { name: '2 hours', value: 7200 },
    { name: '2 hour and 30 minutes', value: 9000 },
    { name: '3 hours', value: 10800 },
    { name: '3 hours and 30 minutes', value: 12600 },
    { name: '4 hours', value: 14400 },
    { name: '4 hours and 30 minutes', value: 16200 },
    { name: '5 hours', value: 18000 },

]

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
});


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