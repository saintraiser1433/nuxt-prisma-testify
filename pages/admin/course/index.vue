<template>
  <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->

  <div class="grid grid-cols-5 gap-5">
    <div class="col-span-5 lg:col-span-2 xl:col-span-1">
      <UICard>
        <template #header>
          <UICardHeader>
            <div class="">
              <h1 class="text-2xl lg:text-lg">Course Information</h1>
            </div>
          </UICardHeader>
        </template>
        <template #default>
          <CourseForm :is-update="isUpdate" :form-data="data" @data-course="submitCourse" @reset="resetInstance"/>
        </template>
      </UICard>
    </div>
    <div class="col-span-5 lg:col-span-3 xl:col-span-4">
      <UICard>
        <template #header>
          <UICardHeader>
            <div class="">
              <h1 class="text-2xl lg:text-lg">List of Course's</h1>
            </div>
          </UICardHeader>
        </template>
        <template #default>
          <CourseList :course-data="course ?? []" @update="editCourse" @delete="removeCourse"/>
        </template>
      </UICard>
    </div>
  </div>
</template>

<script setup lang="ts">




definePageMeta({
  requiredRole: "admin",
  // middleware: ['checkRole'],
});
useHead({
  title: "Testify Course Module",
  meta: [
    { name: "description", content: "CRUD for Course" },
    { property: "og:title", content: "Testify Course Module" },
    { property: "og:description", content: "CRUD for Course" },
  ],
});
const { setToast } = useToast();
const { setAlert } = useAlert();
const isUpdate = ref(false);
const shouldRefetch = ref(0);
const nuxtApp = useNuxtApp();
const courseRepo = repository<ApiResponse<CourseModel>>(nuxtApp.$api)
const data = ref<CourseModel>({
  description: '',
  score: 0,
});


const { data: course, status, error } = await useAPI<CourseModel[]>('/course', {
  watch: [shouldRefetch],
  getCachedData(key) {
    const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    if (!data) {
      return
    }
    return data;
  }
})

/* Course */
const submitCourse = async (data: CourseModel): Promise<void> => {
  try {
    let response;
    if (!isUpdate.value) {
      response = await courseRepo.addCourse(data);
    } else {
      response = await courseRepo.updateCourse(data);
    }
    setToast("success", response.message);
    shouldRefetch.value++;
    resetInstance();
  } catch (error: any) {
    console.log(error);
    setToast("error", error.data.error || "An error occurred");
  }
};

const editCourse = (response: CourseModel) => {
  data.value = response;
  isUpdate.value = true;
};

const removeCourse = (id: number) => {
  setAlert(
    "warning",
    "Are you sure you want to delete?",
    "",
    "Confirm delete"
  ).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await courseRepo.deleteCourse(id)
        setToast("success", response.message);
        shouldRefetch.value++;
      } catch (error: any) {
        setToast("error", error.data.error || "An error occurred");
      }
    }
  });
};

const resetInstance = () => {
  isUpdate.value = false;
  data.value = {
    description: '',
    score: 0,
  };
};
</script>