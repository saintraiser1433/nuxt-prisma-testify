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

                    <div class="text-center mt-20 text-2xl text-gray-700 border-b border-gray-300 pb-5">
                        <h2 class="dark:text-gray-300 font-semibold">Hello!</h2>
                        <h2 class="dark:text-gray-300 font-semibold">Decosta, John Rey N.</h2>
                    </div>

                    <div class="text-center mt-5 font-semibold text-2xl gap-1">
                        <span class="pr-1">Score: </span>
                        <span class="text-danger">10</span>
                        <span>/20</span>
                    </div>
                    <h2 class="text-center mt-5 text-1xl font-semibold pb-2 text-black dark:text-gray-300">Exam Finished
                        0 out of 4
                    </h2>
                    <template #footer>
                        <UButton type="button" :to="{ name: 'user-information' }" color="gray" size="lg" block :ui="{
                            color: {
                                gray: {
                                    solid: 'bg-emerald-500 text-white rounded-none hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600'
                                }
                            },
                            base: 'ml-auto'
                        }">TAKE THE EXAM</UButton>
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
                    <div class="flex items-center gap-2 px-3 mt-5">
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
                    <UserHomeStatiscalList :exam-data="exam ?? []" />
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
                    <UserHomeCourseList :exam-data="exam ?? []" />
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


const shouldRefetch = ref(0);
const nuxtApp = useNuxtApp()


const { data: exam } = await useAPI<ExamModel[]>('/exam', {
    watch: [shouldRefetch],
    getCachedData(key) {
        const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
        if (!data) {
            return
        }
        return data;
    }
})
</script>
