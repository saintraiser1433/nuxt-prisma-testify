<template>
    <UForm :schema="schema" :state="formDepartment" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Department Name" name="department_name" required>
            <UInput v-model="formDepartment.department_name" color="gray" :ui="{ base: 'capitalize' }" />
        </UFormGroup>
        <UFormGroup label="Status" name="status">
            <UToggle v-model="formDepartment.status" :ui="{
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

const emits = defineEmits<{
    (e: 'dataDepartment', payload: DepartmentModel): void;
    (e: 'reset'): void;
}>()

const props = defineProps({
    formData: {
        type: Object as PropType<DepartmentModel>,
        required: true,
    },
})

const { formData } = toRefs(props)
const { $joi } = useNuxtApp()
const schema = $joi.object({
    department_name: $joi.string().required().messages({
        "any.required": `Department Name is Required`,
    }),
    status: $joi.boolean().optional(),
    department_id: $joi.number().optional()
})

const formDepartment = reactive<DepartmentModel>({
    department_name: '',
    status: false

})

const onSubmit = async (event: FormSubmitEvent<DepartmentModel>) => {
    emits('dataDepartment', event.data)
}


watch(
    formData,
    (newData) => {
        if (newData) {
            formDepartment.department_id = newData.department_id
            formDepartment.department_name = newData.department_name
            formDepartment.status = newData.status
        }
    },
    { deep: true, immediate: true }
);
</script>