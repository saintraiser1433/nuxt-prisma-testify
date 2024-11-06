<template>
    <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->

    <div class="grid grid-cols-5 gap-5">
        <div class="col-span-5 lg:col-span-1 ">
            <UICard title="Department Information">
                <template #default>
                    <DepartmentForm :isUpdate="isUpdate" :formData="data" @dataDepartment="submitDepartment"
                        @reset="resetInstance">
                    </DepartmentForm>
                </template>
            </UICard>

        </div>
        <div class="col-span-5 lg:col-span-4 ">
            <UICard title="List of Department's">
                <template #default>
                    <DepartmentList :departmentData="department ?? []" @update="editDepartment"
                        @delete="removeDepartment">
                    </DepartmentList>
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
    department_id: 0,
    department_name: '',
    status: false,

})
const isUpdate = ref(false)
const config = useRuntimeConfig();
const { token } = useAuthentication()
const { data: department, status, error, refresh } = await useFetch<DepartmentModel[]>(`${config.public.baseURL}/department`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    }
    // transform: (_department) => {
    //     return _department.map((item) => {
    //         return {
    //             department_id: item.department_id,
    //             department_name: item.department_name,
    //             status: item.status
    //         }
    //     })
    // },
    // lazy: true
});

/* Department */
const submitDepartment = async (data: DepartmentModel) => {
    try {
        if (!isUpdate.value) {
            const response = await useFetchApi<ApiResponse<DepartmentModel>, DepartmentModel>(
                `${config.public.baseURL}/department`,
                Method.POST,
                data);
            setToast('success', response.message)
        } else {
            const response = await useFetchApi<ApiResponse<DepartmentModel>, DepartmentModel>(
                `${config.public.baseURL}/department/${data.department_id}`,
                Method.PUT,
                data);
            setToast('success', response.message)
        }
        refresh();
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
                    const response = await useFetchApi<ApiResponse<DepartmentModel>, DepartmentModel>(
                        `${config.public.baseURL}/department/${id}`,
                        Method.DELETE);
                    setToast('success', response.message);
                    refresh();
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
        department_id: 0,
        department_name: '',
        status: true,
    }
}





</script>