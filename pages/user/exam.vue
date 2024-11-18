<template>
    <div>
        <UCard :ui="{
            base: 'h-[81vh] overflow-hidden  ',
            ring: '',
            body: { padding: 'sm:p-0 p-0' },
            header: { padding: '' },
            footer: { padding: '' },

        }">
            <template #header>
                <div
                    class="bg-[url('@/assets/images/bgheaders.png')] w-full h-16 bg-cover flex justify-between items-center px-3">
                    <h2 class="text-2xl font-semibold text-white">EXAM TITLE:</h2>
                    <h2 class="text-2xl font-semibold text-white">ITEMS ANSWERED: 0/76</h2>
                </div>
            </template>
            <template #default>

                <div class="overflow-y-auto">
                    <UITables :data="question ?? []" :columns="columns">
                        <template #increment-data="{ row, index }">
                            {{ index + 1 }}
                        </template>
                        <template #question-data="{ row, index }">
                            <td class="max-w-lg whitespace-normal text-wrap">
                                <p class="font-bold">{{ row.question }}</p>
                                <div class="grid grid-cols-12 gap-2 mt-2">
                                    <div class="col-span-12 ">
                                        <URadioGroup v-model="value" color="primary" size="xl" :options="row.choices">
                                            <template #label="{ option }">
                                                <p class="text-sm">
                                                    {{ option.label }}
                                                </p>
                                            </template>
                                        </URadioGroup>
                                    </div>

                                
                                </div>
                            </td>
                        </template>

                    </UITables>
                </div>


            </template>

            <!-- <template #footer>
                
            </template> -->
        </UCard>


    </div>
</template>


<script lang="ts" setup>
definePageMeta({
    requiredRole: 'examinee',
    layout: 'user'
})
const value = ref('system')
const columns = [{
    key: 'increment',
    label: '#',
    sortable: true
}, {
    key: 'question',
    label: 'Question',
    sortable: true
}]


const nuxtApp = useNuxtApp()


const { data: question, status, error } = await useAPI(`/question/1`, {
    getCachedData(key) {
        const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
        if (!data) {
            return
        }
        return data;
    },
    transform: (data: any) => {
        // return data;
        return data.map((item: any) => ({
            question_id: item.question_id,
            question: item.question,
            choices: item.Choices.map((choice: any) => ({
                label: choice.description,
                value: choice.choices_id,

            })
            )
        }))
    }
})




</script>



<style scoped></style>
