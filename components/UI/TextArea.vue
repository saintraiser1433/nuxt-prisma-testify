<template>
    <textarea
        class="block rounded-sm bg-darken outline-none border w-full text-sm border-colorBorder p-2 focus:border-primary"
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