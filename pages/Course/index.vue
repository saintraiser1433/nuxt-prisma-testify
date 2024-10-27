<template>
    <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->

    <div class="grid grid-cols-5 gap-5">
        <div class="col-span-5 lg:col-span-1 ">
            <UICard title="Course Information">
                <template #default>
                    <CourseForm :isUpdate="isUpdate" :formData="data" @dataCourse="submitCourse" @reset="resetInstance">
                    </CourseForm>
                </template>
            </UICard>

        </div>
        <div class="col-span-5 lg:col-span-4 ">
            <UICard title="List of Course's">
                <template #default>
                    <CourseList :courseData="course" @update="editCourse" @delete="removeCourse">
                    </CourseList>
                </template>
            </UICard>
        </div>
    </div>
    {{ deansInfo }}
</template>

<script setup>
const { setToast } = useToast()
const { setAlert } = useAlert()
const { createCourse, updateCourse, deleteCourse } = useCourse()
const data = ref({})
const isUpdate = ref(false)



const { data: course, status, error, refresh } = await useFetch('/api/course', {
    method: 'GET',
    // lazy: true,
    // transform: (_course) => {
    //     return _course.map((course) => {
    //         return {
    //             course_id: course.course_id,
    //             description: course.description,
    //             score: course.score
    //         }
    //     })
    // }

});

/* Course */
const submitCourse = async (data) => {
    try {
        if (!isUpdate.value) {
            const response = await createCourse(data);
            setToast('success', response.message)
        } else {
            const response = await updateCourse(data, data.course_id)
            setToast('success', response.message)
        }
        refresh();
        resetInstance();
    } catch (error) {
        setToast('error', error.statusMessage || 'An error occurred');
    }
}


const editCourse = (response) => {

    console.log(response);
    data.value = response
    isUpdate.value = true
}

const removeCourse = (id) => {
    setAlert('warning', 'Are you sure you want to delete?', '', 'Confirm delete').then(
        async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteCourse(id);
                    setToast('success', response.message);
                    refresh();
                } catch (error) {
                    setToast('error', error.statusMessage || 'An error occurred');
                }
            }
        }
    )
}


const resetInstance = () => {
    isUpdate.value = false
    data.value = {}
}





</script>