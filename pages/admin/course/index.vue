<template>
  <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->
  <UModal v-model="isOpen" prevent-close>
    <UICard :body="{
      padding: 'p-10'
    }">
      <template #header>
        <div class="flex items-center justify-between">
          <h1 class="text-2xl lg:text-lg font-semibold">Course Information</h1>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
            @click="isOpen = false" />
        </div>
      </template>
      <CourseForm :form-data="data" :is-update="isUpdate" @data-course="submitCourse"></CourseForm>
    </UICard>
  </UModal>

  <div class="grid grid-cols-5 gap-5">
    <div class="col-span-5">
      <UICard>
        <template #header>
          <h1 class="text-2xl lg:text-lg font-semibold">List of Course's</h1>
        </template>
        <CourseList :course-data="courseData" @update="editCourse" @delete="removeCourse" @toggleModal="toggleModal" />
      </UICard>
    </div>
  </div>




</template>

<script setup lang="ts">
definePageMeta({
  requiredRole: 'admin',
})

useSeoMeta({
  title: 'Testify Course Module',
  description: 'CRUD for course',
  ogTitle: 'Testify course Module',
  ogDescription: 'CRUD for course'
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
  setToast('error', error.value?.data.message || 'An error occurred');
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
    setToast('error', error.data.message || 'An error occurred');
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
          setToast('error', error.data.message || 'An error occurred');
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