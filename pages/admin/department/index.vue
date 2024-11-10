<template>
    <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->

    <div class="grid grid-cols-5 gap-5">
        <div class="col-span-5 lg:col-span-1 ">
            <UICard class="py-2 px-4">
                <template #header>
                    <UICardHeader>
                        <div class="">
                            <h1 class="text-2xl lg:text-lg">Department Information</h1>
                        </div>
                    </UICardHeader>
                </template>
                <DepartmentForm :is-update="isUpdate" :form-data="data" @data-department="submitDepartment"
                    @reset="resetInstance" />
            </UICard>

        </div>
        <div class="col-span-5 lg:col-span-4 ">
            <UICard class="py-2 px-4">
                <template #header>
                    <UICardHeader>
                        <div class="">
                            <h1 class="text-2xl lg:text-lg">List of Department's</h1>
                        </div>
                    </UICardHeader>
                </template>
                <template #default>
                    <DepartmentList :department-data="department ?? []" @update="editDepartment"
                        @delete="removeDepartment"/>
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
    title: 'Testify Department Module',
    meta: [
        { name: "description", content: 'CRUD for Department' },
        { property: "og:title", content: 'Testify Department Module' },
        { property: "og:description", content: 'CRUD for Department' },
    ],
});
const { setToast } = useToast()
const { setAlert } = useAlert()
const data = ref<DepartmentModel>({
    department_name: '',
    status: false,

})
const isUpdate = ref(false)
const shouldRefetch = ref(0)
const nuxtApp = useNuxtApp()
const departmentRepo = repository<ApiResponse<DepartmentModel>>(nuxtApp.$api)


const { data: department } = await useAPI<DepartmentModel[]>('/department', {
    watch: [shouldRefetch],
    getCachedData(key) {
        const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
        if (!data) {
            return
        }
        return data;
    }
})

/* Department */
const submitDepartment = async (data: DepartmentModel) => {
    try {
        let response;
        if (!isUpdate.value) {
            response = await departmentRepo.addDepartment(data);
        } else {
            response = await departmentRepo.updateDepartment(data);
        }
        setToast('success', response.message)
        shouldRefetch.value++;
        resetInstance();
    } catch (error: any) {
        console.error(error)
        setToast('error', error.data.error || 'An error occurred');
    }
}


const editDepartment = (response: DepartmentModel) => {
    data.value = response
    isUpdate.value = true
}

const removeDepartment = (id: number) => {
    setAlert('warning', 'Are you sure you want to delete?', '', 'Confirm delete').then(
        async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await departmentRepo.removeDepartment(id);
                    setToast('success', response.message);
                    shouldRefetch.value++;
                } catch (error: any) {
                    console.error(error)
                    setToast('error', error.data.error || 'An error occurred');
                }
            }
        }
    )
}


const resetInstance = () => {
    isUpdate.value = false
    data.value = {
        department_name: '',
        status: true,
    }
}





</script>