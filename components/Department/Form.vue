<template>
    <form @submit.prevent="submitDepartment">
        <div class="mb-3">
            <label class="text-sm" for="department">Department:</label>
            <UIInput type="text" class="mt-2" id="department" v-model="formDepartment.department_name" required />
        </div>
        <div class="mb-3 flex gap-2 items-center">
            <label class="text-sm" for="status">Status:</label>
            <UISwitch id="status" v-model="formDepartment.status"></UISwitch>
        </div>
        <div class="border-t border-colorBorder pt-2">
            <UIButton type="button" v-if="isUpdate" class="bg-danger mb-2" size="block" @click="reset">Reset</UIButton>
            <UIButton type="submit" class="bg-primary" size="block">{{
                isUpdate ? 'Update' : 'Submit'
            }}</UIButton>

        </div>
    </form>
</template>

<script setup>
import { toRefs, ref, watch } from 'vue'

const emits = defineEmits(['dataDepartment', 'reset'])
const props = defineProps({
    isUpdate: {
        type: Boolean,
        default: false
    },
    formData: {
        type: Object
    }
})

const { isUpdate, formData } = toRefs(props)

// Reactive form object
const formDepartment = ref({
    department_name: '',
    status: true
})

const submitDepartment = () => {
    emits('dataDepartment', { ...formDepartment.value })
}

const reset = () => {
    emits('reset')
}

watch(
    formData,
    (newData) => {
        if (newData) {
            formDepartment.value = { ...newData }
        }
    },
    { deep: true }
)
</script>