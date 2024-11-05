export const storeUser = defineStore("user", {
    state: () => ({
        user: [],
    }),
    getters: {
        getUser: (state) => state.user,
    },
    actions: {
        setUser(payload: any) {
            this.user = payload;
        },
    },
});
