<template>
    <teleport to="body">
        <div v-if="open" @click="close" class="h-screen w-screen backdrop-blur-sm bg-black/50 z-50 fixed top-0 left-0">
        </div>
        <div v-if="open"
            class="fixed top-1/2 left-1/2 min-h-lg lg:top-1/4 w-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg z-50 bg-body border border-cardColor rounded-lg"
            :class="{
                'lg:max-w-6xl md:max-w-lg max-w-sm ': size === 'large',
                'lg:max-w-5xl md:max-w-lg ': size === 'medium',
                'lg:max-w-md md:max-w-sm': size === 'small',
                'max-w-md': size === null
            }">
            <div class="flex border-b-2 border-gray-600 justify-between items-center p-3">
                <h2 class="font-semibold">{{ title }}</h2>
                <div class="cursor-pointer p-2" @click="close">
                    <i-streamline-delete-1-solid class="w-3 h-3" />
                </div>
            </div>
            <div class="px-3 py-2">
                <slot></slot>
            </div>
        </div>
    </teleport>
</template>

<script setup>
const emits = defineEmits(['close'])
defineProps({
    open: Boolean,
    title: String,
    data: Object,
    size: {
        type: String,
        default: null
    }
})

const close = () => {
    emits('close')
}
</script>