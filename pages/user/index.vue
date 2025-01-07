<template>
    <div class="py-5 lg:py-2">
        <div class="grid grid-cols-12 gap-2">
            <div class="col-span-12 lg:col-span-3">
                <UICard :has-footer="true" :header="{ padding: 'sm:p-0 p-0' }">
                    <template #header>
                        <UserDashboardHeader />
                    </template>
                    <div class="flex justify-center relative">
                        <div class="rounded-full h-32 w-32 inline-block p-1 absolute -top-14 bg-white shadow-md ">
                            <NuxtImg src="/images/studentf.png" quality="80" width="128" height="128" />
                        </div>
                    </div>
                    <div class="text-center mt-20 text-2xl text-gray-700 border-b border-gray-200 dark:border-gray-700 pb-5">
                        <h2 class="dark:text-gray-300 font-semibold">Hello!</h2>
                        <h2 class="dark:text-gray-300 font-semibold uppercase">{{ examineeName }}</h2>
                    </div>
                    <div class="text-center text-gray-600 dark:text-gray-300 py-5 font-semibold text-2xl gap-1">
                        <span class="pr-1">Score: </span>
                        <span class="text-danger">{{ score?.total_correct_answers }}</span>
                        <span>/{{ score?.total_questions ?? 0 }}</span>
                    </div>
                    <h2 v-if="!isFinished" class="text-center text-1xl font-semibold pb-2 text-black dark:text-gray-300">
                        {{ examAttempts }}
                    </h2>
                    <template #footer>
                        <div v-if="isFinished" class="text-center py-3 text-1xl font-semibold pb-2 uppercase text-gray-800 dark:text-gray-300">
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
                <UICard :header="{ padding: 'sm:p-0 p-0' }">
                    <template #header>
                        <UserDashboardHeader title="STATISTICAL DASHBOARD" icon="/images/data.png" />
                    </template>
                    <UserDashboardLegends />
                    <UserDashboardStatiscal :summary-data="summaryData ?? []" :is-loading="statuses === 'pending'"
                        :percentage="percentage" :hex-color="hexColor" :label="detail" />
                </UICard>
            </div>
            <div class="col-span-12">
                <UICard :header="{ padding: 'sm:p-0 p-0' }">
                    <template #header>
                        <UserDashboardHeader title="MY RECOMMENDED COURSES" icon="/images/enroll.png" />
                    </template>
                    <UserDashboardCourseList :is-loading="statuses === 'pending'" :course-data="coursesData ?? []" />
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
const { setToast } = useToasts();
const { $api } = useNuxtApp();
const inf = JSON.parse(info.value);

const { data, status: statuses, error: errors } = await useLazyAsyncData('key', async () => {
    const [summaryData, course, score] = await Promise.all([
        $api<SummaryResult[]>(`/results/summary/${inf.id}`),
        $api<CourseModel[]>(`/course`),
        $api<GetScore>(`/results/${inf.id}`),
    ]);

    return {
        summaryData,
        course,
        score
    };
});

if (errors.value) {
    setToast('error', errors.value.message || 'Failed to fetch items');
}

const summaryData = computed(() => data.value?.summaryData);
const courseData = computed(() => data.value?.course);
const score = computed(() => data.value?.score);

const coursesData = computed(() => {
    if (!courseData.value || !score.value) return [];
    return courseData.value.filter((item) => item.score <= (score.value?.total_correct_answers ?? 0));
});

const percentageData = computed(() => {
    if (score.value) {
        return usePercentage(score.value.total_correct_answers, score.value.total_questions);
    }
    return { percentage: 0, hexColor: '', detail: '' };
});

const percentage = computed(() => percentageData.value.percentage);
const hexColor = computed(() => percentageData.value.hexColor);
const detail = computed(() => percentageData.value.detail);

const examineeName = computed(() => `${inf.last_name}, ${inf.first_name} ${inf.middle_name[0]}.`);
const isFinished = computed(() => score.value?.examCnt === score.value?.examAttempt);
const examAttempts = computed(() => `Exam Finished ${score.value?.examAttempt ?? 0} out of ${score.value?.examCnt ?? 0}`);
</script>