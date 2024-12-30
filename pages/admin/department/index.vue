<template>
    <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->
    <UModal v-model="isOpen" prevent-close>
        <UICard :body="{
            padding: 'px-4'
        }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h1 class="text-2xl lg:text-lg font-semibold">Department Information</h1>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="isOpen = false" />
                </div>

            </template>
            <DepartmentForm v-model="departmentForm" @data-department="submitDepartment" />
        </UICard>
    </UModal>

    <div class="grid grid-cols-5 gap-5">
        <div class="col-span-5">
            <UICard>
                <template #header>
                    <h1 class="text-2xl lg:text-lg font-semibold">List of Department's</h1>
                </template>
                <DepartmentList :is-loading="status" :department-data="departmentData" @update="editDepartment"
                    @delete="removeDepartment" @toggle-modal="toggleModal" />
            </UICard>
        </div>
    </div>



</template>

<script setup lang="ts">

definePageMeta({
    requiredRole: 'admin',
})

useSeoMeta({
    title: 'Testify Department Module',
    description: 'CRUD for Department',
    ogTitle: 'Testify Department Module',
    ogDescription: 'CRUD for Department'
});

const { $api, payload, static: stat } = useNuxtApp()
const { setToast } = useToasts();
const { setAlert } = useAlert()


//fetch department
const status = ref(false);
const departmentData = ref<DepartmentModel[]>([])
const fetchDepartment = async () => {
    status.value = true;
    try {
        const { data: department, error: errordept } = await useAPI<DepartmentModel[]>('/department', {
            getCachedData(key) {
                const data = payload.data[key] || stat.data[key]
                return data;
            },
        })

        if (errordept.value) {
            throw new Error(errordept.value.message || 'Failed to fetch items')
        }

        departmentData.value = department.value || [];
    } catch (error) {
        setToast('error', error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
        status.value = false;
    }
}

await fetchDepartment()


//submit department
const initialState = {
    department_id: undefined,
    department_name: "",
    status: false,
};
const departmentForm = reactive<DepartmentModel>({ ...initialState })
const departmentRepo = repository<ApiResponse<DepartmentModel>>($api)
const submitDepartment = async (response: DepartmentModel) => {
    try {
        if (!isUpdate.value) {
            const res = await departmentRepo.addDepartment(response);
            departmentData.value.unshift(res.data as DepartmentModel)
            setToast('success', res.message)
        } else {
            const res = await departmentRepo.updateDepartment(response);
            const index = departmentData.value.findIndex((item) => item.department_id === res.data?.department_id);
            departmentData.value[index] = { ...departmentData.value[index], ...res.data }
            setToast('success', res.message)
        }
        isOpen.value = false;
        isUpdate.value = false;

    } catch (error: any) {
        setToast('error', error.data.message || 'An error occurred');
    }
}

const editDepartment = (response: DepartmentModel) => {
    departmentForm.department_id = response.department_id
    departmentForm.department_name = response.department_name
    departmentForm.status = response.status
    isOpen.value = true
    isUpdate.value = true
}

const removeDepartment = (id: number) => {
    setAlert('warning', 'Are you sure you want to delete?', '', 'Confirm delete').then(
        async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await departmentRepo.removeDepartment(id);
                    const index = departmentData.value.findIndex((item) => item.department_id === id);
                    departmentData.value.splice(index, 1);
                    setToast('success', response.message);
                } catch (error: any) {
                    setToast('error', error.data.message || 'An error occurred');
                }
            }
        }
    )
}




/* utils */
const isUpdate = ref(false);
const isOpen = ref(false);
const resetForm = () => {
    Object.assign(departmentForm, initialState);
}

const toggleModal = () => {
    resetForm();
    isOpen.value = true;
    isUpdate.value = false
}


</script>