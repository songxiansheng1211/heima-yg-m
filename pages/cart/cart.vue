<template>
  <view class="cart-container">
    <view v-if="cart.length !== 0">
      <my-address></my-address>
      <view class="cart-header">
        <uni-icons type="shop" size="18"></uni-icons>
        <text class="cart-header-text">购物车</text>
      </view>
      <uni-swipe-action>
        <block class="goods-list" v-for="(goods,i) in cart" :key="i">
          <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandel(goods)">
            <my-goods :goods="goods" :show-radio="true" :showNumber="true" @radio-change="radioChange"
              @number-change="numChange"></my-goods>
          </uni-swipe-action-item>
        </block>
      </uni-swipe-action>
      <!-- 结算 -->
      <my-settlement></my-settlement>
    </view>
    <view class="empty-config" v-else>
      <image src="../../static/cart_empty.png" class="image-config"></image>
      <text class="tip">空空如也</text>
    </view>
  </view>
</template>

<script>
  import myGoods from '../../components/my-goods/my-goods.vue'
  import tarBar from '../../mixins/tabbar-mixins.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#C00000'
          }
        }]
      };
    },
    mixins: [tarBar],
    computed: {
      ...mapState('m_cart', ['cart'])
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeById']),
      radioChange(e) {
        // this.cart.forEach(item => {
        //   if(item.goods_id === e.goods_id) {
        //     item.goods_state = e.goods_state
        //   }
        // })
        this.updateGoodsState(e)
      },
      numChange(e) {
        // console.log(e);
        this.updateGoodsCount(e)
        console.log(this.cart);
      },
      swipeActionClickHandel(goods) {
        this.removeById(goods.goods_id)
      }
    }
  }
</script>

<style lang="scss">
  .cart-container {
    padding-bottom: 50px;
  }
  .cart-header {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 5px;
    font-size: 14px;
    border-bottom: 1px solid #efefef;

    .cart-header-text {
      margin-left: 10px;
    }
  }
  .empty-config {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
    .image-config {
      width: 90px;
      height: 90px;
    }
    .tip {
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }
  }
</style>
