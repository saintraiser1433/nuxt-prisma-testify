<template>
    <input type="checkbox" @click="handleClick" :checked="modelValue"
        class="w-5 h-5 appearance-none border-2 bg-darken border-gray-400 cursor-pointer rounded checked:bg-primary checked:border-primary checked:before:content-['✔'] checked:before:text-white checked:before:flex checked:before:items-center checked:before:justify-center text-xs " />
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps({
    modelValue: Boolean,
})

const { modelValue } = toRefs(props);

const emit = defineEmits(['update:modelValue'])

const handleClick = ($event) => {
    emit('update:modelValue', $event.target.checked)
}

</script>