


<template>
    <div>
        <div class="flex items-center justify-between gap-3 px-4 py-3">

            <UInput v-model="search" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." />
            <UButton icon="i-heroicons-plus" color="emerald" size="md" @click="handleModal">
                Add Department
            </UButton>

        </div>
        <!-- Header and Action buttons -->
        <div class="flex justify-between items-center w-full px-4 py-3">
            <div class="flex items-center gap-1.5">
                <span class="text-sm leading-5">Rows per page:</span>
                <USelect v-model.number="pageCount" :options="[3, 5, 10, 20, 30, 40]" class="me-2 w-20" size="xs" />
            </div>
            <div class="flex gap-1.5 items-center">
                <USelectMenu v-model="selectedColumns" :options="excludeSelectColumn" multiple>
                    <UButton icon="i-heroicons-view-columns" color="gray" size="xs">
                        Columns
                    </UButton>
                </USelectMenu>
            </div>
        </div>
        <UTable class="w-full" :rows="paginatedData" :columns="columnsTable" :ui="{
            td: {
                padding: 'px-4 py-2'
            },

        }">
            <template #empty-state>
                <div class="flex flex-col items-center justify-center py-6 gap-3">
                    <span class="italic text-sm">NO DATA FOUND</span>
                </div>
            </template>
            <template #increment-data="{ row, index }">
                <span>{{ index + 1 }}</span>
            </template>
            <template #status-data="{ row, index }">

                <UBadge v-if="row.status" color="emerald" size="sm" variant="solid">Active</UBadge>
                <UBadge v-else color="carnation" size="sm" variant="solid">Inactive</UBadge>
            </template>
            <template #actions-data="{ row, index }">
                <div class="flex gap-1">
                    <UButton color="emerald" size="sm" @click="handleUpdate(row)"><i-bx-edit /></UButton>
                    <UButton color="carnation" size="sm" @click="handleDelete(row.department_id)">
                        <i-icon-park-solid-people-delete />
                    </UButton>
                </div>

            </template>
        </UTable>

        <div class="flex flex-wrap justify-between items-center border-t border-2 px-3 py-4">
            <div>
                <span class="text-sm leading-5">
                    Showing
                    <span class="font-medium">{{ pageFrom }}</span>
                    to
                    <span class="font-medium">{{ pageTo }}</span>
                    of
                    <span class="font-medium">{{ filteredTableData.length }}</span>
                    results
                </span>
            </div>
            <UPagination v-model="page" :max="5" :page-count="1" :total="totalPages" :ui="{
                wrapper: 'flex items-center gap-1',
                rounded: '!rounded-full min-w-[32px] justify-center',
                default: {
                    activeButton: {
                        variant: 'outline'
                    }
                }
            }" />
        </div>
    </div>
</template>

<script setup lang="ts">
const columns = [{
    key: "increment",
    label: '#',
    sortable: true
}, {
    key: 'course',
    label: 'Course',
    sortable: true
}, {
    key: 'score',
    label: 'Score Attained',
    sortable: true
}, {
    key: 'actions',
    label: 'Actions',
    sortable: false

}]


const emits = defineEmits<{
    (e: 'update', payload: DepartmentModel): void;
    (e: 'delete', id: number): void;
    (e: 'modalOpen'): void;
}>();


const props = defineProps({
    departmentData: {
        type: Array as PropType<DepartmentModel[]>,
        required: true,
        default: () => [],
    },
})

const { departmentData } = toRefs(props)
const { search,
    pageCount,
    paginatedData,
    pageFrom,
    pageTo,
    filteredTableData,
    page,
    selectedColumns,
    columnsTable,
    excludeSelectColumn,
    totalPages } = usePagination(departmentData,columns);

const handleUpdate = (val: DepartmentModel) => {
    emits('update', val)
}
const handleDelete = (id: number) => {
    emits('delete', id)
}
const handleModal = () => {
    emits('modalOpen')
}





//page

//filter


</script>