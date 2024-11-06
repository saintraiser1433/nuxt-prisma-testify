<template>
  <form @submit.prevent="submitCourse">
    <div class="mb-2">
      <label class="text-sm" for="course">Course:</label>
      <UIInput type="text" id="course" v-model="formCourse.description" required />
    </div>
    <div class="mb-2">
      <label class="text-sm" for="score">Score Attained:</label>
      <UIInput type="number" id="score" v-model="formCourse.score" required />
    </div>
    <div class="border-t dark:border-colorBorder pt-2">
      <UIButton type="button" v-if="isUpdate" class="bg-danger mb-2" size="block" @click="reset">Reset</UIButton>
      <UIButton type="submit" class="bg-primary" size="block">{{
        isUpdate ? "Update" : "Submit"
      }}</UIButton>
    </div>
  </form>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  (e: 'dataCourse', payload: CourseModel): void;
  (e: 'reset'): void;
}>();



const props = defineProps({
  isUpdate: {
    type: Boolean,
    default: false,
  },
  formData: {
    type: Object as PropType<CourseModel>,
    required: true,
  },
});

const { isUpdate, formData } = toRefs(props);

const formCourse = ref<CourseModel>({
  description: "",
  score: 0,
});

const reset = () => {
  emits("reset");
};

const submitCourse = () => {
  emits("dataCourse", { ...formCourse.value });
};

watch(
  formData,
  (newData) => {
    if (newData) {
      formCourse.value = { ...newData };
    }
  },
  { deep: true }
);
</script>