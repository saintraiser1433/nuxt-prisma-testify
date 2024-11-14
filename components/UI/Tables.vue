<template>
    <div>
        <div class="flex items-center justify-between gap-3 px-4 py-3">

            <UInput v-model="search" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." />
            <slot name="header-button"></slot>

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
            <template #id-data="{ row, index }">
                <span>{{ index + 1 }}</span>
            </template>
            <template #actions-data="{ row, index }">
                <div class="flex gap-1 items-center">
                    <slot name="action" :data="row" :index="index"></slot>

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
const props = defineProps({
    columns: {
        type: Array,
        required: true,
        default: () => [],
    },
    data: {
        type: Array,
        required: true,
        default: () => [],
    },

})
const search = ref('')
const page = ref(1)
const pageCount = ref(5)
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1)
const pageTo = computed(() => Math.min(page.value * pageCount.value, filteredTableData.value.length))

const filteredTableData = computed(() => {
    return props.data.filter((item: any) => {
        return Object.values(item).some((val: any) => val.toString().toLowerCase().includes(search.value))
    })
});

const paginatedData = computed(() => {
    const start = (page.value - 1) * pageCount.value
    const end = start + pageCount.value
    return filteredTableData.value.slice(start, end)
})

const totalPages = computed(() => {
    return Math.ceil(filteredTableData.value.length / pageCount.value)
})


//page

//filter
const selectedColumns = ref(props.columns)
const columnsTable = computed(() => props.columns.filter(column => selectedColumns.value.includes(column)))
const excludeSelectColumn = computed(() => props.columns.filter((v: any) => v.key !== 'select'))

</script>
