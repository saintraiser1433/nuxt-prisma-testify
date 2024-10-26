<template>
    <UITable :data="questionData" :header="header">
        <template #row="{ item, index }">
            <td class="table__block--with-border align-top border">{{ index + 1 }}</td>
            <td class="table__block--with-border max-w-xs  whitespace-normal  px-5">
                <p class="font-bold text-warning">{{ item.question }}</p>
                <div class="grid grid-cols-12 gap-2 mt-2">
                    <div class="xl:col-span-4 lg:col-span-4 md:col-span-12" v-for="(choices, indexs) in item.Choices"
                        :key="choices.choices_id">
                        <p :class="{ 'text-success': choices.status }">{{ convertToLetter(indexs) + ').' +
                            choices.description }}</p>
                    </div>
                </div>

            </td>
            <td class="table__block--with-border align-top">
                <UIButton type="button" class="bg-success mr-1" size="small" @click="handleUpdate(item)">
                    <i-bx-edit></i-bx-edit>
                </UIButton>
                <UIButton type="button" class="bg-danger" size="small" @click="handleDelete(item.question_id)">
                    <i-icon-park-solid-people-delete></i-icon-park-solid-people-delete>
                </UIButton>
            </td>
        </template>
    </UITable>
</template>

<script setup>
const { convertToLetter } = useConvertLetter();
const emits = defineEmits({
    update: Object,
    delete: Object
})
const props = defineProps({
    questionData: Object
})

const { questionData } = toRefs(props)

const header = ref(['#', 'Questions', 'Action'])
const handleUpdate = (val) => {
    emits('update', val)
}
const handleDelete = (val) => {
    emits('delete', val)
}

</script>