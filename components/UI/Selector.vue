<template>
    <select
        class="rounded-sm py-1 px-2 mt-2 text-sm bg-white  dark:bg-darken outline-none border w-full capitalize dark:border-colorBorder focus:border-primary"
        :value="modelValue" @change="updateModel" :id="id" :name="id">
        <option value="" selected>--</option>
        <option v-for="i in data" :key="i.id" :value="i.id">{{ i.value }}</option>
    </select>
</template>

<script setup>
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    id: String,
    modelValue: [String, Number]
})

const updateModel = (event) => {
    emits('update:modelValue', event.target.value)
}
</script>