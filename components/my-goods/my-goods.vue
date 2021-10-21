<template>
  <view class="goods-items">
    <view class="goods-left">
      <!-- <image :src="item.goods_big_logo"></image> -->
      <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
    </view>
    <view class="goods-right">
      <view class="goods-name">{{goods.goods_name}}</view>
      <view class="goods-property">
        <view class="goods-price">
          ￥{{goods.goods_price | price}}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-goods",
    data() {
      return {
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    props: {
      goods: {
        type: Object,
        default: {}
      }
    },
    filters:{
      price(goodsPrice) {
        return Number(goodsPrice).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
  .goods-items {
    padding: 10px 5px;
    display: flex;
    border-bottom: 1px solid #efefef;

    .goods-left {
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

      .goods-name {
        font-size: 12px;
      }

      .goods-property {
        .goods-price {
          color: #c00000;
          font-size: 16px;
        }
      }
    }
  }
</style>
