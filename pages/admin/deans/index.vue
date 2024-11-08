<template>
    <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->
    <div>
        <UIModal :open="isOpen" size="large" title="Add Assignee" @close="closeModal">
            <template #default>
                <div class="grid grid-cols-12 gap-5">
                    <div class="col-span-12 lg:col-span-4">
                        <UICard>
                            <template #default>
                                <DeansAssignForm :course-list="assign?.filteredCourses ?? []" :deans-id="deansId"
                                    @reset="resetInstance" @data-assign="submitAssignCourse" />
                            </template>
                        </UICard>

                    </div>
                    <div class="col-span-12 lg:col-span-8">
                        <UICard>
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
                <UICard title="Deans Information">
                    <template #default>

                        <DeansForm :isUpdate="isUpdate" :form-data="data" :department-data="department ?? []"
                            @dataDeans="submitDeans" @reset="resetInstance"></DeansForm>
                    </template>

                </UICard>
            </div>
            <div class="col-span-5 lg:col-span-4">
                <UICard title="List of Dean's">
                    <template #default>
                        <DeansList :deansData="deans ?? []" @assign="assignDeans" @update="editDeans">
                        </DeansList>

                    </template>
                </UICard>
            </div>
        </div>
    </div>



</template>

<script setup lang="ts">
import { Method, type AssignDeansInfoData, type AssignDeansModel, type CourseModel, type DeansInfoData, type DeansModel } from '~/types';



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

const { setToast } = useToast()
const { setAlert } = useAlert()
const data = ref<DeansModel>({})
const isUpdate = ref(false)
const isOpen = ref(false)
const deansId = ref<number>(0)
const shouldRefetch = ref(0);
const shouldAssign = ref(0);
const config = useRuntimeConfig();
const nuxtApp = useNuxtApp();
const { token } = useAuthentication()
//top level fetch for deans

const { data: deans, error, refresh } = await useFetch<DeansModel[]>(`${config.public.baseURL}/deans`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
    transform: (input) => {
        return input.map((item) => ({
            ...item,
            fullname: `${item.first_name} ${item.last_name}${item.middle_name ? ` ${item.middle_name[0]}.` : ''}`
        }))
    },
    getCachedData(key) {
        const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
        //if first time load it will load the data
        if (!data) {
            return
        }
        return data;
    },
    watch: [shouldRefetch],
});

const { data: department } = await useFetch<DepartmentModel[]>(`${config.public.baseURL}/department`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
    getCachedData(key) {
        const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
        if (!data) {
            return
        }
        return data;
    },
});


//top level fetch for assigning deans
const { data: assign } = await useAsyncData<AssignDeansInfoData>('assign', async () => {
    const [assignCourses, filteredCourses] = await Promise.all([
        //     $fetch<AssignDeansModel[]>(`${config.public.baseURL}/deans/assign/${deansId.value}`, {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${token}`,
        //         }
        //     }),
        //     $fetch<CourseModel[]>(`${config.public.baseURL}/course/filtered`, {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${token}`,
        //         }
        //     })
        useFetchApi<AssignDeansModel[]>(
            `${config.public.baseURL}/deans/assign/${deansId.value}`,
        ),
        useFetchApi<CourseModel[]>(
            `${config.public.baseURL}/course/filtered`,
        )
    ])
    return { assignCourses, filteredCourses }
}, {
    immediate: false,
    watch: [shouldAssign]
})

//end

/* Deans */
const submitDeans = async (data: DeansModel) => {
    try {
        if (!isUpdate.value) {
            const response = await useFetchApi<ApiResponse<DeansModel>, DeansModel>(
                `${config.public.baseURL}/deans`,
                Method.POST,
                data
            );
            setToast('success', response.message)
        } else {
            const response = await useFetchApi<ApiResponse<DeansModel>, DeansModel>(
                `${config.public.baseURL}/deans/${data.deans_id}`,
                Method.PUT,
                data
            );
            setToast('success', response.message)
        }
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

//Assigning deans
const assignDeans = async (id: number) => {
    deansId.value = id;
    shouldAssign.value++;
    isOpen.value = true;

};

const submitAssignCourse = async (data: AssignDeansModel) => {

    try {
        const response = await useFetchApi<ApiResponse<AssignDeansModel>, AssignDeansModel>(
            `${config.public.baseURL}/deans/assign`,
            Method.POST,
            data
        );
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
                    const response = await useFetchApi<ApiResponse<AssignDeansModel>, AssignDeansModel>(
                        `${config.public.baseURL}/deans/assign/${deansId}/${courseId}`,
                        Method.DELETE
                    );
                    shouldAssign.value++;
                    setToast('success', response.message);
                } catch (error: any) {
                    setToast('error', error.data.error || 'An error occurred');
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