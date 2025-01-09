<template>
    <UICard :defaults="{ base: 'border-b-2 border-emerald-400 overflow-hidden' }" :has-action-header="false">
        <template #header>
            <div class="flex justify-between items-center p-0">
                <h1 class="text-2xl font-semibold">Examinee Record</h1>
            </div>
        </template>
        <template #default>
            <UITables :is-loading="isLoading" :data="data" :columns="columns">
                <template #increment-data="{ row, index }">
                    {{ index + 1 }}
                </template>
                <template #examineeName-data="{ row, index }">
                    <span class="capitalize">{{ row.examineeName }}</span>
                </template>
                <template #score-data="{ row, index }">
                    {{ row.total_correct_answers }}/{{ row.total_questions }}

                </template>
                <template #ratings-data="{ row, index }">
                    <UProgress :value="row.successRate" size="xl" :color="row.color" indicator class="relative">
                        <template #indicator="{ percent }">
                            <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold"
                                :class="percent < 20 ? 'text-secondaryColor-950' : 'text-white'">
                                {{ percent }}%
                            </div>
                        </template>
                    </UProgress>
                </template>
                <template #actions-data="{ row, index }">
                    <div class="flex gap-1">

                        <UButton :to="{ name: 'admin-rankings-examineeId', params: { examineeId: row.examineeId } }"
                            color="primary" class="dark:text-white" variant="solid" size="xs">
                            <i-bx-show />
                        </UButton>
                    </div>
                </template>
            </UITables>
        </template>
    </UICard>
</template>
<script lang="ts" setup>
const columns = [{
    key: "increment",
    label: '#',
    sortable: true
}, {
    key: 'examineeName',
    label: 'Examinee Name',
    sortable: true
}, {
    key: 'score',
    label: 'Score',
    sortable: true
}, {
    key: 'ratings',
    label: 'Ratings',
    sortable: false
}, {
    key: 'actions',
    label: 'Actions',
    sortable: false

}]
defineProps({
    data: {
        type: Object as PropType<GetScore[]>,
        required: true,
        default: () => [],
    },
    isLoading: {
        type: Boolean,
        required: true,
        default: false
    }

})
</script>
