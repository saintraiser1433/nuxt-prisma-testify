<template>
    <div>
        <UICard>
            <template #header>
                <div class="bg-[url('@/assets/images/bgheaders.png')] w-full h-20 bg-cover flex items-center px-3">
                    <h2 class="text-2xl font-semibold text-white">COURSE</h2>
                </div>


            </template>
            <template #default>
            
            </template>



        </UICard>
    </div>
</template>


<script lang="ts" setup>
definePageMeta({
    requiredRole: 'examinee',
    layout: 'user'
})



</script>



<style scoped></style>
