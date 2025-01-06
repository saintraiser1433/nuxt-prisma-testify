<template>
    <UICard :defaults="{ base: ' border-b-2 border-emerald-400 overflow-hidden' }">
        <template #header>
            <div class="flex justify-between items-center">
                <h1 class="text-2xl font-semibold">Top 10 Highest Scores</h1>
                <svg-icon name="seticons/target" title="targeticon" width="64" height="64" />
            </div>
        </template>
        <template #default>
            <div class="text-center py-5" v-if="data.length === 0">
                <h1>Oops nothing here!</h1>
            </div>
            <div v-else class="divide-y divide-gray-200 dark:divide-gray-700">
                <div class="grid grid-cols-12 gap-3 p-2 text-center font-bold">
                    <div class="col-span-1"></div>
                    <div class="col-span-2">Rank</div>
                    <div class="col-span-6">Examinee Name</div>
                    <div class="col-span-2">Score</div>
                </div>


                <div class="divide-y divide-gray-200 dark:divide-gray-700">

                    <div v-for="(data, index) in data" :key="data.examineeName"
                        class="grid grid-cols-12 gap-3 p-2 text-sm text-center">
                        <div class="col-span-1 flex justify-center items-center gap-2">
                            <svg-icon v-if="index + 1 === 1" name="seticons/firstmedal" width="24" height="24" />
                            <svg-icon v-else-if="index + 1 === 2" name="seticons/secondmedal" width="24" height="24" />
                            <svg-icon v-else-if="index + 1 === 3" name="seticons/thirdmedal" width="24" height="24" />
                        </div>
                        <div class="col-span-2">{{ index + 1 }}</div>
                        <div class="col-span-6 capitalize">{{ data.examineeName }}.</div>
                        <div class="col-span-2 ">{{ data.total_correct_answers }}/{{ data.total_questions }}
                        </div>

                    </div>
                </div>
            </div>



        </template>

    </UICard>
</template>
<script lang="ts" setup>
defineProps({
    data: {
        type: Object as PropType<GetScore[]>,
        required: true,
        default: () => [],
    },

})
</script>
