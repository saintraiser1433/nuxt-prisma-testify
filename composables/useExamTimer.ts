export const useExamTimer = (initialTime: number, onTimeUp: () => void) => {
    const store = useExamStore();
    const remainingSeconds = ref(initialTime); 
    let countDownInterval: ReturnType<typeof setInterval> | null = null;

    const startTimer = () => {
        if (countDownInterval) clearInterval(countDownInterval);

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

    const stopTimer = () => {
        if (countDownInterval) {
            clearInterval(countDownInterval);
            countDownInterval = null;
        }
    };

    onUnmounted(stopTimer);

    return {
        remainingSeconds,
        startTimer,
        stopTimer
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