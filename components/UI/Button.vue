<template>
    <button :type="type" class="btn rounded text-sm" :disabled="disabled" :class="[
      variant ? `bg-${variant}` : '',
      size === 'small' ? 'btn--small' : '',
      size === 'block' ? 'btn--block' : '',
      isRounded ? 'rounded-full ' : ''
    ]">
      <slot></slot>
    </button>
  </template>
  
  <script setup>
  const props = defineProps({
    disabled: {
      type: Boolean,
      default: false
    },
    isRounded: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'submit'
    }, //button / submit
    variant: String, // primary secondary success
    size: String // small // block
  })
  </script>
   