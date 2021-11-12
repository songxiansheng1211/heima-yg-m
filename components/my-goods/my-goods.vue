<template>
  <view class="goods-items">
    <view class="goods-left">
      <!-- <image :src="item.goods_big_logo"></image> -->
      <radio v-if="showRadio" :checked="goods.goods_state" color="#c00000" @click="raidoClickHandel"></radio>
      <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
    </view>
    <view class="goods-right">
      <view class="goods-name">{{goods.goods_name}}</view>
      <view class="goods-property">
        <view class="goods-price">
          ￥{{goods.goods_price | price}}
        </view>
        <uni-number-box :min="1" v-model="goods.goods_count" @change="goodsCount" v-if="showNumber"></uni-number-box>
      </view>
    </view>
  </view>
</template>

<script>
  // import {mapGetters} from 'vuex'
  export default {
    name: "my-goods",
    data() {
      return {
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    // computed: {
    //   ...mapGetters('m_cart', ['total'])
    // },
    // watch: {
    //   hander(newVal) {

    //   }
    // }
    props: {
      goods: {
        type: Object,
        default: {}
      },
      showRadio: {
        type: Boolean,
        default: false
      },
      showNumber: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      raidoClickHandel() {
        this.$emit('radio-change', {
          goods_id: this.goods.goods_id,
          goods_state: !this.goods.goods_state
        })
      },
      goodsCount(e) {
        this.$emit('number-change', {
          goods_id: this.goods.goods_id,
          goods_count: e - 0
        })
      }
    },
    filters: {
      price(goodsPrice) {
        return Number(goodsPrice).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
  .goods-items {
    width: 750rpx;
    box-sizing: border-box;
    padding: 10px 5px;
    display: flex;
    border-bottom: 1px solid #efefef;

    .goods-left {
      margin-right: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-right: 5px;

      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;

      .goods-name {
        font-size: 12px;
      }

      .goods-property {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .goods-price {
          color: #c00000;
          font-size: 16px;
        }
      }
    }
  }
</style>
