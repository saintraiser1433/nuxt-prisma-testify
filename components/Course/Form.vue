<template>
  <UForm :schema="schema" :state="formCourse" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Course Name" name="description" required>
      <UInput v-model="formCourse.description" />
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
import Joi from 'joi'
import type { FormSubmitEvent } from '#ui/types'
const emits = defineEmits<{
  (e: 'dataCourse', payload: CourseModel): void;
  (e: 'reset'): void;
}>();



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

const schema = Joi.object({
  description: Joi.string().required().messages({
    "any.required": `Department Name is Required`,
  }),
  score: Joi.number().required().messages({
    "any.required": `Score  is Required`,
  }),
  course_id: Joi.number().optional()
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