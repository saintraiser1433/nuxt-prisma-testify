export const useAuthentication = defineStore("auth", {
    state: () => ({
      isAuthenticate: false,
      role:
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
  