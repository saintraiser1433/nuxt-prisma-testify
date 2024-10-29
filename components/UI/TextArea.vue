<template>
    <textarea
        class="block rounded-sm dark:bg-darken outline-none border w-full text-sm p-2 dark:border-colorBorder  focus:border-primary"
        rows="5" @input="handleInput" :value="props.modelValue"></textarea>
</template>
<script setup>
const props = defineProps({
    modelValue: String
})

const emits = defineEmits(['update:modelValue'])

const handleInput = (e) => {
    emits('update:modelValue', e.target.value)
}
</script>