<template>
    <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->
    <div>
        <!-- <UIModal :open="isOpen" size="large" title="Add Assignee" @close="closeModal">
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
</UIModal> -->

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
import { Method, type DeansInfoData, type DeansModel } from '~/types';



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
const deansId = ref(0)
const shouldRefetch = ref(0);
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
        //if first time load it will load the data
        if (!data) {
            return
        }
        return data;
    },
});


// const { data: deansInfo, status } = await useAsyncData<DeansInfoData>('deansInfo', async () => {
//     const [deans, department] = await Promise.all([
//         $fetch<DeansModel[]>(`${config.public.baseURL}/deans`, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }

//         }),
//         $fetch<DepartmentModel[]>(`${config.public.baseURL}/department`, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },

//         })
//     ])

//     return { deans, department }

//     // return {
//     //     deans: deans.map((dean) => ({
//     //         ...dean,
//     //         fullname: `${dean.first_name} ${dean.last_name}${dean.middle_name ? ` ${dean.middle_name[0]}.` : ''}`
//     //     })),
//     //     department
//     // };
// }, {
//     transform: (input) => {
//         return input.deans.map((item) => ({
//             ...item,
//             fullname: `${item.first_name} ${item.last_name}${item.middle_name ? ` ${item.middle_name[0]}.` : ''}`
//         }))
//     },
//     getCachedData: (key) => {
//         const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
//         //if first time load it will load the data
//         if (!data) {
//             return
//         }
//         return data;
//     },
//     watch: [shouldRefetch],
// })

// const { deans, department } = deansInfo.value ?? {};




//top level fetch for assigning deans
// const { data: assign, refresh: refreshCourse } = await useAsyncData('assign', async () => {
//     const [assignCourses, filteredCourses] = await Promise.all([
//         $fetch(`${config.public.baseURL}/deans/assign/${deansId.value}`),
//         $fetch(`${config.public.baseURL}/course/filtered`)
//     ])
//     return { assignCourses, filteredCourses }
// }, {
//     immediate: false,
//     // watch: false
// })


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
    // await refreshCourse();
    isOpen.value = true;

};

// const submitAssignCourse = async (data) => {
//     try {
//         const response = await $fetch(`${config.public.baseURL}/deans/assign`, {
//             method: 'POST',
//             body: data
//         });
//         await refreshCourse();
//         setToast('success', response.message);
//     } catch (error) {
//         setToast('error', error.data.error || 'An error occurred');
//     }
// };



// const removeDeansCourse = (item) => {
//     const deansId = item.deans.deans_id;
//     const courseId = item.course.course_id;
//     setAlert('warning', 'Are you sure you want to delete?', '', 'Confirm delete').then(
//         async (result) => {
//             if (result.isConfirmed) {
//                 try {
//                     const response = await deleteAssignCourse(deansId, courseId)
//                     setToast('success', response.message);
//                     await refreshCourse();
//                 } catch (error) {
//                     setToast('error', error.data.error || 'An error occurred');
//                 }
//             }
//         }
//     )
// }

//end

const closeModal = () => {
    isOpen.value = false
}

const resetInstance = () => {
    isUpdate.value = false
    data.value = {}
}

</script>