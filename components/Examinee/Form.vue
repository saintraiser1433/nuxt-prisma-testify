<template>
    <form @submit.prevent="submitExaminee">
        <div class="mb-2">
            <label class="text-sm" for="firstname">First Name</label>
            <UIInput type="text" id="firstname" v-model="formExaminee.first_name" required />
        </div>
        <div class="mb-2">
            <label class="text-sm" for="middlename">Middle Name</label>
            <UIInput type="text" id="middlename" v-model="formExaminee.middle_name" required />
        </div>
        <div class="mb-2">
            <label class="text-sm" for="lastname">Last Name</label>
            <UIInput type="text" id="lastname" v-model="formExaminee.last_name" required />
        </div>

        <div class="border-t border-colorBorder pt-2">
            <UIButton type="button" v-if="isUpdate" size="block" class="bg-danger mb-2" @click="reset">
                Reset
            </UIButton>
            <UIButton type="submit" class="bg-primary " size="block">
                {{ isUpdate ? 'Update' : 'Submit' }}
            </UIButton>

        </div>
    </form>
</template>

<script setup>

const emits = defineEmits(['dataExaminee', 'reset'])
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
const { $id } = useNuxtApp();
const formExaminee = ref({
    first_name: '',
    middle_name: '',
    last_name: ''
})

const submitExaminee = () => {
    let data
    if (!isUpdate.value) {
        data = {
            ...formExaminee.value,
            username: $id,
            password: $id
        }
    } else {
        data = {
            ...formExaminee.value
        }
    }

    emits('dataExaminee', data)
}

const reset = () => {
    emits('reset')
}

watch(
    formData,
    (newData) => {
        if (newData && JSON.stringify(formExaminee.value) !== JSON.stringify(newData)) {
            formExaminee.value = { ...newData }
        }
    },
    { deep: true }
)
</script>