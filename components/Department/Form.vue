<template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Department Name" name="department_name" required>
            <UInput v-model="state.department_name" />
        </UFormGroup>
        <UFormGroup label="Status" name="status" >
            <UToggle v-model="state.status" />
        </UFormGroup>
        <UButton type="submit" block>
            Submit
        </UButton>
    </UForm>
</template>

<script setup lang="ts">
import Joi from 'joi'
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

const schema = Joi.object({
    department_name: Joi.string().required().messages({
        "any.required": `Department Name is Required`,
    }),
    status: Joi.boolean().optional(),
    department_id: Joi.number().optional()
})

const state = ref<DepartmentModel>({
    department_id: undefined,
    department_name: undefined,
    status: undefined

})

const onSubmit = async (event: FormSubmitEvent<DepartmentModel>) => {
    emits('dataDepartment', event.data)
}


watch(
    formData,
    (newData) => {
        if (newData) {
            state.value = { ...newData }
        }
    },
    { deep: true, immediate: true }
);
</script>