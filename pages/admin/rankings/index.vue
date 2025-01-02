<template>
    <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12 lg:col-span-4">
            <UICard :defaults="{ base: 'pb-2' }" :header="{ padding: 'py-5' }">
                <template #header>
                    <div class="flex justify-between items-center">
                        <h1 class="text-4xl lg:text-3xl font-semibold">Top 10 Highest Scores</h1>
                        <svg-icon name="seticons/target" title="targeticon" width="64" height="64" />
                    </div>
                </template>
                <template #default>
                    <div class="grid grid-cols-12 gap-3 p-2 text-center font-bold">
                        <div class="col-span-3">Rank</div>
                        <div class="col-span-6">Taker Name</div>
                        <div class="col-span-3">Score</div>
                    </div>
                    <hr />
                    <div class="grid grid-cols-12 gap-3 p-2 text-center">
                        <div class="col-span-3 flex justify-center items-center gap-2"><svg-icon
                                name="seticons/firstmedal" width="24" height="24" /> 1</div>
                        <div class="col-span-6">John Rey Decosta</div>
                        <div class="col-span-3">10/20</div>
                    </div>
                    <hr />
                    <div class="grid grid-cols-12 gap-3 p-2 text-center ">
                        <div class="col-span-3 flex justify-center items-center gap-2"><svg-icon
                                name="seticons/secondmedal" width="24" height="24" /> 2</div>
                        <div class="col-span-6">John Rey Decosta</div>
                        <div class="col-span-3">10/20</div>
                    </div>
                    <hr />
                    <div class="grid grid-cols-12 gap-3 p-2 text-center">
                        <div class="col-span-3 flex justify-center items-center gap-2"><svg-icon
                                name="seticons/thirdmedal" width="24" height="24" /> 3</div>
                        <div class="col-span-6">John Rey Decosta</div>
                        <div class="col-span-3">10/20</div>
                    </div>
                </template>

            </UICard>
        </div>
        <div class="col-span-12 lg:col-span-8">
            <UICard>
                <template #header>
                    <div class="flex justify-between items-center p-0">
                        <h1 class="text-3xl lg:text-2xl font-semibold">Examinee Record</h1>
                    </div>
                </template>
                <template #default>
                    <UITables :data="dataResults" :columns="columns">
                        <template #increment-data="{ row, index }">
                            {{ index + 1 }}
                        </template>
                        <template #examineeName-data="{ row, index }">
                            {{ row.examineeName }}
                        </template>
                        <template #score-data="{ row, index }">
                            {{ row.total_correct_answers }} / {{ row.total_questions }}
                        </template>
                        <template #ratings-data="{ row, index }">
                            <UProgress :value="row.successRate" size="lg" :color="row.color" indicator />
                        </template>
                        <template #actions-data="{ row, index }">
                            <div class="flex gap-1">
                                <UButton color="primary" class="dark:text-white" variant="solid" size="xs">
                                    <i-bx-show />
                                </UButton>
                            </div>
                        </template>
                    </UITables>
                </template>
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
    title: 'Testify Rankings Module',
    description: 'Rankings',
    ogTitle: 'Testify Rankings Module',
    ogDescription: 'Rankings'
});

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

const { payload, static: stat } = useNuxtApp()
const { setToast } = useToasts();
const resultData = ref<GetScore[]>([]);
const status = ref(false);

const fetchResult = async () => {
    status.value = true;
    try {
        const { data, error } = await useAPI<GetScore[]>('/results', {
            getCachedData(key) {
                const data = payload.data[key] || stat.data[key]
                return data;
            },
            server: false
        })

        if (error.value) {
            throw new Error(error.value.message || 'Failed to fetch items')
        }

        resultData.value = data.value || [];
    } catch (error) {
        setToast('error', error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
        status.value = false;
    }
}

await fetchResult();

const dataResults = computed(() => {
    return resultData.value.map((item) => ({
        successRate: ((Number(item.total_correct_answers) ?? 0) / (Number(item.total_questions) ?? 0)) * 100,
        ...item,
    }));
});





</script>
