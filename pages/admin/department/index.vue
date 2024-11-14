<template>
    <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->
    <UModal v-model="isOpen">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <h1 class="text-2xl lg:text-lg">Department Information</h1>
            </template>
            <DepartmentForm :form-data="data" :is-update="isUpdate" @data-department="submitDepartment">
            </DepartmentForm>
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
                    <h1 class="text-2xl lg:text-lg">List of Department's</h1>
                </template>

                <DepartmentList :department-data="departmentData"  @modal-open="toggleModal"
                    @update="editDepartment" @delete="removeDepartment"></DepartmentList>
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
    title: 'Testify Department Module',
    meta: [
        { name: "description", content: 'CRUD for Department' },
        { property: "og:title", content: 'Testify Department Module' },
        { property: "og:description", content: 'CRUD for Department' },
    ],
});



const { $api, payload, static: stat } = useNuxtApp()
const { setToast } = useToasts();
const isUpdate = ref(false);
const { setAlert } = useAlert()
const departmentRepo = repository<ApiResponse<DepartmentModel>>($api)
const departmentData = ref<DepartmentModel[]>([])
const isOpen = ref(false);
const data = ref<DepartmentModel>({})

const { data: department, error, status } = await useAPI<DepartmentModel[]>('/department', {
    getCachedData(key) {
        const data = payload.data[key] || stat.data[key]
        if (!data) {
            return
        }
        return data;
    },

})

if (department && department.value) {

    departmentData.value = department.value;
} else {
    setToast('error', error.value?.message || 'An error occurred');
}

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
        setToast('error', error.data.error || 'An error occurred');
    }
}

/* Examinee */

const toggleModal = () => {
    data.value = {}
    isOpen.value = true;
    isUpdate.value = false
}



const editDepartment = (response: DepartmentModel) => {
    data.value = {
        department_id: response.department_id,
        department_name: response.department_name,
        status: response.status
    };
    isOpen.value = true;
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
                    setToast('error', error.data.error || 'An error occurred');
                }
            }
        }
    )
}




</script>