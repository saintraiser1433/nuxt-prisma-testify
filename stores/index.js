export const useStore = defineStore("counter", {
  state: () => ({
    isOpen: true,
    examTitle: "",
  }),
  getters: {
    getToggleState: (state) => state.isOpen,
    getFooter: (state) => state.footerName,
    getExamTitle: (state) => state.examTitle,
  },
  actions: {
    toggleState() {
      this.isOpen = !this.isOpen;
    },
    toggleExamTitle(data) {
      this.examTitle = data;
    },
  },
});
