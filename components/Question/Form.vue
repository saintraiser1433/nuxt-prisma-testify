<template>
    <UForm :schema="schema" :state="formQuestion" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Exam Title" name="exam_title">
            <UInput value model-value="Test" />
        </UFormGroup>
        <UFormGroup label="Enter Question" name="question" required>
            <UITiptapEditor v-model="formQuestion.question"></UITiptapEditor>
            <!-- <UTextarea :rows="6" size="lg" v-model="formQuestion.question" /> -->
        </UFormGroup>
        <div class="flex mb-2 border-b dark:border-colorBorder pb-2">
            <UButton :ui="{ base: 'ml-auto' }" @click="addChoice"> <i-mingcute-plus-fill />Add Choices</UButton>
        </div>
        <div class="overflow-y-auto max-h-[400px] custom-scrollbar px-1  ">
            <!-- <TransitionGroup name="choices-list" tag="div" class="space-y-4" mode="out-in"> -->
            <transition-expand group mode="out-in">
                <div v-for="(choice, index) in formQuestion.Choices" :key="'choice-' + index"
                    class="flex flex-col gap-2 mb-5 p-2 rounded-lg border dark:border-gray-700 hover:shadow-sm">
                    <div class="flex items-center justify-between border-b py-2">
                        <div class="flex items-center gap-x-2">
                            <span class="font-medium">Choice {{ convertToLetter(index) }} :</span>
                            <UCheckbox v-model="choice.status"
                                :aria-label="'Mark choice ' + convertToLetter(index) + ' as correct'" />
                        </div>

                        <UButton color="red" variant="solid" size="xs" icon="i-tabler-trash"
                            @click="removeChoices(index)" :aria-label="'Remove choice ' + convertToLetter(index)" />
                    </div>
                    <UITiptapEditor v-model="choice.description"></UITiptapEditor>
                    <!-- <UTextarea v-model="choice.description" :rows="4" size="lg"
                        :placeholder="'Enter choice ' + convertToLetter(index) + ' description'" /> -->
                </div>
                <br />
            </transition-expand>

            <!-- </TransitionGroup> -->
            <div class="space-y-2 mt-4">
                <UButton v-if="isUpdate" color="red" variant="outline" @click="reset" block>
                    Reset Form
                </UButton>

                <UButton v-if="formQuestion.Choices?.length ?? 0 > 0" type="submit" color="emerald" block>
                    {{ isUpdate ? 'Update Question' : 'Submit Question' }}
                </UButton>
            </div>
        </div>

    </UForm>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'


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
const { isUpdate, formData } = toRefs(props)
const { $joi } = useNuxtApp()



const schema = $joi.object({
    question_id: $joi.number().optional(),
    exam_id: $joi.number().optional(),
    question: $joi.string().required().messages({
        "any.required": `Question is Required`,
    }),
    Choices: $joi.array().min(2).items(
        $joi.object({
            description: $joi.string().required().trim().min(1).messages({
                'string.empty': 'Choice description cannot be empty',
                'any.required': 'Choice description is required',
                'string.min': 'Choice description cannot be empty'
            }),
            choices_id: $joi.number().optional(),
            status: $joi.boolean().optional()
        })
    ).messages({
        'array.min': 'At least 2 choices are required'
    })
})

const formQuestion = ref<QuestionModel>({
    question_id: undefined,
    question: undefined,
    Choices: []
});




// const examTitle = computed(() => route.meta.examTitle)

const addChoice = () => {
    if (!formQuestion.value.Choices) {
        formQuestion.value.Choices = []
    }
    formQuestion.value.Choices.push({
        description: '',
        status: false
    })
}

const removeChoices = (index: number) => {
    formQuestion.value.Choices = formQuestion.value.Choices?.filter((_, i) => i !== index)
}


const onSubmit = (event: FormSubmitEvent<QuestionModel>) => {
    emits('dataQuestChoice', { ...event.data, exam_id: Number(route.params.id) })
}
//watchers

watch(
    formData,
    (newData) => {
        if (newData) {
            formQuestion.value = JSON.parse(JSON.stringify(newData))
        }
    },
    { deep: true, immediate: true }
)

const reset = () => {
    emits('reset')
}
</script>
