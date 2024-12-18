export const useExamStore = defineStore('examStore', {
    state: () => ({
        refetch: 0,
        timelimit: 1
    }),
    actions: {
        setExam() {
            this.refetch++;
        },
        setTimeLimit(payload: number) {
            this.timelimit = payload;
        },
    },
})

