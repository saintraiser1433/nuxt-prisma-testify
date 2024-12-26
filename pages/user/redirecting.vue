<template>
    <div class="flex justify-center items-center min-h-screen -translate-y-36">
        <UICard :has-header="false" :defaults="{ base: 'max-w-xl px-5 py-10 border-t-4 border-primary' }">
            <div class="flex flex-col justify-center items-center text-center gap-5">
                <h1 class="font-bold">Thank you for taking the exam!</h1>
                <h2 class="font-semibold">We are redirecting you to the home page in:</h2>
                <CircleProgressBar stroke-width="16" size="200" color-filled="#28c76f" :color-unfilled="colorUnfilled"
                    animation-duration="1s" :value="remainingSeconds" :max="10" rounded>
                    <h1 class="font-bold">{{ remainingSeconds }}</h1>
                </CircleProgressBar>
            </div>
        </UICard>
    </div>

</template>
<script lang="ts" setup>
definePageMeta({
    requiredRole: 'examinee',
    layout: 'user'
})


const { remainingSeconds, startTimerNavigation } = useExamTimer();

const colorUnfilled = computed(() => {
    if (remainingSeconds.value >= 1 && remainingSeconds.value <= 2) return '#ff4c51';
    if (remainingSeconds.value >= 3 && remainingSeconds.value <= 4) return '#6147e4';
    if (remainingSeconds.value >= 5 && remainingSeconds.value <= 7) return '#00bad1';
    return '#28c76f';
});

onMounted(() => {
    startTimerNavigation(10, 'user');
})


</script>
