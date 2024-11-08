<template>
    <input type="checkbox" @click="handleClick" :checked="modelValue"
        class="w-5 h-5 appearance-none border-2 dark:bg-darken border-gray-400 cursor-pointer rounded checked:bg-primary checked:border-primary checked:before:content-['✔'] checked:before:text-white checked:before:flex checked:before:items-center checked:before:justify-center text-xs " />
</template>

<script setup lang="ts">


defineProps({
    modelValue: Boolean,
})


const emit = defineEmits(['update:modelValue'])

const handleClick = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    emit('update:modelValue', target.checked);
}

</script>