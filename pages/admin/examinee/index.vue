<template>
  <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->

  <div class="grid grid-cols-5 gap-5">
    <div class="col-span-5 lg:col-span-2 xl:col-span-1">
      <UICard class="py-2 px-4">
        <template #header>
          <UICardHeader>
            <h1 class="text-2xl lg:text-lg">Examinee Information</h1>
          </UICardHeader>
        </template>
        <ExamineeForm :is-update="isUpdate" :form-data="data" @data-examinee="submitExaminee" @reset="resetInstance" />
      </UICard>

    </div>
    <div class="col-span-5 lg:col-span-3 xl:col-span-4">
      <UICard class="py-2 px-4">
        <template #header>
          <UICardHeader>
            <h1 class="text-2xl lg:text-lg">List of Examinee's</h1>
          </UICardHeader>
        </template>
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
const shouldRefetch = ref(0);
const nuxtApp = useNuxtApp()
const examineeRepo = repository<ApiResponse<ExamineeModel>>(nuxtApp.$api)


const { data: examinee } = await useAPI<ExamineeModel[]>('/examinee', {
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
    if (!data) {
      return
    }
    return data;
  }
})



/* Examinee */
const submitExaminee = async (data: ExamineeModel) => {
  try {
    let response;
    if (!isUpdate.value) {
      response = await examineeRepo.addExaminee(data)
    } else {
      response = await examineeRepo.updateExaminee(data)
    }
    setToast('success', response.message)
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
          const response = await examineeRepo.removeExaminee(id);
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