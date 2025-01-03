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
                <div class="grid grid-cols-12 text-sm p-3">
                    <div class="col-span-4 font-semibold">First Name:</div>
                    <div class="col-span-8">John Rey</div>
                    <div class="col-span-4 font-semibold">Middle Name:</div>
                    <div class="col-span-8">Nalla</div>
                    <div class="col-span-4 font-semibold">Last Name:</div>
                    <div class="col-span-8">Decosta</div>
                    <div class="col-span-4 font-semibold">Gender:</div>
                    <div class="col-span-8">Female</div>
                    <div class="col-span-4 font-semibold">From School:</div>
                    <div class="col-span-8 capitalize">New Society national high school</div>
                    <div class="col-span-4 font-semibold">Contact:</div>
                    <div class="col-span-8">09097431072</div>
                </div>

                <div class="flex flex-col p-3 gap-2">
                    <h3 class="font-semibold">SCORE PER CATEGORY</h3>
                    <div class="grid grid-cols-12 text-sm items-center">
                        <div class="col-span-1 font-semibold">
                            <UButton type="submit" variant="solid" color="emerald" square size="sm">
                                <i-icon-park-outline-search />
                            </UButton>
                        </div>
                        <div class="col-span-8 font-semibold">FILIPINO</div>
                        <div class="col-span-2">10/10</div>

                    </div>
                    <div class="grid grid-cols-12 text-sm items-center">
                        <div class="col-span-1 font-semibold">
                            <UButton type="submit" variant="solid" color="emerald" square size="sm">
                                <i-icon-park-outline-search />
                            </UButton>
                        </div>
                        <div class="col-span-8 font-semibold">FILIPINO</div>
                        <div class="col-span-2">10/10</div>

                    </div>
                    <div class="grid grid-cols-12 text-sm items-center">
                        <div class="col-span-1 font-semibold">
                            <UButton type="submit" variant="solid" color="emerald" square size="sm">
                                <i-icon-park-outline-search />
                            </UButton>
                        </div>
                        <div class="col-span-8 font-semibold">FILIPINO</div>
                        <div class="col-span-2">10/10</div>

                    </div>
                </div>
                <div class="flex items-center py-5 px-2">
                    <h1 class="text-3xl font-bold">Score: <span class="text-red-500">10</span>/20</h1>

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