<template>
    <form @submit.prevent="submitQuestion">
        <div class="mb-2">
            <label for="course">Exam Title:</label>
            <UIInput type="text" id="course" />
        </div>
        <div class="mb-2">
            <label for="question">Exam Description:</label>
            <UITextArea id="question" v-model="formExam.description" />
        </div>
        <div class="flex mb-2 border-b border-colorBorder pb-2">
            <UIButton type="button" class="ml-auto" variant="success" :isRounded="true" size="small"
                @click="addChoices">
                <div class="flex justify-between items-center gap-2">
                    <i-mingcute-plus-fill></i-mingcute-plus-fill>
                    <span>Add Choices</span>
                </div>
            </UIButton>
        </div>

        <div class="flex flex-col gap-1 mb-4 py-1" v-for="(choices, index) in choicesList" :key="index">
            <div class="flex items-center justify-between mb-1 ">
                <div class="flex items-center gap-2">

                    <label :for="'choice_' + index">Choices {{ convertToLetter(index) }}:</label>
                    <UICheckBox v-model="choices.status" @change="updateChoiceState(index, choices.status)">
                    </UICheckBox>
                </div>

                <div class="flex gap-1">
                    <UIButton class="ml-auto h-7 w-7 inline-flex items-center justify-center"
                        @click="removeChoices(index)" variant="danger" :isRounded="true" size="small">
                        <i-tabler-trash class="flex-shrink-0"></i-tabler-trash>
                    </UIButton>
                </div>
            </div>
            <UITextArea :id="'choice_' + index" v-model="choices.description" />
        </div>

        <UIButton type="submit" variant="primary" size="block">{{
            isUpdate ? 'Update' : 'Submit'
            }}</UIButton>
        <UIButton type="button" v-if="isUpdate" class="bg-danger ml-2" @click="reset">Reset</UIButton>
    </form>
</template>

<script setup>
const emits = defineEmits(['dataQuestChoice', 'reset'])

const { convertToLetter } = useConvertLetter();
const props = defineProps({
    isUpdate: {
        type: Boolean,
        default: false
    },
    formData: {
        type: Object
    }
})

const choicesList = ref([])
const { isUpdate, formData } = toRefs(props)
const formExam = ref({
    description: ''
})


const addChoices = () => {
    choicesList.value.push({
        choices: [{ description: '' }, { checked: false }],
    })
}


const removeChoices = (index) => {
    if (index !== -1) {
        choicesList.value.splice(index, 1)
    }
}


const updateChoiceState = (index, checked) => {
    choicesList.value[index].checked = checked;
}

const submitQuestion = () => {
    const data = {
        ...formExam.value,
        choices: choicesList.value.map((choice) => ({
            description: choice.description,
            status: choice.checked ? true : false
        }))
    }
    emits('dataQuestChoice', data)

}


//watchers

watch(
    formData,
    (newData) => {
        if (newData && JSON.stringify(formExam.value) !== JSON.stringify(formData)) {
            formExam.value = { ...newData }
        }
    },
    { deep: true }
)

const reset = () => {
    emits('reset')
}


</script>