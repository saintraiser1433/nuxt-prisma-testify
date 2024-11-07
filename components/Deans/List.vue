<template>
  <UITable :data="deansData" :header="header">
    <template #row="{ item, index }">
      <td class="table__block">{{ index + 1 }}</td>
      <td class="table__block">{{ item.fullname }}</td>
      <td class="table__block">{{ item.department.department_name }}</td>
      <td class="table__block">{{ item.username }}</td>
      <td class="table__block">
        <UIBadge :variant="item.status ? 'success' : 'danger'">
          {{ item.status ? 'Active' : 'Inactive' }}
        </UIBadge>
      </td>
      <td class="table__block">
        <UIButton type="button" variant="primary" size="small" class="mr-1" @click="assignDeans(item.deans_id)">
          <i-gridicons-add-outline></i-gridicons-add-outline>
        </UIButton>
        <UIButton type="button" variant="success" size="small" class="mr-1" @click="handleUpdate(item)">
          <i-bx-edit></i-bx-edit>
        </UIButton>
        <!-- <base-button
          type="button"
          variant="secondary"
          size="small"
          class="mr-1"
          @click="handleUpdate(item.deans_id)"
        >
          <i-bx-reset></i-bx-reset>
        </base-button> -->
      </td>
    </template>
  </UITable>
</template>

<script setup lang="ts">
const header = ref<string[]>(['#', 'Fullname', 'Department', 'Username', 'Status', 'Action'])
// const emits = defineEmits(['update', 'delete', 'assign'])
const emits = defineEmits<{
  (e: 'update', payload: DeansModel): void,
  (e: 'delete', id: number): void,
  (e: 'assign', id: number): void,
}>()
const props = defineProps({
  deansData: {
    type: Array as PropType<DeansModel[]>,
    required: true,
    default: () => [],
  },

})

const { deansData } = toRefs(props)


// const fullname = (firstName, lastName, middleName) => {
//   return computed(() => {
//     return `${lastName} ${firstName}  ${middleName ? ' ' + middleName[0] + '.' : ''}`;
//   });
// };

const assignDeans = (id: number) => {
  emits('assign', id)
}

const handleUpdate = (item: DeansModel) => {
  emits('update', item)
}
</script>
