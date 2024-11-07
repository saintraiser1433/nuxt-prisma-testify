<template>
    <form @submit.prevent="submitQuestionChoices">
        <div class="mb-2">
            <label for="exam">Exam Title:</label>
            <UIInput class="capitalize" type="text" id="exam" :value="route.meta.examTitle" :disabled="true" />
        </div>
        <div class="mb-2">
            <label for="question">Question:</label>
            <UITextArea id="question" v-model="question" />
        </div>
        <div class="flex mb-2 border-b dark:border-colorBorder pb-2">
            <UIButton type="button" class="ml-auto" variant="success" :isRounded="false" size="small"
                @click="addChoices">
                <div class="flex justify-between items-center gap-2">
                    <i-mingcute-plus-fill></i-mingcute-plus-fill>
                    <span>Add Choices</span>
                </div>
            </UIButton>
        </div>
        <div class="overflow-y-auto max-h-[400px] custom-scrollbar px-2 py-2  ">
            <div class=" flex flex-col gap-1 mb-4 py-1" v-for="(choices, index) in choicesList" :key="index">
                <div class="flex items-center justify-between mb-1">
                    <div class="flex items-center gap-2">
                        <label :for="'choice_' + index">Choices {{ convertToLetter(index) }}:</label>
                        <UICheckBox v-model="choices.status"></UICheckBox>
                    </div>

                    <div class="flex gap-1">
                        <UIButton type="button" class="ml-auto h-7 w-7 inline-flex items-center justify-center"
                            @click="removeChoices(index)" variant="danger" :isRounded="true" size="small">
                            <i-tabler-trash class="flex-shrink-0"></i-tabler-trash>
                        </UIButton>
                    </div>
                </div>
                <UITextArea :id="'choice_' + index" v-model="choices.description" />
            </div>
            {{ }}
        </div>
        <UIButton type="button" v-if="isUpdate" class="mb-2" variant="danger" size="block" @click="reset">Reset
        </UIButton>
        <UIButton type="submit" variant="primary" size="block">{{
            isUpdate ? 'Update' : 'Submit'
        }}</UIButton>
    </form>
</template>

<script setup lang="ts">

const { convertToLetter } = useConvertLetter()
const emits = defineEmits<{
    (e: 'dataQuestChoice', payload: QuestionModel): void;
    (e: 'reset'): void;
}>()
const props = defineProps({
    isUpdate: {
        type: Boolean,
        default: false
    },
    formData: {
        type: Object as PropType<QuestionModel>,
        required: true
    }
})

const route = useRoute();
const choicesList = ref<ChoicesModel[]>([])
const question = ref<string | undefined>('')
const questionId = ref(0)
const { isUpdate, formData } = toRefs(props)

// const examTitle = computed(() => route.meta.examTitle)

const addChoices = () => {
    choicesList.value.push({ description: '', status: false })
}

const removeChoices = async (index: number) => {
    if (index !== -1) {
        choicesList.value.splice(index, 1)
    }
}

const submitQuestionChoices = () => {
    let data: QuestionModel
    if (!isUpdate.value) {
        data = {
            question: question.value,
            exam_id: Number(route.params.id),
            Choices: choicesList.value.map((choice: ChoicesModel) => {
                return {
                    description: choice.description,
                    status: choice.status
                }
            })
        }
    } else {
        data = {
            question: question.value,
            question_id: questionId.value,
            Choices: choicesList.value.map((choice) => {
                return {
                    choices_id: choice.choices_id,
                    description: choice.description,
                    status: choice.status
                }
            })
        }
    }
    emits('dataQuestChoice', data)
}

//watchers

watch(
    formData,
    (newData) => {
        if (newData) {
            const choicesData: ChoicesModel[] = (newData.Choices || []).map((item) => ({
                choices_id: item.choices_id,
                description: item.description,
                status: item.status
            }))
            question.value = newData.question
            questionId.value = newData.question_id || 0
            choicesList.value = choicesData
        }
    },
    { deep: true }
)

const reset = () => {
    question.value = ''
    choicesList.value = []
    questionId.value = 0
    emits('reset')
}
</script>