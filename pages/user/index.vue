<template>
    <div class="py-5 lg:py-2">
        <div class="grid grid-cols-12 gap-2">
            <div class="col-span-12 lg:col-span-3">
                <UICard :header="{
                    padding: 'sm:p-0 p-0'
                }">
                    <template #header>
                        <div class="bg-[url('@/assets/images/bgheaders.png')] w-full h-20 bg-cover">
                        </div>
                    </template>
                    <div class="flex justify-center relative">
                        <div class="rounded-full h-32 w-32 inline-block p-1 absolute -top-14 bg-white shadow-md ">
                            <!-- <img src="@/assets/images/studentf.png"> -->
                            <NuxtImg src="/images/studentf.png" quality="80" width="128" height="128" />
                        </div>
                    </div>

                    <div
                        class="text-center mt-20 text-2xl text-gray-700 border-b border-gray-200 dark:border-gray-700 pb-5">
                        <h2 class="dark:text-gray-300 font-semibold">Hello!</h2>
                        <h2 class="dark:text-gray-300 font-semibold">Decosta, John Rey N.</h2>
                    </div>

                    <div class="text-center text-gray-600 dark:text-gray-300 py-5 font-semibold text-2xl gap-1">
                        <span class="pr-1">Score: </span>
                        <span class="text-danger">{{ score?.correct }}</span>
                        <span>/{{ score?.questions ?? 0 }}</span>
                    </div>

                    <h2 v-if="!isFinished"
                        class="text-center text-1xl font-semibold pb-2 text-black dark:text-gray-300">
                        Exam Finished 0 out of 4
                    </h2>
                    <template #footer>
                        <div v-if="isFinished"
                            class="text-center py-3 text-1xl font-semibold pb-2 uppercase text-gray-800 dark:text-gray-300">
                            You already taken the exam!
                        </div>
                        <div v-else>

                            <UButton type="button" :to="{ name: 'user-information' }" color="gray" size="lg" block :ui="{
                                color: {
                                    gray: {
                                        solid: 'bg-emerald-500 text-white rounded-none hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600'
                                    }
                                },
                                base: 'ml-auto'
                            }">
                                TAKE THE EXAM
                            </UButton>
                        </div>
                    </template>




                </UICard>
            </div>
            <div class="col-span-12 lg:col-span-9">
                <UICard :header="{
                    padding: 'sm:p-0 p-0'
                }">
                    <!-- body: { padding: 'sm:pt-0 sm:pb-5 sm:px-0' }, -->
                    <template #header>
                        <div
                            class="bg-[url('@/assets/images/bgheaders.png')] w-full h-20 bg-cover flex justify-between items-center px-5 ">
                            <h1 class="text-gray-100 text-2xl font-bold">STATISCAL DASHBOARD</h1>
                            <NuxtImg src="/images/data.png" quality="80" width="64" height="64" />
                        </div>
                    </template>
                    <div class="flex items-center gap-2 px-3 mt-5 border-b pb-3">
                        <div class="self-start">
                            <p>Legends:</p>
                        </div>
                        <ul class="flex text-sm items-center gap-5 flex-row flex-wrap">
                            <li>
                                <UBadge variant="subtle" color="carnation" size="lg">
                                    POOR 50 Below %
                                </UBadge>
                            </li>
                            <li>
                                <UBadge variant="subtle" color="primary" size="lg">
                                    GOOD 51-69 %
                                </UBadge>
                            </li>
                            <li>
                                <UBadge variant="subtle" color="cyan" size="lg">
                                    VERY GOOD 70 - 89%
                                </UBadge>
                            </li>
                            <li>
                                <UBadge variant="subtle" color="emerald" size="lg">
                                    EXCELLENT 90-100 %
                                </UBadge>
                            </li>
                        </ul>
                    </div>
                    <div class="grid grid-cols-12 gap-2">
                        <div class="col-span-9">
                            <UserHomeStatiscalList :summary-data="summary ?? []" />
                        </div>
                        <div class="flex items-center flex-col col-span-3 gap-2 py-3">
                            <h1>YOUR RATINGS</h1>
                            <CircleProgressBar stroke-width="16" size="200" color-filled="#062d19"
                                :color-unfilled="getPercentage.color" animation-duration="1s"
                                :value="getPercentage.percentage" :max="100" percentage rounded>
                                <span class="font-bold"> {{ getPercentage.detail }}</span>
                            </CircleProgressBar>
                        </div>


                    </div>

                </UICard>

            </div>

            <div class="col-span-12">
                <UICard :header="{
                    padding: 'sm:p-0 p-0'
                }">
                    <template #header>
                        <div
                            class="bg-[url('@/assets/images/bgheaders.png')] w-full h-20 bg-cover flex justify-between items-center px-3">
                            <h2 class="text-2xl font-semibold text-white">MY RECOMMENDED COURSES</h2>
                            <NuxtImg src="/images/enroll.png" quality="80" width="64" height="64" />
                        </div>
                    </template>
                    <UserHomeCourseList :course-data="coursesData ?? []" />
                </UICard>

            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
definePageMeta({
    requiredRole: 'examinee',
    layout: 'user'
})

useSeoMeta({
    title: 'Testify User Home Page',
    description: 'This is signup page',
    ogTitle: 'Testify User Home Page',
    ogDescription: 'This is signup page',
});







const { info } = useAuthentication();
const inf = JSON.parse(info.value);
const store = useExamStore();
const shouldRefetch = computed(() => store.refetch)
const isFinished = computed(() => score?.value?.examCnt === score?.value?.examAttempt);
const coursesData = computed(() => {
    if (!course.value || !score.value) return []

    return course.value.filter((item) =>
        item.score <= (score?.value?.correct ?? 0)
    )
})
// <span class="text-danger">{{ score?.correct }}</span>
// <span>/{{ score?.questions ?? 0 }}</span>
const getPercentage = computed(() => {
    let percentage = 0.00;
    let detail;
    let color;
    if (!score.value?.correct || !score.value?.questions) {
        return {
            percentage: 0.00,
            color: '#4b0406',
            detail: detail = 'NOT YET EXAM'
        };
    }

    percentage = (score.value?.correct / score.value?.questions) * 100;
    if (percentage >= 0.00 && percentage <= 50.99) {
        color = '#4b0406';
        detail = 'POOR';
    } else if (percentage >= 51.00 && percentage <= 69.99) {
        color = '#8482f7';
        detail = 'GOOD';
    } else if (percentage >= 70.00 && percentage <= 89.99) {
        color = '#063646';
        detail = 'VERY GOOD';
    } else if (percentage >= 90.00 && percentage <= 100) {
        color = '#062d19';
        detail = 'EXCELLENT';
    } else {
        color = '#4b0406';
        detail = 'NOT EXAM YET';
    }


    return {
        percentage,
        color,
        detail
    }
})


const { data: summary } = await useAPI<GetSummary[]>(`/results/summary/${inf.id}`)


const { data: score } = await useAPI<GetScore>(`/results/${inf.id}`, {
    watch: [shouldRefetch],
})


const { data: course } = await useAPI<CourseModel[]>(`/course`, {
    watch: [shouldRefetch],
})






</script>
