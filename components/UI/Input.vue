<template>
    <input :type="type" :id="id" :name="id"
        class="rounded-sm py-1 px-2  text-sm bg-darken outline-none border w-full border-colorBorder focus:border-primary"
        :placeholder="placeholder" :value="modelValue" @input="handleInput" />

</template>

<script setup>
const props = defineProps({
    type: {
        type: String,
        default: 'text',
    },
    id: String,
    modelValue: {
        type: [String, Number],
        default: ''
    },
    placeholder: String
})
const emit = defineEmits(['update:modelValue'])

const handleInput = ($event) => {
    emit('update:modelValue', $event.target.value);
}

</script>
