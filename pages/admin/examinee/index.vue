<template>
  <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->
  <UModal v-model="isOpen">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <h1 class="text-2xl lg:text-lg">Examinee Information</h1>
      </template>
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="First Name" name="first_name" required>
          <UInput v-model="state.first_name" />
        </UFormGroup>
        <UFormGroup label="Last Name" name="last_name" required>
          <UInput v-model="state.last_name" />
        </UFormGroup>
        <UFormGroup label="Middle Name" name="middle_name" required>
          <UInput v-model="state.middle_name" />
        </UFormGroup>
        <UButton type="submit" block>
          Submit
        </UButton>
        <!-- <ExamineeForm :is-update="isUpdate" :form-data="data" @data-examinee="submitExaminee" @reset="resetInstance" /> -->
      </UForm>
    </UCard>
  </UModal>

  <div class="grid grid-cols-5 gap-5">
    <!-- <div class="col-span-5 lg:col-span-2 xl:col-span-1">
      <UCard>
        <template #header>
          <h1 class="text-2xl lg:text-lg">Examinee Information</h1>
        </template>
<ExamineeForm :is-update="isUpdate" :form-data="data" @data-examinee="submitExaminee" @reset="resetInstance" />

</UCard>
</div> -->
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



        <div class="flex items-center justify-between gap-3 px-4 py-3">

          <UInput v-model="search" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." />
          <UButton icon="i-heroicons-plus" color="emerald" size="md" @click="isOpen = true">
            Add Examinee
          </UButton>
        </div>
        <!-- Header and Action buttons -->
        <div class="flex justify-between items-center w-full px-4 py-3">
          <div class="flex items-center gap-1.5">
            <span class="text-sm leading-5">Rows per page:</span>
            <USelect v-model="pageCount" :options="[3, 5, 10, 20, 30, 40]" class="me-2 w-20" size="xs" />
          </div>
          <div class="flex gap-1.5 items-center">
            <USelectMenu v-model="selectedColumns" :options="excludeSelectColumn" multiple>
              <UButton icon="i-heroicons-view-columns" color="gray" size="xs">
                Columns
              </UButton>
            </USelectMenu>
          </div>
        </div>

        <UTable :rows="examinee" :columns="columnsTable" :ui="{
          td: {
            padding: 'px-4 py-2'
          }
        }">
          <template #empty-state>
            <div class="flex flex-col items-center justify-center py-6 gap-3">
              <span class="italic text-sm">NO DATA FOUND</span>
            </div>
          </template>
          <template #id-data="{ row, index }">
            <span>{{ index + 1 }}</span>
          </template>
          <template #actions-data="{ row }">
            <div class="flex gap-1 items-center">
              <UButton color="emerald" size="sm" @click="editExaminee(row)"><i-bx-edit /></UButton>
              <UButton color="carnation" size="sm" @click="removeExaminee(row.examinee_id)">
                <i-icon-park-solid-people-delete />
              </UButton>
            </div>
          </template>
        </UTable>
        <!-- Number of rows & Pagination -->
        <template #footer>
          <div class="flex flex-wrap justify-between items-center">
            <div>
              <span class="text-sm leading-5">
                Showing
                <span class="font-medium">{{ pageFrom }}</span>
                to
                <span class="font-medium">{{ pageTo }}</span>
                of
                <span class="font-medium">{{ pageTotal }}</span>
                results
              </span>
            </div>

            <UPagination v-model="page" :page-count="Number(pageCount)" :total="pageTotal" :ui="{
              wrapper: 'flex items-center gap-1',
              rounded: '!rounded-full min-w-[32px] justify-center',
              default: {
                activeButton: {
                  variant: 'outline'
                }
              }
            }" />
          </div>
        </template>
      </UCard>

    </div>
  </div>
  <!-- <div class="grid grid-cols-5 gap-5">
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


</div> -->


</template>

<script setup lang="ts">
import Joi from 'joi'
import type { FormSubmitEvent } from '#ui/types'
const columns = [{
  key: 'id',
  label: '#',
  sortable: true
}, {
  key: 'fullname',
  label: 'Fullname',
  sortable: true
}, {
  key: 'username',
  label: 'Username',
  sortable: true
}, {
  key: 'actions',
  label: 'Actions',
  sortable: false

}]
const search = ref('')
const sort = ref({ column: 'first_name', direction: 'asc' as const })
const page = ref(1)
const pageCount = ref(10)
const pageTotal = ref(200) // This value should be dynamic coming from the API
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1)
const pageTo = computed(() => Math.min(page.value * pageCount.value, pageTotal.value))


const selectedColumns = ref(columns)
const columnsTable = computed(() => columns.filter(column => selectedColumns.value.includes(column)))
const excludeSelectColumn = computed(() => columns.filter(v => v.key !== 'select'))

const isOpen = ref(false)


const schema = Joi.object({
  first_name: Joi.string().required().messages({
    "any.required": `First Name is Required`,
  }),
  last_name: Joi.string().required().messages({
    "any.required": `Last Name is Required`,
  }),
  middle_name: Joi.string().required().messages({
    "any.required": `Middle Name is Required`,
  }),
  username: Joi.string().optional(),
  password: Joi.string().optional(),
  examinee_id: Joi.number().optional()
})
const nuxtApp = useNuxtApp()
const examineeRepo = repository<ApiResponse<ExamineeModel>>(nuxtApp.$api)
const state = reactive<any>({
  examinee_id: undefined,
  first_name: undefined,
  last_name: undefined,
  middle_name: undefined,
  username: nuxtApp.$id,
  password: nuxtApp.$id,
})





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


const { setToast } = useToasts()
const { setAlert } = useAlert()
const isUpdate = ref(false)
const shouldRefetch = ref(0);



const { data: examinee, status } = await useLazyAsyncData<ExamModel[]>('examinee',
  () => nuxtApp.$api('/examinee', {
    query: {
      q: search.value,
      _page: page.value,
      _limit: pageCount.value,
      _sort: sort.value.column,
      _order: sort.value.direction
    }
  }),
  {
    default: () => [],
    transform: (_examinee: any) => {
      return _examinee.map((examinee:any) => {
        const fullname = examinee.data.first_name + ' ' +
          examinee.data.last_name +
          (examinee.data.middle_name ? ' ' + examinee.data.middle_name[0] + '.' : '');
        return {
          ...examinee.data,
          fullname,
          ...examinee.totalPages
          
        }
      })
    },
    getCachedData(key) {
      const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
      if (!data) {
        return
      }
      return data;
    },
    watch: [shouldRefetch, page, search, pageCount, sort]
  })



/* Examinee */
const onSubmit = async (event: FormSubmitEvent<ExamineeModel>) => {
  let response;
  if (!isUpdate.value) {
    response = await examineeRepo.addExaminee(event.data);
  } else {
    response = await examineeRepo.updateExaminee(event.data)
  }
  setToast('success', response.message)
  shouldRefetch.value++;
  resetInstance();
  isOpen.value = false;

}

const resetInstance = () => {
  isUpdate.value = false
  state.examinee_id = undefined;
  state.first_name = undefined;
  state.last_name = undefined;
  state.middle_name = undefined;
}


const editExaminee = (response: ExamineeModel) => {
  console.log(response);
  state.examinee_id = response.examinee_id;
  state.first_name = response.first_name;
  state.last_name = response.last_name;
  state.middle_name = response.middle_name;
  isOpen.value = true;
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









</script>