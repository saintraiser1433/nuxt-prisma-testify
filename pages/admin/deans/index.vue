<template>
    <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->
    <UModal v-model="isOpen">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <h1 class="text-2xl lg:text-lg">Deans Information</h1>
            </template>
            <DeansForm :form-data="data" :department-data="transformDepartment" :is-update="isUpdate" @data-Deans="submitDeans"></DeansForm>
        </UCard>
    </UModal>

    <div class="grid grid-cols-5 gap-5">
        <div class="col-span-5">
            <UCard class="w-full" :ui="{
                base: '',
                ring: '',
                divide: 'divide-y divide-gray-200 dark:divide-gray-700',
                header: { padding: 'px-4 py-5' },
                body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
                footer: { padding: 'p-4' }
            }">
                <template #header>
                    <h1 class="text-2xl lg:text-lg">List of Deans's</h1>
                </template>

                <UITables :data="transformDeans" :columns="columns">
                    <template #action-header>
                        <UButton icon="i-heroicons-plus" color="emerald" size="md" @click="toggleModal">
                            Add Deans's
                        </UButton>
                    </template>
                    <template #increment-data="{ row, index }">
                        <span>{{ index + 1 }}</span>
                    </template>
                    <template #status-data="{ row, index }">
                        <UBadge v-if="row.status" class="dark:text-white" color="emerald" size="sm" variant="solid">
                            Active</UBadge>
                        <UBadge v-else color="carnation" class="dark:text-white" size="sm" variant="solid">Inactive
                        </UBadge>
                    </template>
                    <template #actions-data="{ row, index }">
                        <div class="flex gap-1">
                            <UButton color="primary" class="dark:text-white" variant="solid" size="sm">
                                <i-bx-show />
                            </UButton>
                            <UButton color="emerald" class="dark:text-white" variant="solid" size="sm"
                                @click="editDeans(row)">
                                <i-bx-edit />
                            </UButton>
                        </div>
                    </template>
                </UITables>
            </UCard>
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

const columns = [{
    key: "increment",
    label: '#',
    sortable: true
}, {
    key: 'fullname',
    label: 'Deans Name',
    sortable: true
}, {
    key: 'department_name',
    label: 'Department',
    sortable: true
}, {
    key: 'username',
    label: 'Username',
    sortable: true
}, {
    key: 'status',
    label: 'Status',
    sortable: true
}, {
    key: 'actions',
    label: 'Actions',
    sortable: false
}]



const { $api, payload, static: stat } = useNuxtApp()
const { setToast } = useToasts();
const isUpdate = ref(false);
const deansRepo = repository<ApiResponse<DeansModel>>($api)
const deansData = ref<DeansModel[]>([])
const departmentData = ref<DepartmentModel[]>([])
const isOpen = ref(false);
const data = ref<DeansModel>({})


const { data: deans, error, status } = await useAPI<DeansModel[]>('/deans', {
    getCachedData(key) {
        const data = payload.data[key] || stat.data[key]
        if (!data) {
            return
        }
        return data;
    },

})

if (deans && deans.value) {
    deansData.value = deans.value;
} else {
    setToast('error', error.value?.message || 'An error occurred');
}

const { data: department, error: errordept, status: statusdept } = await useAPI<DepartmentModel[]>('/department', {
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
    setToast('error', errordept.value?.message || 'An error occurred');
}



const transformDepartment = computed(() => {
    return departmentData.value.map((item) => ({
        name: item.department_name,
        value: item.department_id
    }))
})



const transformDeans = computed(() => {
    return deansData.value.map((item) => {
        const fullname = item.first_name + ' ' + item.last_name + (item.middle_name ? ' ' + item.middle_name[0] + '.' : '');

        return {
            deans_id: item.deans_id,
            first_name: item.first_name,
            last_name: item.last_name,
            middle_name: item.middle_name,
            status: item.status,
            department_id: item.department?.department_id,
            department_name: item.department?.department_name,
            username: item.username,
            fullname
        }
    })
})



/* Deans */

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

const toggleModal = () => {
    data.value = {}
    isOpen.value = true;
    isUpdate.value = false
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






</script>