<template>
    <div>

        <UICard class="h-[81vh] overflow-hidden">
            <template #header>
                <div
                    class="bg-[url('@/assets/images/bgheaders.png')] w-full h-16 bg-cover flex justify-between items-center px-3">
                    <h2 class="text-2xl font-semibold text-white">EXAM TITLE:</h2>
                    <h2 class="text-2xl font-semibold text-white">ITEMS ANSWERED: 0/76</h2>
                </div>


            </template>
            <template #default>
                <div class="p-3">
                    <!-- <UTable :rows="people" /> -->
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
const nuxtApp = useNuxtApp()
const header = ref<string[]>(['#', 'Question'])

const { data: question, status, error } = await useAPI<QuestionModel[]>(`/question/1`, {
    getCachedData(key) {
        const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
        if (!data) {
            return
        }
        return data;
    }
})




</script>



<style scoped></style>
