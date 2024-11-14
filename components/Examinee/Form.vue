<template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="First Name" name="first_name" required>
            <UInput v-model="state.first_name" />
        </UFormGroup>
        <UFormGroup label="Last Name" name="last_name" required>
            <UInput v-model="state.last_name" />
        </UFormGroup>
        <UFormGroup label="Middle Name" name="middle_name" required>
            <UInput v-model="state.middle_name" />
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
    (e: 'dataExaminee', payload: ExamineeModel): void;
    (e: 'reset'): void;
}>()

const props = defineProps({
    formData: {
        type: Object as PropType<ExamineeModel>,
        required: true,
    },
    isUpdate: {
        type: Boolean,
        required: true
    }
})

const { formData, isUpdate } = toRefs(props)
const { $id } = useNuxtApp();

const schema = Joi.object({
    first_name: Joi.string().required().messages({
        "any.required": `First Name is Required`,
    }),
    last_name: Joi.string().required().messages({
        "any.required": `Last Name is Required`,
    }),
    middle_name: Joi.string().required().messages({
        "any.required": `Middle Name is Required`,
    }),
    username: Joi.string().optional(),
    password: Joi.string().optional(),
    examinee_id: Joi.number().optional()
})

const state = ref<ExamineeModel>({
    examinee_id: undefined,
    first_name: undefined,
    last_name: undefined,
    middle_name: undefined,

})

const onSubmit = async (event: FormSubmitEvent<ExamineeModel>) => {
    let data: ExamineeModel;
    if (!isUpdate.value) {
        data = {
            ...event.data,
            username: $id,
            password: $id
        }
    } else {
        data = {
            ...event.data
        }
    }
    emits('dataExaminee', data)
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