<template>
  <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->

  <div class="grid grid-cols-5 gap-5">
    <div class="col-span-5 lg:col-span-2 xl:col-span-1">
      <UICard title="Examinee Information">
        <template #default>
          <ExamineeForm :isUpdate="isUpdate" :formData="data" @dataExaminee="submitExaminee" @reset="resetInstance">
          </ExamineeForm>
        </template>
      </UICard>

    </div>
    <div class="col-span-5 lg:col-span-3 xl:col-span-4">
      <UICard title="List of Examinee's">
        <template #default>
          <ExamineeList :examineeData="examinee" @update="editExaminee" @delete="removeExaminee"></ExamineeList>
        </template>
      </UICard>
    </div>
  </div>
</template>

<script setup>
const { setToast } = useToast()
const { setAlert } = useAlert()
const { createExaminee, updateExaminee, deleteExaminee } = useExaminee()
const data = ref({})
const isUpdate = ref(false)
const { data: examinee, status, error, refresh } = await useFetch('/api/examinee', {
  method: 'GET',
  transform: (_examinee) => {
    return _examinee.map((examinee) => {
      const fullname = examinee.first_name + ' ' + examinee.last_name + ' ' + examinee.middle_name[0] + '.';
      return {
        ...examinee,
        fullname
      }
    })
  },
  // lazy: true
});

/* Examinee */
const submitExaminee = async (data) => {
  try {
    if (!isUpdate.value) {
      const response = await createExaminee(data);
      setToast('success', response.message)
    } else {
      const response = await updateExaminee(data, data.examinee_id)
      setToast('success', response.message)
    }
    refresh();
    resetInstance();
  } catch (error) {
    console.log(error)
    setToast('error', error.statusMessage || 'An error occurred');
  }
}


const editExaminee = (response) => {
  data.value = {
    examinee_id: response.examinee_id,
    first_name: response.first_name,
    last_name: response.last_name,
    middle_name: response.middle_name,
    username: response.username
  }
  isUpdate.value = true
}

const removeExaminee = (id) => {
  setAlert('warning', 'Are you sure you want to delete?', '', 'Confirm delete').then(
    async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteExaminee(id);
          setToast('success', response.message);
          refresh();
        } catch (error) {
          setToast('error', error.statusMessage || 'An error occurred');
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