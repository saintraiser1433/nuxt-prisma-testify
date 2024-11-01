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
                    <DepartmentList :departmentData="department" @update="editDepartment" @delete="removeDepartment">
                    </DepartmentList>
                </template>
            </UICard>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    requiredRole: 'admin',
    middleware: ['checkRole']
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
const { createDepartment, updateDepartment, deleteDepartment } = useDepartment()
const data = ref({})
const isUpdate = ref(false)

const { data: department, status, error, refresh } = await useFetch('/api/department', {
    method: 'GET',
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
const submitDepartment = async (data) => {
    try {
        if (!isUpdate.value) {
            const response = await createDepartment(data);
            setToast('success', response.message)
        } else {
            const response = await updateDepartment(data, data.department_id)
            setToast('success', response.message)
        }
        refresh();
        resetInstance();
    } catch (error) {
        console.log(error)
        setToast('error', error.statusMessage || 'An error occurred');
    }
}


const editDepartment = (response) => {
    data.value = response
    isUpdate.value = true
}

const removeDepartment = (id) => {
    setAlert('warning', 'Are you sure you want to delete?', '', 'Confirm delete').then(
        async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteDepartment(id);
                    console.log(response.data);
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