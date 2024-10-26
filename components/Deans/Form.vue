<template>
  <form @submit.prevent="submitDeans">
    <div class="mb-3">
      <label class="text-sm" for="firstname">First Name</label>
      <UIInput type="text" id="firstname" v-model="formDeans.first_name" required />
    </div>
    <div class="mb-3">
      <label class="text-sm" for="middlename">Middle Name</label>
      <UIInput type="text" id="middlename" v-model="formDeans.middle_name" required />
    </div>
    <div class="mb-3">
      <label class="text-sm" for="lastname">Last Name</label>
      <UIInput type="text" id="lastname" v-model="formDeans.last_name" required />
    </div>
    <div class="mb-3">
      <label class="text-sm" for="department">Department</label>
      <UISelector id="department" :data="departmentList" v-model.number="formDeans.department_id" />
    </div>
    <div class="mb-3 flex gap-2 items-center">
      <label class="text-sm" for="status">Status:</label>
      <UISwitch id="status" v-model="formDeans.status"></UISwitch>
    </div>
    <div class="border-t border-colorBorder pt-2">
      <UIButton type="button" v-if="isUpdate" class="bg-danger mb-2" size="block" @click="reset">Reset</UIButton>
      <UIButton type="submit" class="bg-primary" size="block">{{
        isUpdate ? 'Update' : 'Submit'
      }}</UIButton>

    </div>
  </form>
</template>

<script setup>
import { toRefs, ref, watch, computed } from 'vue'
import { useGenerateRandom } from '@/composables/useGenerateRandom'
const emits = defineEmits(['dataDeans', 'reset'])
const props = defineProps({
  isUpdate: {
    type: Boolean,
    default: false
  },
  formData: {
    type: Object
  },
  departmentData: {
    type: Object
  }
})
const { generateRandomString } = useGenerateRandom(8)
const { isUpdate, formData, departmentData } = toRefs(props)

const formDeans = ref({
  first_name: '',
  middle_name: '',
  last_name: '',
  department_id: null,
  status: true
})

const departmentList = computed(() => {
  return departmentData.value
    .filter((item) => item.status)
    .map((i) => {
      return {
        id: i.department_id,
        value: i.department_name
      }
    })
})

const submitDeans = () => {
  let data
  if (!isUpdate.value) {
    data = {
      ...formDeans.value,
      username: generateRandomString(),
      password: generateRandomString()
    }
  } else {
    data = {
      ...formDeans.value
    }
  }

  emits('dataDeans', data)
}

const reset = () => {
  emits('reset')
}

watch(
  formData,
  (newData) => {
    if (newData) {
      formDeans.value = { ...newData }
    }
  },
  { deep: true }
)
</script>
