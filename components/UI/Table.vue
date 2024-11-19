<template>
    <div class="pagination-component">
        <!-- Controls Section -->
        <div class="flex justify-between items-center flex-col text-sm lg:flex-row lg:text-xs">
            <div class="flex mb-2 items-center gap-2">
                <span>Show</span>
                <UISelector class=" mb-2" v-model="showEntries" :data="entries" />
                <span>entries</span>
            </div>

            <div class="flex justify-center items-center mb-2 lg:text-sm">
                <span class="mr-2">Search:</span>
                <UIInput v-model="searchInput"></UIInput>
            </div>
        </div>

        <!-- Table Section -->
        <div
            class=" overflow-x-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300">
            <table class="whitespace-nowrap w-100 min-w-full mx-auto">
                <thead
                    class="bg-gray-100 dark:bg-darken dark:border-y dark:border-colorBorder rounded-lg text-left text-sm lg:text-xs">
                    <tr>
                        <th v-for="headerItem in header" :key="headerItem"
                            class="py-3 px-5 lg:px-2 font-semibold  capitalize">
                            {{ headerItem }}
                        </th>
                    </tr>
                </thead>
                <tbody v-if="paginatedData && paginatedData.length > 0">
                    <tr class="border-b dark:border-colorBorder text-xs" v-for="(item, index) in paginatedData"
                        :key="index">
                        <slot name="row" :item="item" :index="index" />
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr class="border-b dark:border-colorBorder">
                        <td :colspan="header.length" class="text-center text-base p-2">No data found</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex flex-col lg:flex-row text-sm py-1 items-center ">
            <span class="font-light opacity-50 text-center flex-grow lg:text-left">
                Showing {{ paginatedData.length }} out of {{ filteredTableData.length }}
            </span>
            <ul class="pagination">
                <li class="pagination__item" :class="{ disabled: currentPage === 1 }" @click="prevPage">
                    <i-fe-arrow-left></i-fe-arrow-left>
                </li>
                <li class="pagination__item" v-for="page in totalPages" :key="page"
                    :class="{ 'pagination-active': currentPage === page }" @click="setPage(page)">
                    <a href="#">{{ page }}</a>
                </li>
                <li class="pagination__item" :class="{ disabled: currentPage === totalPages }" @click="nextPage">
                    <i-fe-arrow-right></i-fe-arrow-right>
                </li>
            </ul>
        </div>
    </div>
</template>


<script setup>
import { toRefs, ref, computed } from 'vue'

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    header: {
        type: Array,
        required: true
    }
})

const { data, header } = toRefs(props)

const searchInput = ref('')
const showEntries = ref(10)
const currentPage = ref(1)

const filteredTableData = computed(() => {
    return data.value.filter((item) => {
        return Object.values(item).some((val) =>
            val.toString().toLowerCase().includes(searchInput.value)
        )
    })
});

const entries = [
    {
        id: 10,
        value: 10
    },
    {
        id: 20,
        value: 20
    }
]

const totalPages = computed(() => {
    return Math.ceil(filteredTableData.value.length / showEntries.value)
})

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * showEntries.value
    const end = start + showEntries.value
    return filteredTableData.value.slice(start, end)
})

const setPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
    }
}

const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++
}


</script>