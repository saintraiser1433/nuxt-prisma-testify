<template>
    <div>
        <div class="grid grid-cols-12 gap-2">
            <div class="col-span-12 lg:col-span-3">
                <UICard class="min-h-96 overflow-hidden">
                    <template #header>
                        <div class="bg-[url('@/assets/images/bgheaders.png')] w-full h-20 bg-cover">
                        </div>

                    </template>
                    <template #default>
                        <div class="flex justify-center relative">
                            <div class="rounded-full h-32 w-32 inline-block p-1 absolute -top-14 bg-white shadow-md ">
                                <img src="@/assets/images/studentf.png">
                            </div>
                        </div>

                        <div class="text-center mt-20 text-2xl text-gray-700 border-b border-gray-300 pb-5">
                            <h2 class="font-semibold">Hello!</h2>
                            <h2 class="font-bold">Decosta, John Rey N.</h2>
                        </div>

                        <div class="text-center mt-5 font-semibold text-2xl gap-1">
                            <span class="pr-1">Score: </span>
                            <span class="text-danger">10</span>
                            <span>/20</span>
                        </div>
                        <h2 class="text-center mt-5 text-1xl font-semibold pb-2 text-black">Exam Finished 0 out of 4
                        </h2>
                        <UIButton type="submit" class="bg-success font-bold" size="block">TAKE THE EXAM</UIButton>
                    </template>

                </UICard>
            </div>
            <div class="col-span-12 lg:col-span-9">
                <UICard class="overflow-hidden">
                    <template #header>
                        <div class="bg-[url('@/assets/images/bgheaders.png')] w-full h-20 bg-cover flex items-center px-3">
                            <h2 class="text-2xl font-semibold text-white">MY STATISCAL DASHBOARD</h2>
                        </div>
                    </template>
                    <template #default>
                        <div class="p-3">
                            <div class="flex items-center gap-2">
                                <div class="self-start">
                                    <p>Legends:</p>
                                </div>
                                

                                <ul class="flex text-sm items-center gap-5 flex-row flex-wrap">
                                    <li>
                                        <UIBadge variant="danger">
                                            POOR 50 Below %
                                        </UIBadge>
                                    </li>
                                    <li>
                                        <UIBadge variant="primary">
                                            GOOD 51-69 %
                                        </UIBadge>
                                    </li>
                                    <li>
                                        <UIBadge variant="info">
                                            VERY GOOD 70 - 89%
                                        </UIBadge>
                                    </li>
                                    <li>
                                        <UIBadge variant="success">
                                            EXCELLENT 90-100 %
                                        </UIBadge>
                                    </li>
                                </ul>

                            </div>
                            <UserHomeStatiscalList :exam-data="exam ?? []" />



                        </div>

                    </template>
                </UICard>
            </div>

            <div class="col-span-12">
                <UICard class="overflow-hidden">
                    <template #header>
                        <div class="bg-[url('@/assets/images/bgheaders.png')] w-full h-20 bg-cover flex items-center px-3">
                            <h2 class="text-2xl font-semibold text-white">MY RECOMMENDED COURSES</h2>
                        </div>
                    </template>
                    <template #default>
                        <div class="p-3">
                            <UserHomeCourseList :exam-data="exam ?? []" />
                        </div>
                    </template>
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
const shouldRefetch = ref(0);
const nuxtApp = useNuxtApp()
const { data: exam } = await useAPI < ExamModel[] > ('/exam', {
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
