<template>
    <form @submit.prevent="submitCourse">
        <div class="py-5">
            <label class="text-sm" for="course">Course:</label>
            <UISelector id="course" class="text-base" v-model.number="courseId" :data="courseData"></UISelector>
        </div>
        <div class="border-t border-colorBorder pt-2">
            <UIButton type="submit" variant="primary" size="sm">Submit</UIButton>
        </div>
    </form>
</template>

<script setup>

const props = defineProps({
    deansId: Number,
    courseList: Object
})
const { deansId, courseList } = toRefs(props)

const emits = defineEmits(['dataAssign', 'reset'])
const courseId = ref(null);


const courseData = computed(() => {
    return courseList.value.map((item) => ({
        id: item.course_id,
        value: item.description,
    }))
})


const submitCourse = () => {
    const data = {
        deans_id: deansId.value,
        course_id: courseId.value
    }
    emits('dataAssign', { ...data })
    courseId.value = null
}


</script>