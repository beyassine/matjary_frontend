const state = {
    isOpen: false,
};

const getters = {
    getOpen: state => state.isOpen,
};

const actions = {
    toggleOpen(context, isOpen) {
        context.commit('setOpen', isOpen)
    },
};

const mutations = {
    setOpen: (state, toggle) => (
        state.isOpen = toggle
    ),
};

export default {
    state,
    getters,
    actions,
    mutations
};