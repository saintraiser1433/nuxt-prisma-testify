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
        base: 'overflow-hidden ',
        divide: 'divide-y divide-gray-200 dark:divide-gray-700',
        header: { padding: 'px-4 py-5', base: 'bg-darken' },
        body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700 dark:bg-darken' },
        footer: { padding: 'p-4' }
      }">
        <template #header>
          <h1 class="text-2xl lg:text-lg font-bold">List of Examinee's</h1>
        </template>

        <ExamineeList :examinee-data="transformData" @toggle-modal="toggleModal" @update="editExaminee"
          @delete="removeExaminee" />


      </UCard>
    </div>
  </div>



</template>

<script setup lang="ts">

definePageMeta({
  requiredRole: 'admin',
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
const examineeRepo = repository<ApiResponse<User>>($api)
const examineeData = ref<User[]>([])
const isOpen = ref(false);
const data = ref<User>({})

const { data: examinee, error, status } = await useAPI<User[]>('/examinee', {
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
  console.error(error.value)
  setToast('error', error.value?.data.message || 'An error occurred');
}

const transformData = computed(() => {
  return examineeData.value.map((item) => {
    const fullname = item.first_name + ' ' + item.last_name + (item.middle_name ? ' ' + item.middle_name[0] + '.' : '');
    return {
      ...item,
      fullname
    }
  })
})

const submitExaminee = async (response: User) => {
  console.log(response);
  try {
    if (!isUpdate.value) {
      const res = await examineeRepo.addExaminee(response);
      examineeData.value.unshift(res.data as User)
      setToast('success', res.message)
    } else {
      const res = await examineeRepo.updateExaminee(response);
      const index = examineeData.value.findIndex((item) => item.id === res.data?.id);
      examineeData.value[index] = { ...examineeData.value[index], ...res.data }
      setToast('success', res.message)
    }
    isOpen.value = false;
    isUpdate.value = false;

  } catch (error: any) {
    setToast('error', error.data.message || 'An error occurred');
  }
}

/* Examinee */

const toggleModal = () => {
  data.value = {}
  isOpen.value = true;
  isUpdate.value = false
}



const editExaminee = (response: User) => {
  console.log(response)
  data.value = {
    id: response.id,
    first_name: response.first_name,
    last_name: response.last_name,
    middle_name: response.middle_name,
  };
  isOpen.value = true;
  isUpdate.value = true
}

const removeExaminee = (id: string) => {
  setAlert('warning', 'Are you sure you want to delete?', '', 'Confirm delete').then(
    async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await examineeRepo.removeExaminee(id);
          const index = examineeData.value.findIndex((item) => item.id === id);
          examineeData.value.splice(index, 1);
          setToast('success', response.message);
        } catch (error: any) {
          setToast('error', error.data.message || 'An error occurred');
        }
      }
    }
  )
}




</script>