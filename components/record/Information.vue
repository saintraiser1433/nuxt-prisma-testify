<template>
    <UICard :defaults="{ base: ' border-l-2 border-emerald-400 overflow-hidden' }">
        <template #header>
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-semibold">Examinee Information</h1>
                <svg-icon name="seticons/target" title="targeticon" width="64" height="64" />
            </div>
        </template>
        <template #default>
            <div class="divide-y divide-gray-200 dark:divide-gray-700">
                <div class="flex justify-center relative p-5">
                    <div class="rounded-full h-32 w-32 inline-block p-1 bg-white shadow-md ">
                        <NuxtImg src="/images/studentf.png" quality="80" width="128" height="128" />
                    </div>
                </div>
                <div class="grid grid-cols-12 text-sm p-3 capitalize">
                    <div class="col-span-4 font-semibold">First Name:</div>
                    <div class="col-span-8">{{ data[0].first_name }}</div>
                    <div class="col-span-4 font-semibold">Middle Name:</div>
                    <div class="col-span-8">{{ data[0].middle_name }}</div>
                    <div class="col-span-4 font-semibold">Last Name:</div>
                    <div class="col-span-8">{{ data[0].last_name }}</div>
                    <div class="col-span-4 font-semibold">Gender:</div>
                    <div class="col-span-8">{{ data[0].gender }}</div>
                    <div class="col-span-4 font-semibold">From School:</div>
                    <div class="col-span-8 capitalize">{{ data[0].school }}</div>
                    <div class="col-span-4 font-semibold">Contact:</div>
                    <div class="col-span-8">{{ data[0].contact_number }}</div>
                </div>

                <div class="flex flex-col p-3 gap-2">

                    <h3 class="font-semibold">SCORE PER CATEGORY</h3>
                    <div class="grid grid-cols-12 text-sm items-center" v-for="item in data[0].data"
                        :key="item.exam_id">
                        <div class="col-span-0 font-semibold">
                            <UButton type="submit" variant="solid" color="emerald" square size="xs">
                                <i-icon-park-outline-search />
                            </UButton>
                        </div>
                        <div class="col-span-8 font-semibold capitalize">{{ item.exam_title }}</div>
                        <div class="col-span-2"><span class="text-red-500">{{ item.total_correct_answer }}</span>/{{ item.total_questions }}</div>

                    </div>

                </div>
                <div class="flex items-center py-5 px-2">
                    <h1 class="text-3xl font-bold">Score: <span class="text-red-500">{{ scores.totalCorrect }}</span>/{{ scores.totalQuestions }}
                    </h1>

                </div>


            </div>

        </template>

    </UICard>
</template>
<script lang="ts" setup>
const props = defineProps({
    data: {
        type: Object as PropType<SummaryResult[]>,
        required: true,
        default: () => [],
    },

})

const { data } = toRefs(props);
const scores = computed(() => {
    if (!data.value?.[0]) return { totalCorrect: 0, totalQuestions: 0 };
    
    const totalCorrect = data.value[0].data.reduce((a, b) => a + b.total_correct_answer, 0);
    const totalQuestions = data.value[0].data.reduce((a, b) => a + b.total_questions, 0);
    
    return {
        totalCorrect,
        totalQuestions
    };
});


</script>