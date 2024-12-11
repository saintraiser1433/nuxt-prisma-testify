<template>
    <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->
    <UModal v-model="isOpen" prevent-close>
        <UICard :body="{
            padding: 'px-4'
        }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h1 class="text-2xl lg:text-lg font-semibold">Deans Information</h1>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="isOpen = false" />
                </div>

            </template>
            <DeansForm :form-data="data" :department-data="transformDepartment" :is-update="isUpdate"
                @data-deans="submitDeans">
            </DeansForm>
        </UICard>
    </UModal>

    <UModal :ui="{ width: 'w-full lg:max-w-[1400px]' }" v-model="isOpenAssign" prevent-close>
        <UICard :body="{ padding: 'p-4', base: 'dark:bg-dark-body-950' }">

            <template #header>
                <div class="flex items-center justify-between">
                    <h1 class="text-2xl lg:text-lg font-semibold">Assign Deans</h1>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="isOpenAssign = false" />
                </div>
            </template>
            <div class="grid grid-cols-12 gap-3">
                <div class="col-span-12 lg:col-span-3">
                    <UICard :body="{ padding: 'px-4' }">
                        <template #header>
                            <h1 class="text-2xl lg:text-lg font-semibold">Courses Assign</h1>
                        </template>
                        <DeansAssignForm :deans-name="deansName" :course-data="assign?.filteredCourses ?? []"
                            :deans-id="deansId" @data-assign="submitAssign" />
                    </UICard>

                </div>
                <div class="col-span-12 lg:col-span-9">
                    <UICard>
                        <template #header>
                            <h1 class="text-2xl lg:text-lg font-semibold">List of Courses Assign</h1>
                        </template>
                        <DeansAssignList :assign-data="assign?.assignCourses ?? []" @delete="removeAssign" />
                    </UICard>

                </div>
            </div>
        </UICard>
        <!-- </UCard> -->
    </UModal>

    <div class="grid grid-cols-5 gap-5">
        <div class="col-span-5">
            <UICard>
                <template #header>
                    <h1 class="text-2xl lg:text-lg font-semibold">List of Deans's</h1>
                </template>
                <DeansList :is-loading="statusDean" :deans-data="transformDeans" @toggle-modal="toggleModal"
                    @assign="toggleAssignDeans" @update="editDeans" />
            </UICard>

        </div>
    </div>



</template>

<script setup lang="ts">


definePageMeta({
    requiredRole: 'admin',
    // middleware: ['checkRole'],
})

useSeoMeta({
    title: 'Testify Deans Module',
    description: 'CRUD for Deans',
    ogTitle: 'Testify Deans Module',
    ogDescription: 'CRUD for Deans'
});



const { $api, payload, static: stat } = useNuxtApp()
const { setToast } = useToasts();
const isUpdate = ref(false);
const isOpen = ref(false);
const { setAlert } = useAlert()
const data = ref<DeansModel>({})



/* Department */
const departmentData = ref<DepartmentModel[]>([])
const { data: department, error: errordept } = await useAPI<DepartmentModel[]>('/department', {
    getCachedData(key) {
        const data = payload.data[key] || stat.data[key]
        if (!data) {
            return
        }
        return data;
    },
    server: false

})
if (department && department.value) {
    departmentData.value = department.value;
} else {
    console.error(errordept.value)
    setToast('error', errordept.value?.data.message || 'An error occurred');
}
const transformDepartment = computed(() => {
    return departmentData.value.map((item) => ({
        name: item.department_name,
        value: item.department_id
    }))
})

/* Assign Deans */
const isOpenAssign = ref(false);
const shouldAssign = ref(0);
const deansId = ref(0);
const deansName = ref('');
const assignDeansRepo = repository<ApiResponse<AssignDeansInfoData>>($api)
const { data: assign, error: assignError } = await useAsyncData('assign', async () => {
    const [assignCourses, filteredCourses] = await Promise.all([
        assignDeansRepo.getAssignDeans(deansId.value),
        assignDeansRepo.getCourseFiltered()
    ])
    return {
        assignCourses: assignCourses.map((item) => ({
            deans_id: item.deans_id,
            course_id: item.course_id,
            course_name: item.course?.description ?? 'Untitled Course'
        })),
        filteredCourses
    }
}, {
    immediate: false,
    watch: [shouldAssign]
})



const toggleAssignDeans = async (deanId: number, name: string) => {
    deansId.value = deanId;
    deansName.value = name
    isOpenAssign.value = true;
    shouldAssign.value++;

}

const submitAssign = async (data: AssignDeansModel) => {
    try {
        const response = await assignDeansRepo.addAssignCourse(data);
        shouldAssign.value++
        setToast('success', response.message)
    } catch (err: any) {
        setToast('error', err.value?.data.message || 'An error occurred')
    }
}

const removeAssign = async (deansId: number, courseId: number) => {
    setAlert('warning', 'Are you sure you want to delete?', '', 'Confirm delete').then(
        async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await assignDeansRepo.removeAssignCourse(deansId, courseId);
                    shouldAssign.value++
                    setToast('success', response.message);
                } catch (error: any) {
                    setToast('error', error.data.message || 'An error occurred');
                }
            }
        }
    )
}



/* Deans */
const deansRepo = repository<ApiResponse<DeansModel>>($api)
const deansData = ref<DeansModel[]>([])
const statusDean = ref(false);

const fetchDeans = async () => {
    statusDean.value = true;
    try {
        const { data, error } = await useAPI<DeansModel[]>('/deans', {
            getCachedData(key) {
                const data = payload.data[key] || stat.data[key]
                if (!data) {
                    return
                }
                return data;
            },

        })
        if (error.value) {
            throw new Error(error.value.message || 'Failed to fetch items')
        }
        deansData.value = data.value || [];
    } catch (error) {
        setToast('error', error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
        statusDean.value = false;
    }
}
    
await fetchDeans();






const transformDeans = computed(() => {
    return deansData.value.map((item) => {
        const fullname = item.first_name + ' ' + item.last_name + (item.middle_name ? ' ' + item.middle_name[0] + '.' : '');
        const dept = departmentData.value.find((items) => items.department_id === item.department_id)
        return {
            deans_id: item.deans_id,
            first_name: item.first_name,
            last_name: item.last_name,
            middle_name: item.middle_name,
            status: item.status,
            department_id: item.department_id,
            department_name: dept?.department_name,
            username: item.username,
            fullname
        }
    })
})



const submitDeans = async (response: DeansModel) => {
    try {
        if (!isUpdate.value) {
            const res = await deansRepo.addDeans(response);
            deansData.value.unshift(res.data as DeansModel)
            setToast('success', res.message)
        } else {
            const res = await deansRepo.updateDeans(response);
            const index = deansData.value.findIndex((item) => item.deans_id === res.data?.deans_id);
            deansData.value[index] = { ...deansData.value[index], ...res.data }
            setToast('success', res.message)
        }
        isOpen.value = false;
        isUpdate.value = false;

    } catch (error: any) {
        setToast('error', error.data.error || 'An error occurred');
    }
}

const editDeans = (response: DeansModel) => {
    data.value = {
        deans_id: response.deans_id,
        first_name: response.first_name,
        last_name: response.last_name,
        middle_name: response.middle_name,
        department_id: response.department_id,
        status: response.status,
    };
    isOpen.value = true;
    isUpdate.value = true
}

const toggleModal = () => {
    data.value = {}
    isOpen.value = true;
    isUpdate.value = false
}






</script>