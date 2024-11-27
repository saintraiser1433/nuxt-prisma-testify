<template>
    <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->
    <UModal v-model="isOpen">
        <UICard :body="{
            padding: 'px-4'
        }">
            <template #header>
                <h1 class="text-2xl lg:text-lg">Department Information</h1>
            </template>
            <DepartmentForm :form-data="data" :is-update="isUpdate" @data-department="submitDepartment">
            </DepartmentForm>
        </UICard>
    </UModal>

    <div class="grid grid-cols-5 gap-5">
        <div class="col-span-5">
            <UICard>
                <template #header>
                    <h1 class="text-2xl lg:text-lg">List of Department's</h1>
                </template>
                <DepartmentList :department-data="departmentData" @update="editDepartment" @delete="removeDepartment"
                    @toggle-modal="toggleModal" />
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
    console.error(error.value)
    setToast('error', error.value?.data.message || 'An error occurred');
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
        setToast('error', error.data.message || 'An error occurred');
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
                    setToast('error', error.data.message || 'An error occurred');
                }
            }
        }
    )
}




</script>