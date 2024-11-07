<template>
  <UITable :data="deansData" :header="header">
    <template #row="{ item, index }">
      <td class="table__block">{{ index + 1 }}</td>
      <td class="table__block">{{ fullname(item.first_name, item.last_name, item.middle_name) }}</td>
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
import { ref, toRefs } from 'vue'
const header = ref(['#', 'Fullname', 'Department', 'Username', 'Status', 'Action'])
const emits = defineEmits(['update', 'delete', 'assign'])
const props = defineProps({
  deansData: Object,
})




const { deansData } = toRefs(props)


const fullname = (firstName, lastName, middleName) => {
  return computed(() => {
    return `${lastName} ${firstName}  ${middleName ? ' ' + middleName[0] + '.' : ''}`;
  });
};

const assignDeans = (id) => {
  emits('assign', id)
}

const handleUpdate = (item) => {
  emits('update', item)
}
</script>
