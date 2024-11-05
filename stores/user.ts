export const storeUser = defineStore("user", {
    state: () => ({
        user: [] as User | null,
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
