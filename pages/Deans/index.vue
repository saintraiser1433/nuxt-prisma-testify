<template>
    <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->
    <div>
        <UIModal :open="isOpen" size="large" title="Add Assignee" @close="closeModal">
            <template #default>
                <div class="grid grid-cols-12 gap-5">
                    <div class="col-span-12 lg:col-span-4">
                        <UICard>
                            <template #default>
                                <DeansAssignForm :courseList="assign.filteredCourses" :deansId="deansId"
                                    @reset="resetInstance" @dataAssign="submitAssignCourse" />
                            </template>
                        </UICard>

                    </div>
                    <div class="col-span-12 lg:col-span-8">
                        <UICard>
                            <template #default>
                                <DeansAssignList :assignData="assign.assignCourses" @delete="removeDeansCourse" />
                            </template>
                        </UICard>


                    </div>
                </div>
            </template>
        </UIModal>

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
                        <DeansList :deansData="deansInfo.deans" @assign="assignDeans" @update="editDeans">
                        </DeansList>
                    </template>
                </UICard>
            </div>
        </div>
    </div>



</template>

<script setup>
useHead({
    title: 'Testify Deans Module',
    meta: [
        { name: "description", content: 'CRUD for Deans' },
        { property: "og:title", content: 'Testify Deans Module' },
        { property: "og:description", content: 'CRUD for Deans' },
    ],
});

const { setToast } = useToast()
const { setAlert } = useAlert()
const { createDeans, updateDeans, deleteAssignCourse } = useDeans()
const data = ref({})
const isUpdate = ref(false)
const isOpen = ref(false)
const deansId = ref(null)


//top level fetch for deans
const { data: deansInfo, status, refresh } = await useAsyncData('deansInfo', async () => {
    const [deans, department] = await Promise.all([
        $fetch('/api/deans'),
        $fetch('/api/department')
    ])
    return { deans, department }
}, {
    lazy: false
})

//top level fetch for assigning deans
const { data: assign, refresh: refreshCourse } = await useAsyncData('assign', async () => {
    const [assignCourses, filteredCourses] = await Promise.all([
        $fetch(`/api/deans/assign/${deansId.value}`),
        $fetch('/api/course/filtered')
    ])
    return { assignCourses, filteredCourses }
}, {
    immediate: false,
    watch: false
})


//end

/* Deans */
const submitDeans = async (data) => {
    try {
        if (!isUpdate.value) {
            const response = await createDeans(data);
            setToast('success', response.message)
        } else {
            const response = await updateDeans(data, data.deans_id)
            setToast('success', response.message)
        }
        refresh();
        resetInstance();
    } catch (error) {
        setToast('error', error.statusMessage || 'An error occurred');
    }
}

const editDeans = (response) => {
    data.value = {
        deans_id: response.deans_id,
        first_name: response.first_name,
        middle_name: response.middle_name,
        last_name: response.last_name,
        department_id: response.department.department_id,
        status: response.status
    }
    isUpdate.value = true
}
//end

//Assigning deans
const assignDeans = async (id) => {
    deansId.value = id;
    await refreshCourse();
    isOpen.value = true;

};

const submitAssignCourse = async (data) => {
    try {
        const response = await $fetch('/api/deans/assign', {
            method: 'POST',
            body: data
        });
        await refreshCourse();
        setToast('success', response.message);
    } catch (error) {
        console.log(error);
        setToast('error', error.statusMessage || 'An error occurred');
    }
};

const removeDeansCourse = (item) => {
    const deansId = item.deans.deans_id;
    const courseId = item.course.course_id;
    setAlert('warning', 'Are you sure you want to delete?', null, 'Confirm delete').then(
        async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteAssignCourse(deansId, courseId)
                    setToast('success', response.message);
                    await refreshCourse();
                } catch (error) {
                    setToast('error', error.statusMessage || 'An error occurred');
                }
            }
        }
    )
}

//end

const closeModal = () => {
    isOpen.value = false
}

const resetInstance = () => {
    isUpdate.value = false
    data.value = {}
}

</script>