<template>
  <UForm :schema="schema" :state="formCourse" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Course Name" name="description" required>
      <UInput v-model="formCourse.description" :ui="{ base: 'capitalize' }" />
    </UFormGroup>
    <UFormGroup label="Score" name="score" required>
      <UInput type="number" v-model.number="formCourse.score" />
    </UFormGroup>
    <UButton type="submit" block>
      Submit
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
const emits = defineEmits<{
  (e: 'dataCourse', payload: CourseModel): void;
  (e: 'reset'): void;
}>();

const { $joi } = useNuxtApp()

const props = defineProps({
  formData: {
    type: Object as PropType<CourseModel>,
    required: true,
  },
});

const { formData } = toRefs(props);

const formCourse = ref<CourseModel>({
  course_id: undefined,
  description: undefined,
  score: undefined
});

const schema = $joi.object({
  description: $joi.string().required().messages({
    "any.required": `Department Name is Required`,
  }),
  score: $joi.number().required().messages({
    "any.required": `Score  is Required`,
  }),
  course_id: $joi.number().optional()
})


const onSubmit = async (event: FormSubmitEvent<CourseModel>) => {
  emits('dataCourse', event.data)
}

watch(
  formData,
  (newData) => {
    if (newData) {
      formCourse.value = { ...newData };
    }
  },
  { deep: true, immediate: true }
);
</script>