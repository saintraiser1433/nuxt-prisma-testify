<template>
  <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->
  <UModal v-model="isOpen">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <h1 class="text-2xl lg:text-lg">Examinee Information</h1>
      </template>
      <ExamineeForm :form-data="data" :is-update="isUpdate" @data-examinee="submitExaminee"></ExamineeForm>
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
          <h1 class="text-2xl lg:text-lg">List of Examinee's</h1>
        </template>

        <ExamineeList :examinee-data="examineeData" :status="status" @modal-open="toggleModal" @update="editExaminee"
          @delete="removeExaminee"></ExamineeList>
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
  title: 'Testify Examinee Module',
  meta: [
    { name: "description", content: 'CRUD for Examinee' },
    { property: "og:title", content: 'Testify Examinee Module' },
    { property: "og:description", content: 'CRUD for Examinee' },
  ],
});



const { $api, payload, static: stat } = useNuxtApp()
const { setToast } = useToasts();
const isUpdate = ref(false);
const { setAlert } = useAlert()
const examineeRepo = repository<ApiResponse<ExamineeModel>>($api)
const examineeData = ref<ExamineeModel[]>([])
const isOpen = ref(false);
const data = ref<ExamineeModel>({})

const { data: examinee, error, status } = await useAPI<ExamineeModel[]>('/examinee', {
  getCachedData(key) {
    const data = payload.data[key] || stat.data[key]
    if (!data) {
      return
    }
    return data;
  },

})

if (examinee && examinee.value) {
  examineeData.value = examinee.value;
} else {
  setToast('error', error.value?.message || 'An error occurred');
}

const submitExaminee = async (response: ExamineeModel) => {
  try {
    if (!isUpdate.value) {
      const res = await examineeRepo.addExaminee(response);
      examineeData.value.unshift(res.data as ExamineeModel)
      setToast('success', res.message)
    } else {
      const res = await examineeRepo.updateExaminee(response);
      const index = examineeData.value.findIndex((item) => item.examinee_id === res.data?.examinee_id);
      examineeData.value[index] = { ...examineeData.value[index], ...res.data }
      setToast('success', res.message)
    }
    isOpen.value = false;
    isUpdate.value = false;

  } catch (error: any) {
    setToast('error', error.data.error || 'An error occurred');
  }
}

/* Examinee */

const toggleModal = () => {
  data.value = {}
  isOpen.value = true;
  isUpdate.value = false
}



const editExaminee = (response: ExamineeModel) => {
  data.value = {
    examinee_id: response.examinee_id,
    first_name: response.first_name,
    last_name: response.last_name,
    middle_name: response.middle_name,
    username: response.username,
  };
  isOpen.value = true;
  isUpdate.value = true
}

const removeExaminee = (id: number) => {
  setAlert('warning', 'Are you sure you want to delete?', '', 'Confirm delete').then(
    async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await examineeRepo.removeExaminee(id);
          const index = examineeData.value.findIndex((item) => item.examinee_id === id);
          examineeData.value.splice(index, 1);
          setToast('success', response.message);
        } catch (error: any) {
          setToast('error', error.data.error || 'An error occurred');
        }
      }
    }
  )
}




</script>