export const storeUser = defineStore("user", {
    state: () => ({
        user: [] as User,
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
