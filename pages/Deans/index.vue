<template>
    <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->
    <!-- <UIModal :open="isOpen" size="large" title="Add Assignee" @close="closeModal">
        <template #default>
            <div class="grid grid-cols-5 gap-5">
                <div class="col-span-12 lg:col-span-2">
                    <AssignForm :courseList="coursesList" :deansId="deansId" :formData="data"
                        @dataAssign="submitAssignCourse" @reset="resetInstance"></AssignForm>
                </div>
                <div class="col-span-12 lg:col-span-3 ">
                    <AssignList :assignData="assignDeanCourses" @delete="removeDeansCourse"></AssignList>
                </div>
            </div>
        </template>
</UIModal> -->

    <div class="grid grid-cols-5 gap-5">
        <div class="col-span-5 lg:col-span-1">
            <UICard title="Deans Information">
                <template #default>
                    <DeansForm :isUpdate="isUpdate" :formData="data" :departmentData="deansInfo.department"
                        @dataDeans="submitDeans" @reset="resetInstance"></DeansForm>
                </template>

            </UICard>
        </div>
        <div class="col-span-5 lg:col-span-4">
            <UICard title="List of Dean's">
                <template #default>
                    <DeansList :deansData="deansInfo.deans" @update="editDeans">
                    </DeansList>
                </template>
            </UICard>
        </div>
    </div>
</template>

<script setup>
const { setToast } = useToast()
const { setAlert } = useAlert()
const { createDeans, updateDeans, deleteDeans } = useDeans()
const data = ref({})
const isUpdate = ref(false)

const { data: deansInfo, refresh } = await useAsyncData('deansInfo', async () => {
    const [deans, department] = await Promise.all([
        $fetch('/api/deans'),
        $fetch('/api/department/available')
    ])

    return { deans, department }
}, {
    lazy: false
})

/* Deans */
const submitDeans = async (data) => {
    try {
        if (!isUpdate.value) {
            const response = await createDeans(data);
            setToast('success', response.message)
        } else {
            const response = await updateDeans(data, data.Deans_id)
            setToast('success', response.message)
        }
        refresh();
        resetInstance();
    } catch (error) {
        console.log(error)
        setToast('error', error.statusMessage || 'An error occurred');
    }
}


const editDeans = (response) => {
    console.log(response);
    data.value = response
    isUpdate.value = true
}

const removeDeans = (id) => {
    setAlert('warning', 'Are you sure you want to delete?', '', 'Confirm delete').then(
        async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteDeans(id);
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