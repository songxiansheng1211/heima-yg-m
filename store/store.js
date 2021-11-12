import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from '@/store/cart.js'
import moudusUser from '@/store/user.js'

Vue.use(Vuex)
 const store = new Vuex.Store({
  modules: {
    'm_cart': moduleCart,
    'm_user': moudusUser
  }
})

export default store