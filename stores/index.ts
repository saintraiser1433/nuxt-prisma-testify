export const useStore = defineStore("counter", {
  state: () => ({
    isOpen: true,
  }),
  getters: {
    getToggleState: (state) => state.isOpen,
  },
  actions: {
    toggleState() {
      this.isOpen = !this.isOpen;
    },
  },
});
