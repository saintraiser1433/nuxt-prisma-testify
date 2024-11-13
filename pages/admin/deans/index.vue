<template>
    <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->
    <div>
        <UIModal :open="isOpen" size="large" title="Add Assignee" @close="closeModal">
            <template #default>
                <div class="grid grid-cols-12 gap-5">
                    <div class="col-span-12 lg:col-span-4">
                        <UICard class="py-2 px-4">

                            <template #default>
                                <DeansAssignForm :course-list="assign?.filteredCourses ?? []" :deans-id="deansId"
                                    @reset="resetInstance" @data-assign="submitAssignCourse" />
                            </template>
                        </UICard>

                    </div>
                    <div class="col-span-12 lg:col-span-8">
                        <UICard class="py-2 px-4">
                            <template #default>
                                <DeansAssignList :assign-data="assign?.assignCourses ?? []"
                                    @delete="removeDeansCourse" />
                            </template>
                        </UICard>


                    </div>
                </div>
            </template>
        </UIModal>

        <div class="grid grid-cols-5 gap-5">
            <div class="col-span-5 lg:col-span-1">
                <UICard class="py-2 px-4">
                    <template #header>
                        <UICardHeader>
                            <div class="">
                                <h1 class="text-2xl lg:text-lg">Deans Information</h1>
                            </div>
                        </UICardHeader>
                    </template>
                    <template #default>
                        <DeansForm :isUpdate="isUpdate" :form-data="data" :department-data="department ?? []"
                            @dataDeans="submitDeans" @reset="resetInstance" />
                    </template>

                </UICard>
            </div>
            <div class="col-span-5 lg:col-span-4">
                <UICard class="py-2 px-4">
                    <template #header>
                        <UICardHeader>
                            <div class="">
                                <h1 class="text-2xl lg:text-lg">List of Dean's</h1>
                            </div>
                        </UICardHeader>
                    </template>
                    <template #default>
                        <DeansList :deansData="deans ?? []" @assign="assignDeans" @update="editDeans" />

                    </template>
                </UICard>
            </div>
        </div>
    </div>



</template>

<script setup lang="ts">
definePageMeta({
    requiredRole: 'admin',
    // middleware: ['checkRole'],

})
useHead({
    title: 'Testify Deans Module',
    meta: [
        { name: "description", content: 'CRUD for Deans' },
        { property: "og:title", content: 'Testify Deans Module' },
        { property: "og:description", content: 'CRUD for Deans' },
    ],
});

const { setToast } = useToasts()
const { setAlert } = useAlert()
const data = ref<DeansModel>({})
const isUpdate = ref(false)
const isOpen = ref(false)
const deansId = ref<number>(0)
const shouldRefetch = ref(0);
const shouldAssign = ref(0);
const nuxtApp = useNuxtApp();
const repo = repository(nuxtApp.$api)
const deansRepo = repository<ApiResponse<DeansModel>>(nuxtApp.$api)
const assignDeansRepo = repository<ApiResponse<AssignDeansModel>>(nuxtApp.$api)
//top level fetch for deans
const { data: deans, status, error } = await useAPI<DeansModel[]>('/deans', {
    transform: (input) => {
        return input.map((item) => ({
            ...item,
            fullname: `${item.first_name} ${item.last_name}${item.middle_name ? ` ${item.middle_name[0]}.` : ''}`
        }))
    },
    getCachedData(key) {
        const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
        if (!data) {
            return
        }
        return data;
    },
    watch: [shouldRefetch],
})

/* Deans */
const submitDeans = async (data: DeansModel) => {
    try {
        let response;
        if (!isUpdate.value) {
            response = await deansRepo.addDeans(data);
        } else {
            response = await deansRepo.updateDeans(data);
        }
        setToast('success', response.message)
        shouldRefetch.value++;
        resetInstance();
    } catch (error: any) {
        setToast('error', error?.data?.error || 'An error occurred');
    }
}


const editDeans = (response: DeansModel) => {
    data.value = {
        deans_id: response.deans_id,
        first_name: response.first_name,
        middle_name: response.middle_name,
        last_name: response.last_name,
        department_id: response.department?.department_id,
        status: response.status
    }
    isUpdate.value = true
}
//end

//top level fetch for assigning deans
const { data: assign } = await useAsyncData<AssignDeansInfoData>('assign', async () => {
    const [assignCourses, filteredCourses] = await Promise.all([
        repo.getAssignDeans(deansId.value),
        repo.getCourseFiltered()
    ])
    return { assignCourses, filteredCourses }
}, {
    immediate: false,
    watch: [shouldAssign]
})

//Assigning deans
const assignDeans = async (id: number) => {
    deansId.value = id;
    shouldAssign.value++;
    isOpen.value = true;

};

const submitAssignCourse = async (data: AssignDeansModel) => {
    try {
        const response = await assignDeansRepo.addAssignCourse(data);
        shouldAssign.value++;
        setToast('success', response.message);
    } catch (error: any) {
        setToast('error', error.data.error || 'An error occurred');
    }
};




const removeDeansCourse = (deansId: number, courseId: number) => {
    setAlert('warning', 'Are you sure you want to delete?', '', 'Confirm delete').then(
        async (result) => {
            if (result.isConfirmed) {
                try {

                    const response = await assignDeansRepo.removeAssignCourse(deansId, courseId);
                    shouldAssign.value++;
                    setToast('success', response.message);
                } catch (error: any) {
                    setToast('error', error.data.error || 'An error occurred');
                }
            }
        }
    )
}

//department
const { data: department } = await useAPI<DepartmentModel[]>('/department', {
    getCachedData(key) {
        const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
        if (!data) {
            return
        }
        return data;
    },
})

//end

const closeModal = () => {
    isOpen.value = false
}

const resetInstance = () => {
    isUpdate.value = false
    data.value = {}
}

</script>