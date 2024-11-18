<template>
  <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->
  <UModal v-model="isOpen">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <h1 class="text-2xl lg:text-lg">Course Information</h1>
      </template>
      <CourseForm :form-data="data" :is-update="isUpdate" @data-course="submitCourse"></CourseForm>
    </UCard>
  </UModal>

  <div class="grid grid-cols-5 gap-5">
    <div class="col-span-5">
      <UCard class="w-full" :ui="{
        base: '',
        ring: '',
        divide: 'divide-y divide-gray-200 dark:divide-gray-700',
        header: { padding: 'px-4 py-5' },
        body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
        footer: { padding: 'p-4' }
      }">
        <template #header>
          <h1 class="text-2xl lg:text-lg">List of Course's</h1>
        </template>
        <CourseList :course-data="courseData" @update="editCourse" @delete="removeCourse" @toggleModal="toggleModal" />
      </UCard>
    </div>
  </div>



</template>

<script setup lang="ts">
definePageMeta({
  requiredRole: 'admin',
  // middleware: ['checkRole'],
})
useHead({
  title: 'Testify course Module',
  meta: [
    { name: "description", content: 'CRUD for course' },
    { property: "og:title", content: 'Testify course Module' },
    { property: "og:description", content: 'CRUD for course' },
  ],
});





const { $api, payload, static: stat } = useNuxtApp()
const { setToast } = useToasts();
const isUpdate = ref(false);
const { setAlert } = useAlert()
const courseRepo = repository<ApiResponse<CourseModel>>($api)
const courseData = ref<CourseModel[]>([])
const isOpen = ref(false);
const data = ref<CourseModel>({})

/* course */
const { data: course, error, status } = await useAPI<CourseModel[]>('/course', {
  getCachedData(key) {
    const data = payload.data[key] || stat.data[key]
    if (!data) {
      return
    }
    return data;
  },

})

if (course && course.value) {
  courseData.value = course.value;
} else {
  setToast('error', error.value?.message || 'An error occurred');
}



const submitCourse = async (response: CourseModel) => {
  try {
    if (!isUpdate.value) {
      const res = await courseRepo.addCourse(response);
      courseData.value.unshift(res.data as CourseModel)
      setToast('success', res.message)
    } else {
      const res = await courseRepo.updateCourse(response);
      const index = courseData.value.findIndex((item) => item.course_id === res.data?.course_id);
      courseData.value[index] = { ...courseData.value[index], ...res.data }
      setToast('success', res.message)
    }
    isOpen.value = false;
    isUpdate.value = false;

  } catch (error: any) {
    setToast('error', error.data.error || 'An error occurred');
  }
}


const editCourse = (response: CourseModel) => {
  data.value = {
    course_id: response.course_id,
    description: response.description,
    score: response.score,
  };
  isOpen.value = true;
  isUpdate.value = true
}

const removeCourse = (id: number) => {
  setAlert('warning', 'Are you sure you want to delete?', '', 'Confirm delete').then(
    async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await courseRepo.removeCourse(id);
          const index = courseData.value.findIndex((item) => item.course_id === id);
          courseData.value.splice(index, 1);
          setToast('success', response.message);
        } catch (error: any) {
          setToast('error', error.data.error || 'An error occurred');
        }
      }
    }
  )
}

const toggleModal = () => {
  data.value = {}
  isOpen.value = true;
  isUpdate.value = false
}




</script>