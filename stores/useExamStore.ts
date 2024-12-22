export const useExamStore = defineStore('examStore', {
    state: () => ({
        refetch: 0,
        timelimit: ''
    }),
    actions: {
        setExam() {
            this.refetch++;
        },
        setTimeLimit(payload: string) {
            this.timelimit = payload;
        },
    },
})

