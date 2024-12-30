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
    <UFormGroup label="Department" name="department_id" required>
      <USelect v-model="state.department_id" color="gray" :options="departmentData" :ui="{ base: 'capitalize' }"
        option-attribute="name" />
    </UFormGroup>
    <UFormGroup v-if="isUpdate" label="Status" name="status">
      <UToggle v-model="state.status" />
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
  (e: 'dataDeans', payload: DeansModel): void;
}>();

const props = defineProps({
  isUpdate: {
    type: Boolean,
    default: false
  },
  formData: {
    type: Object as PropType<DeansModel>,
    required: true,
  },
  departmentData: {
    type: Array as PropType<DepartmentSelection[]>,
    required: true,
  }
})

const { isUpdate, formData, departmentData } = toRefs(props)
const { $username, $password, $joi } = useNuxtApp();

const schema = $joi.object({
  deans_id: $joi.number().optional(),
  first_name: $joi.string().required().messages({
    "any.required": `First Name is Required`,
  }),
  last_name: $joi.string().required().messages({
    "any.required": `Last Name is Required`,
  }),
  middle_name: $joi.string().required().messages({
    "any.required": `Middle Name is Required`,
  }),
  department_id: $joi.number().empty().required().messages({
    "number.empty": `Department cannot be empty`,
    "any.required": `Department cannot be null or empty`,
  }),
  status: $joi.boolean().optional(),
  username: $joi.string().optional(),
  password: $joi.string().optional(),

})

const state = ref<DeansModel>({
  deans_id: 0,
  first_name: '',
  last_name: '',
  middle_name: '',
  department_id: 0,
  username: '',
  password: '',
  status: false
})


const onSubmit = async (event: FormSubmitEvent<DeansModel>) => {
  let data: DeansModel;
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
  emits('dataDeans', data)
}



watch(
  formData,
  (newData) => {
    if (newData) {
      state.value = { ...newData }
    }
  },
  { deep: true, immediate: true }
)
</script>
