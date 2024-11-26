<template>
  <div>
    <UCard class="w-full" :ui="{
      base: defaults?.divide || 'overflow-hidden ',
      divide: defaults?.divide || 'divide-y divide-gray-200 dark:divide-gray-700',
      header: { padding: header?.padding || 'px-4 py-5', base: header?.padding || 'dark:bg-darken' },
      body: { padding: body?.padding || '', base: body?.base || 'divide-y divide-gray-200 dark:divide-gray-700 dark:bg-darken' },
      footer: { padding: header?.padding || '', base: footer?.base || '' }
    }">
      <template #header>
        <slot name="header"> </slot>
      </template>
      <slot></slot>
      <template #footer>
        <slot name="footer"> </slot>
      </template>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
import type { CardProps, CardDefaultProps } from '~/types';



defineProps({
  header: {
    type: Object as PropType<CardProps>,
    default: () => ({})
  },
  body: {
    type: Object as PropType<CardProps>,
    default: () => ({})
  },
  footer: {
    type: Object as PropType<CardProps>,
    default: () => ({})
  },
  defaults: {
    type: Object as PropType<CardDefaultProps>,
    default: () => ({})
  },

})
</script>
