<template>
  <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->

  <div class="grid grid-cols-5 gap-5">
    <div class="col-span-5 lg:col-span-2 xl:col-span-1">
      <UICard title="Course Information">
        <template #default>
          <CourseForm :isUpdate="isUpdate" :formData="data" @dataCourse="submitCourse" @reset="resetInstance">
          </CourseForm>
        </template>
      </UICard>
    </div>
    <div class="col-span-5 lg:col-span-3 xl:col-span-4">
      <UICard title="List of Course's">
        <template #default>
          <CourseList :courseData="course ?? []" @update="editCourse" @delete="removeCourse">
          </CourseList>
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
const data = ref<CourseModel>({
  description: '',
  score: 0,
});
const isUpdate = ref(false);
const config = useRuntimeConfig();
const { token } = useAuthentication()


const {
  data: course,
  status,
  error,
  refresh,
} = await useFetch<CourseModel[]>(`${config.public.baseURL}/course`, {
  method: "GET",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  lazy: true
},

);

/* Course */
const submitCourse = async (data: CourseModel): Promise<void> => {
  try {

    if (!isUpdate.value) {

      const response = await useFetchApi<ApiResponse<CourseModel>, CourseModel>(
        `${config.public.baseURL}/course`,
        Method.POST,
        data);
      setToast("success", response.message);
    } else {
      const response = await useFetchApi<ApiResponse<CourseModel>, CourseModel>(
        `${config.public.baseURL}/course/${data.course_id}`,
        Method.PUT,
        data);

      setToast("success", response.message);
    }

  } catch (error: any) {
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
        const response = await useFetchApi<ApiResponse<CourseModel>, CourseModel>(
          `${config.public.baseURL}/course/${id}`,
          Method.DELETE,
        );
        setToast("success", response.message);
        await refresh();
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