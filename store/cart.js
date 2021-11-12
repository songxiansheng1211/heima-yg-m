export default {
  namespaced: true,
  state: () => ({
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
    // cart: []
  }),
  mutations: {
    addCart(state, goods) {
      const result = state.cart.find(item => item.goods_id === goods.goods_id)
      if (!result) {
        state.cart.push(goods)
      } else {
        result.goods_count++
      }
      this.commit('m_cart/saveToStorage')
    },
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    updateGoodsState(state, goods) {
      const status = state.cart.find(item => item.goods_id === goods.goods_id)
      if (status) {
        status.goods_state = goods.goods_state
        this.commit('m_cart/saveToStorage')
      }
    },
    updateGoodsCount(state, goods) {
      const status = state.cart.find(item => item.goods_id === goods.goods_id)
      if (status) {
        status.goods_count = goods.goods_count
        this.commit('m_cart/saveToStorage')
      }
    },
    // 更改全部状态
    updateAllGoodsStatus(state, newStatus) {
      state.cart.forEach(item => {
        item.goods_state = newStatus
      })
      this.commit('m_cart/saveToStorage')
    },
    removeById(state, goods_id) {
      state.cart = state.cart.filter(item => item.goods_id !== goods_id)
      this.commit('m_cart/saveToStorage')
    }
  },
  getters: {
    total(state) {
      // let c = 0
      // state.cart.forEach(goods => c += goods.goods_count)
      // return c
      return state.cart.reduce((total, item) => {
        return total += item.goods_count
      }, 0)
    },
    // 统计结算数量
    checkedCount(state) {
      return state.cart.filter(x => x.goods_state).reduce((total, item) => {
        return total += item.goods_count
      }, 0)
    },
    // 结算价格
    checkGoodsAmount(state){
      return state.cart.filter(x => x.goods_state).reduce((totalPrice,itemPrice) => {
        return  totalPrice += itemPrice.goods_price * itemPrice.goods_count
      },0).toFixed(2)
    }
  }
}
