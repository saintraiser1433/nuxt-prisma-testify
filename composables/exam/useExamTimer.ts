export const useExamTimer = () => {
    const store = useExamStore();
    const remainingSeconds = ref(0);
    let countDownInterval: ReturnType<typeof setInterval> | null = null;

    const stopTimer = () => {
        if (countDownInterval) {
            clearInterval(countDownInterval);
            countDownInterval = null;
        }
    };

    const startTimerWithCallBack = (newTime: number, onTimeUp: () => void) => {
        stopTimer();

        if (typeof newTime === 'number') {
            remainingSeconds.value = newTime;
        }

        countDownInterval = setInterval(() => {
            if (remainingSeconds.value > 0) {
                remainingSeconds.value--;
                store.setTimeLimit(formatTime(remainingSeconds.value));
            } else {
                stopTimer();
                onTimeUp();
            }
        }, 1000);
    };

    const startTimerNavigation = (newTime: number, path: string) => {
        stopTimer();

        if (typeof newTime === 'number') {
            remainingSeconds.value = newTime;
        }

        countDownInterval = setInterval(async () => {
            if (remainingSeconds.value > 0) {
                remainingSeconds.value--;
                store.setTimeLimit(formatTime(remainingSeconds.value));
            } else {
                stopTimer();
                await navigateTo({ name: path })
            }
        }, 1000);
    };


    // Clean up on component unmount
    onUnmounted(stopTimer);

    return {
        remainingSeconds,
        startTimerWithCallBack,
        startTimerNavigation,
        stopTimer,
    };
};

const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMins = mins < 10 ? '0' + mins : mins;
    const formattedSecs = secs < 10 ? '0' + secs : secs;

    return `${formattedHours}:${formattedMins}:${formattedSecs}`;
}