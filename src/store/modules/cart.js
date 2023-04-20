import Cookies from 'js-cookie'

const state = {
    isCart: false
};

const getters = {
    iscart: state => state.isCart,
};

const actions = {
    checkCart(context) {
        var cart = Cookies.get('cart')
        if (cart == undefined) {
            cart = {}
            Cookies.set('cart', JSON.stringify(cart))
            context.commit('setCart', false);
        }
        else{
            var jsoncart= JSON.parse(cart)
            if (Object.keys(jsoncart).length == 0){                
                context.commit('setCart', false);
            }
            else{                
                context.commit('setCart', true);
            }
        }

    },
    setiscart(context){
        context.commit('setCart', true);
    },
    removeiscart(context){
        context.commit('setCart', false);
    }
};

const mutations = {
    setCart: (state, bool) => (
        state.isCart = bool
    ),
};

export default {
    state,
    getters,
    actions,
    mutations
};