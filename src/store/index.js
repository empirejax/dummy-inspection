import { createStore } from 'vuex'

const store = createStore({
    state: {
        leftDrawer: true,
    },
    mutations: {
        toggleLeftDrawer(state) {
            state.leftDrawer = !state.leftDrawer
        },
    }
})

export default store