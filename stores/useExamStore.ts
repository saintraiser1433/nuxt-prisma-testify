export const useExamStore = defineStore('examStore', {
    state: () => ({
        refetch: 0
    }),
    actions: {
        setExam() {
            this.refetch++;
        },
    },
})

