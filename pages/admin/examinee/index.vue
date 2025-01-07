<template>
  <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->
  <UModal v-model="isOpen" prevent-close>
    <UICard :body="{
      padding: 'px-4'
    }">
      <template #header>
        <div class="flex items-center justify-between ">
          <h1 class="text-2xl lg:text-lg font-semibold">Examinee Information</h1>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
            @click="isOpen = false" />
        </div>

      </template>
      <ExamineeForm v-model="examineeForm" :is-update="isUpdate" @data-examinee="submitExaminee" />
    </UICard>

  </UModal>

  <div class="grid grid-cols-5 gap-5">
    <div class="col-span-5">
      <UICard>
        <template #header>
          <h1 class="text-2xl lg:text-lg  font-semibold">List of Examinee's</h1>
        </template>
        <ExamineeList :is-loading="status" :examinee-data="transformData" @toggle-modal="toggleModal"
          @update="editExaminee" @delete="removeExaminee" />
      </UICard>

    </div>
  </div>


</template>

<script setup lang="ts">

definePageMeta({
  requiredRole: 'admin',
})

useSeoMeta({
  title: 'Testify Examinee Module',
  description: 'CRUD for Examinee',
  ogTitle: 'Testify Examinee Module',
  ogDescription: 'CRUD for Examinee'
});

const { $api, payload, static: stat } = useNuxtApp()
const { setToast } = useToasts();
const { setAlert } = useAlert();


//fetch Examinee
const status = ref(false);
const examineeData = ref<User[]>([])




const fetchExaminee = async () => {
  status.value = true;
  try {
    const { data, error } = await useAPI<User[]>('/examinee', {
      getCachedData(key) {
        const data = payload.data[key] || stat.data[key]
        return data;
      },
      server: false
    })

    if (error.value) {
      throw new Error(error.value.message || 'Failed to fetch items')
    }

    examineeData.value = data.value || [];
  } catch (error) {
    setToast('error', error instanceof Error ? error.message : 'An unexpected error occurred')
  } finally {
    status.value = false;
  }
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

await fetchExaminee();


//submit examinee
const initialState = {
  id: undefined,
  first_name: "",
  last_name: "",
  middle_name: ""
};
const examineeForm = reactive<User>({ ...initialState })
const examineeRepo = repository<ApiResponse<User>>($api)
const submitExaminee = async (response: User) => {
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


const editExaminee = (response: User) => {
  examineeForm.id = response.id
  examineeForm.first_name = response.first_name
  examineeForm.last_name = response.last_name
  examineeForm.middle_name = response.middle_name
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

//utils
const isOpen = ref(false);
const isUpdate = ref(false);

const resetForm = () => {
  Object.assign(examineeForm, initialState);
}
const toggleModal = () => {
  resetForm()
  isOpen.value = true;
  isUpdate.value = false
}




</script>