<template>
    <UITable :data="questionData" :header="header">
        <template #row="{ item, index }">
            <td class="table__block--with-border align-top border">{{ index + 1 }}</td>
            <td class="table__block--with-border max-w-xs  whitespace-normal  px-5">
                <p class="font-medium">{{ item.question }}</p>
                <div class="grid grid-cols-12 gap-2 mt-2">
                    <div class="xl:col-span-4 lg:col-span-4 md:col-span-12" v-for="(choices, indexs) in item.Choices"
                        :key="choices.choices_id">
                        <div class="px">
                            <input type="radio" class="h-6 w-6 checked:bg-gray-600">
                        </div>


                        <p class="font-bold">{{ convertToLetter(indexs) + ').' +
                            choices.description }}</p>
                    </div>
                </div>

            </td>

        </template>
    </UITable>
</template>

<script setup lang="ts">

const { convertToLetter } = useConvertLetter();

const props = defineProps({
    questionData: {
        type: Array as PropType<QuestionModel[]>,
        required: true,
        default: () => [],
    }
})

const { questionData } = toRefs(props)

const header = ref<string[]>(['#', 'Questions'])

</script>