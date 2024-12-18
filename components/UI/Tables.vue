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
                <USelect v-model.number="pageCount" :options="[3, 5, 10, 20, 30, 40]" class="me-2 w-20" size="xs"
                    color="gray" />
            </div>
            <div class="flex gap-1.5 items-center" v-if="hasColumnFilter">
                <UInput v-model="search" icon="i-heroicons-magnifying-glass-20-solid" color="gray"
                    placeholder="Search..." />
                <USelectMenu v-model="selectedColumns" :options="excludeSelectColumn" multiple>
                    <UButton icon="i-heroicons-view-columns" size="xs" color="gray" :ui="{
                        color: {
                            gray: {
                                solid: 'bg-emerald-500 text-white hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600'
                            }
                        }
                    }">
                        Columns
                    </UButton>

                </USelectMenu>

            </div>
        </div>


        <UTable :loading="isLoading" :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
            :progress="{ color: 'primary', animation: 'carousel' }"
            :sort-button="{ variant: 'outline', size: 'xs', square: false }"
            :rows="hasPagination ? paginatedData : data" :columns="columnsTable" class="w-full text-xs" :ui="{
                base: base || 'border-t dark:border-gray-700 ',
                td: {
                    padding: td.padding || 'px-4 py-2',
                    base: td.base || '',
                },
                tr: {
                    base: tr.base || 'odd:bg-white even:bg-slate-50 dark:odd:bg-gray-900 dark:even:bg-gray-800  '
                },
                th: {
                    padding: th.padding || 'py-3',
                    base: th.base || 'w-25 bg-gray-100 dark:bg-darken dark:text-slate-400 text-xs',
                },
            }
                ">
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
            class="flex flex-wrap justify-between items-center border-t  dark:border-gray-700 px-3 py-1 outline-none dark:bg-darken">
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
                wrapper: 'flex items-center gap-1 py-1',
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
    base: String,
    td: {
        type: Object as PropType<TableProps>,
        default: () => ({})
    },
    th: {
        type: Object as PropType<TableProps>,
        default: () => ({})
    },
    tr: {
        type: Object as PropType<TableProps>,
        default: () => ({})
    },
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
    },

    isLoading: {
        type: Boolean,
        default: false,
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
