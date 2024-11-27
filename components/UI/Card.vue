<template>

    <UCard class="w-full" :ui="{
      base: defaults?.base || 'overflow-hidden',
      shadow: 'shadow-lg',
      divide:'divide-t dark:divide-gray-700',
      header: { padding: header?.padding || 'px-4 py-5', base: header?.padding || 'dark:bg-darken' },
      body: { padding: body?.padding || '', base: body?.base || 'dark:bg-darken' },
      footer: { padding: header?.padding || '', base: footer?.base || '' }
    }">
      <template v-if="hasHeader" #header>
        <slot name="header"> </slot>
      </template>
      <slot></slot>
      <template #footer>
        <slot name="footer"> </slot>
      </template>
    </UCard>

</template>

<script lang="ts" setup>
import type { CardProps, CardDefaultProps } from '~/types';



defineProps({
  hasHeader: {
    type: Boolean,
    default: true,
  },
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
