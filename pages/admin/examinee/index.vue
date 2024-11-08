<template>
  <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->

  <div class="grid grid-cols-5 gap-5">
    <div class="col-span-5 lg:col-span-2 xl:col-span-1">
      <UICard title="Examinee Information">
        <template #default>
          <ExamineeForm :is-update="isUpdate" :form-data="data" @data-examinee="submitExaminee" @reset="resetInstance">
          </ExamineeForm>
        </template>
      </UICard>

    </div>
    <div class="col-span-5 lg:col-span-3 xl:col-span-4">
      <UICard title="List of Examinee's">
        <template #default>
          <ExamineeList :examinee-data="examinee ?? []" @update="editExaminee" @delete="removeExaminee"></ExamineeList>
        </template>
      </UICard>
    </div>


  </div>


</template>

<script setup lang="ts">

definePageMeta({
  requiredRole: 'admin',
  // middleware: ['checkRole'],

})
useHead({
  title: 'Testify Examinee Module',
  meta: [
    { name: "description", content: 'CRUD for Examinee' },
    { property: "og:title", content: 'Testify Examinee Module' },
    { property: "og:description", content: 'CRUD for Examinee' },
  ],
});


const { setToast } = useToast()
const { setAlert } = useAlert()
const data = ref({})
const isUpdate = ref(false)
const config = useRuntimeConfig()
const shouldRefetch = ref(0);
const nuxtApp = useNuxtApp()
const { token } = useAuthentication()
const { data: examinee, status, error, refresh } = await useFetch<ExamineeModel[]>(`${config.public.baseURL}/examinee`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token.value}`,
  },
  transform: (_examinee) => {
    return _examinee.map((examinee) => {
      const fullname = examinee.first_name + ' ' + examinee.last_name + ' ' + (examinee.middle_name ? ' ' + examinee.middle_name[0] + '.' : '');
      return {
        ...examinee,
        fullname
      }
    })
  },
  watch: [shouldRefetch],
  getCachedData(key) {
    const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    //if first time load it will load the data
    if (!data) {
      return
    }
    return data;
  }
  // lazy: true
});



/* Examinee */
const submitExaminee = async (data: ExamineeModel) => {
  try {
    if (!isUpdate.value) {
      const response = await useFetchApi<ApiResponse<ExamineeModel>, ExamineeModel>(
        `${config.public.baseURL}/examinee`,
        Method.POST,
        data);
      setToast('success', response.message)
    } else {
      const response = await useFetchApi<ApiResponse<ExamineeModel>, ExamineeModel>(
        `${config.public.baseURL}/examinee/${data.examinee_id}`,
        Method.PUT,
        data);
      setToast('success', response.message)
    }
    shouldRefetch.value++;
    resetInstance();
  } catch (error: any) {
    setToast('error', error.data.error || 'An error occurred');
  }
}


const editExaminee = (response: ExamineeModel) => {
  data.value = {
    examinee_id: response.examinee_id,
    first_name: response.first_name,
    last_name: response.last_name,
    middle_name: response.middle_name,
    username: response.username
  }
  isUpdate.value = true
}

const removeExaminee = (id: number) => {
  setAlert('warning', 'Are you sure you want to delete?', '', 'Confirm delete').then(
    async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await useFetchApi<ApiResponse<ExamModel>, ExamModel>(
            `${config.public.baseURL}/exam/${id}`,
            Method.DELETE);
          setToast('success', response.message);
          shouldRefetch.value++;
        } catch (error: any) {
          setToast('error', error.data.error || 'An error occurred');
        }
      }
    }
  )
}



const resetInstance = () => {
  isUpdate.value = false
  data.value = {}
}





</script>