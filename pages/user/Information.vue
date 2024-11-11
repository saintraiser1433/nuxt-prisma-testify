<template>
    <div>
        <UICard>
            <template #header>
                <div class="bg-[url('@/assets/images/bgheaders.png')] w-full h-20 bg-cover flex items-center px-3">
                    <h2 class="text-2xl font-semibold text-white">FOLLOW UP INFORMATION</h2>
                </div>

            </template>
            <template #default>
                <div class="p-3">
                    <h2 class="text-sm border-b border-gray-200 pb-2 mb-2">Date Examination: {{ dateNow }} </h2>
                    <!-- {{ $dateFns.format(new Date(), 'yyyy-MM-dd') }} -->
                    <UserFollowupForm></UserFollowupForm>
                </div>
            </template>



        </UICard>
    </div>
</template>


<script lang="ts" setup>
definePageMeta({
    requiredRole: 'examinee',
    layout: 'user'
})
const { $datefns } = useNuxtApp();
const dateNow = $datefns.format(new Date(), "MMMM d, yyyy"); 


</script>



<style scoped></style>
