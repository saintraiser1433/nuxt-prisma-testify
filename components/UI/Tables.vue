<template>
    <div>
        <div class="flex items-center justify-between gap-3 px-4 py-3" v-if="hasActionHeader">
            <div class="flex items-center gap-2">
                <slot name="action-header"></slot>
            </div>
        </div>
        <!-- Header and Action buttons -->
        <div class="flex justify-between items-center w-full px-4 py-3 flex-col lg:flex-row gap-3"
            v-if="hasPageCount && hasColumnFilter">
            <div class="flex items-center gap-1.5" v-if="hasPageCount">
                <span class="text-sm leading-5">Rows per page:</span>
                <USelect v-model.number="pageCount" :options="[3, 5, 10, 20, 30, 40]" class="me-2 w-20" size="xs" :ui="{
                    base:'dark:bg-red-500'
                }" />
            </div>
            <div class="flex gap-1.5 items-center" v-if="hasColumnFilter">
                <UInput v-model="search" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." />
                <USelectMenu v-model="selectedColumns" :options="excludeSelectColumn" multiple>
                    <UButton icon="i-heroicons-view-columns" color="gray" size="xs">
                        Columns
                    </UButton>
                </USelectMenu>

            </div>
        </div>
        <UTable class="w-full"
            :sort-button="{ icon: 'i-heroicons-sparkles-20-solid', variant: 'outline', size: 'xs', square: false }"
            :rows="hasPagination ? paginatedData : data" :columns="columnsTable" :ui="{
                td: {
                    padding: 'px-4 py-2',
                    base: hasBorder ? 'border text-sm' : 'text-sm'
                },
                tr: {
                    base: 'odd:bg-white even:bg-slate-50 dark:odd:bg-gray-900 dark:even:bg-gray-800  '
                },
                th: {
                    base: 'bg-gray-100 dark:bg-gun-powder-800 dark:text-slate-400 text-xs',

                },

            }">
            <template #empty-state>
                <div class="flex flex-col items-center justify-center py-6 gap-3">
                    <span class="italic text-sm">NO DATA FOUND</span>
                </div>
            </template>
            <template v-for="(_, name) in $slots" #[name]="slotData">
                <slot :name="name" v-bind="slotData" />
            </template>
        </UTable>

        <div v-if="hasPagination"
            class="flex flex-wrap justify-between items-center border-t dark:border-t-0 px-3 py-1 outline-none dark:bg-gun-powder-800">
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
                wrapper: 'flex items-center gap-1 py-2',
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
    hasBorder: {
        type: Boolean,
        default: false
    },
    hasPagination: {
        type: Boolean,
        default: true
    },
    hasPageCount: {
        type: Boolean,
        default: true
    },
    hasColumnFilter: {
        type: Boolean,
        default: true
    },
    hasActionHeader: {
        type: Boolean,
        default: true
    }


})

const { data } = toRefs(props)
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
    totalPages } = usePagination(data, props.columns);
</script>
