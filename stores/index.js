export const useStore = defineStore("counter", {
  state: () => ({
    isOpen: true,
  }),
  getters: {
    getToggleState: (state) => state.isOpen,
    getFooter: (state) => state.footerName,
  },
  actions: {
    toggleState() {
      this.isOpen = !this.isOpen;
    },
  },
});
