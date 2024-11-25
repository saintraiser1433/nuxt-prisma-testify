<script lang="ts" setup>
const columns = [{
    key: 'id',
    label: '#',
    sortable: true
}, {
    key: 'fullname',
    label: 'Fullname',
    sortable: true
}, {
    key: 'username',
    label: 'Username',
    sortable: true
}, {
    key: 'actions',
    label: 'Actions',
    sortable: false

}]


const emits = defineEmits<{
    (e: 'update', payload: User): void,
    (e: 'delete', id: string): void,
    (e: 'toggleModal'): void,
}>()
const props = defineProps({
    examineeData: {
        type: Array as PropType<User[]>,
        required: true,
        default: () => [],
    },

})

const { examineeData } = toRefs(props)


const toggleModal = () => {
    emits('toggleModal');
}

const handleDelete = (id: string) => {
    emits('delete', id)
}

const handleUpdate = (item: User) => {
    emits('update', item)
}

</script>

<template>
    <UITables :data="examineeData" :columns="columns">
        <template #action-header>
            <UButton icon="i-heroicons-plus" color="emerald" size="md" @click="toggleModal">
                Add Examinee's
            </UButton>
        </template>
        <template #id-data="{ row, index }">
            <span>{{ index + 1 }}</span>
        </template>
        <template #fullname-data="{ row, index }">
            <span class="capitalize">{{ row.fullname }}</span>
        </template>
        <template #actions-data="{ row, index }">
            <div class="flex gap-1">
                <UButton color="emerald" class="dark:text-white" variant="solid" size="xs" @click="handleUpdate(row)">
                    <i-bx-edit />
                </UButton>
                <UButton color="carnation" class="dark:text-white" variant="solid" size="xs"
                    @click="handleDelete(row.id)">
                    <i-icon-park-solid-people-delete />
                </UButton>
            </div>
        </template>
    </UITables>
</template>

<style scoped></style>
