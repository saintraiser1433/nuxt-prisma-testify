<template>
  <UForm :schema="schema" :state="formCourse" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Course Name" name="description" required>
      <UInput v-model="formCourse.description" color="gray" :ui="{ base: 'capitalize' }" />
    </UFormGroup>
    <UFormGroup label="Score" name="score" required>
      <UInput type="number" color="gray" v-model.number="formCourse.score" />
    </UFormGroup>
    <UButton type="submit" block color="gray" size="md" :ui="{
      color: {
        gray: {
          solid: 'bg-primary-500 hover:bg-primary-600 dark:bg-primary-500 text-white hover:dark:bg-primary-600'
        }
      }
    }">
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

const formCourse = reactive<CourseModel>({
  description: '',
  score: 0
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
      formCourse.course_id = newData.course_id
      formCourse.description = newData.description
      formCourse.score = newData.score
    }
  },
  { deep: true, immediate: true }
);
</script>