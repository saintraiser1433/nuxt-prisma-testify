<template>
    <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12 lg:col-span-4">
            <RecordInformation :data="dataResults" />

        </div>
        <div class="col-span-12 lg:col-span-8">
            <RecordCourseRecommend :data="courseData" />
        </div>
    </div>

</template>

<script setup lang="ts">


definePageMeta({
    requiredRole: 'admin',

})
useSeoMeta({
    title: 'Testify Rankings Module',
    description: 'Rankings',
    ogTitle: 'Testify Rankings Module',
    ogDescription: 'Rankings'
});



const { payload, static: stat } = useNuxtApp()
const { setToast } = useToasts();
const courseData = ref<CourseModel[]>([]);
const status = ref(false);

const fetchCourse = async () => {
    status.value = true;
    try {
        const { data, error } = await useAPI<CourseModel[]>('/course', {
            getCachedData(key) {
                const data = payload.data[key] || stat.data[key]
                return data;
            },
            server: false
        })

        if (error.value) {
            throw new Error(error.value.message || 'Failed to fetch items')
        }

        courseData.value = data.value || [];
    } catch (error) {
        setToast('error', error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
        status.value = false;
    }
}

await fetchCourse();



















</script>
