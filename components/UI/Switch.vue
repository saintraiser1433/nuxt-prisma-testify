<template>
    <div class="relative inline-block h-7 w-12 border dark:border-colorBorder rounded-3xl">
        <input type="checkbox" :id="id" :name="id" v-model="isCheck" class="hidden" />
        <span @click="toggleCheck"
            class="relative inline-block h-full w-full dark:bg-darken cursor-pointer rounded-full transition-colors duration-300"
            :class="{ 'bg-primary': isCheck }">
            <span class="absolute h-[1.6rem] w-[1.6rem] bg-gray-300 rounded-full transition-all duration-300 "
                :class="[isCheck ? 'translate-x-6' : 'translate-x-0']" role="switch"></span>
        </span>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: true
    },
    id: String

})
const emits = defineEmits(['update:modelValue'])
const isCheck = ref(props.modelValue)



const toggleCheck = () => {
    isCheck.value = !isCheck.value
    emits('update:modelValue', isCheck.value)
}


watch(
    () => props.modelValue,
    (newValue) => {
        if (newValue !== isCheck.value) {
            isCheck.value = newValue
        }
    }
)
</script>