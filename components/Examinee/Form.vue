<template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="First Name" name="first_name" required>
            <UInput v-model="state.first_name" color="gray" :ui="{ base: 'capitalize' }" />
        </UFormGroup>
        <UFormGroup label="Last Name" name="last_name" required>
            <UInput v-model="state.last_name" color="gray" :ui="{ base: 'capitalize' }" />
        </UFormGroup>
        <UFormGroup label="Middle Name" name="middle_name" required>
            <UInput v-model="state.middle_name" color="gray" :ui="{ base: 'capitalize' }" />
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
    (e: 'dataExaminee', payload: User): void;
    (e: 'reset'): void;
}>()

const props = defineProps({
    formData: {
        type: Object as PropType<User>,
        required: true,
    },
    isUpdate: {
        type: Boolean,
        required: true
    }
})

const { formData, isUpdate } = toRefs(props)
const { $username, $password, $joi } = useNuxtApp();


const schema = $joi.object({
    first_name: $joi.string().required().messages({
        "any.required": `First Name is Required`,
    }),
    last_name: $joi.string().required().messages({
        "any.required": `Last Name is Required`,
    }),
    middle_name: $joi.string().required().messages({
        "any.required": `Middle Name is Required`,
    }),
    username: $joi.string().optional(),
    password: $joi.string().optional(),
    id: $joi.string().optional()
})

const state = ref<User>({
    id: undefined,
    first_name: undefined,
    last_name: undefined,
    middle_name: undefined,

})

const onSubmit = async (event: FormSubmitEvent<User>) => {
    let data: User;
    if (!isUpdate.value) {
        data = {
            ...event.data,
            username: $username(),
            password: $password()
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