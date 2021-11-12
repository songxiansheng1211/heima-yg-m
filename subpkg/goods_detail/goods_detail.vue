<template>
  <view v-if="goods_info.goods_name" class="goods-detail">
    <!-- 轮播 -->
    <swiper indicator-dots="true" autoplay="true" interval="3000" duration="1000" circular="true">
      <swiper-item v-for="(item,index) in goods_info.pics" :key="index">
        <image :src="item.pics_big" @click="preview(index)" class="imgs"></image>
      </swiper-item>
    </swiper>
    <view class="goods-property">
      <view class="goods-price">￥{{goods_info.goods_price | price}}</view>
      <view class="goods-explain">
        <view class="goods-name">
          {{goods_info.goods_name}}
        </view>
        <view class="goods-collect">
          <uni-icons type="star" size="18"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <view class="goods-courier">
        快递，免运费
      </view>
    </view>
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    <view class="goods-bottom-button">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
        @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  // import uniGoodsNav from '@/uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.vue'
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        goods_info: {},
        options: [{
            icon: 'shop',
            text: '店铺'
          },
          {
            icon: 'cart',
            text: '购物车',
            info: null
          }
        ],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },
    // components:{
    //   uniGoodsNav
    // },
    onLoad(options) {

      this.getGoodsDetial(options.goods_id)
    },
    computed: {
      ...mapState('m_cart', ['cart']),
      ...mapGetters('m_cart', ['total'])
    },
    watch: {
      total: {
        handler(newVal) {
          const result = this.options.find(item => item.text === '购物车')
          if (result) {
            result.info = newVal
          }
        },
        immediate: true
      }
    },
    methods: {
      ...mapMutations('m_cart', ['addCart']),
      async getGoodsDetial(id) {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/detail?goods_id=' + id)
        if (res.meta.status !== 200) return uni.$showMsg()
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ')
          .replace(/webp/g, 'jpg')
        this.goods_info = res.message
      },
      preview(index) {
        uni.previewImage({
          current: index,
          urls: this.goods_info.pics.map(x => x.pics_big)
        })
      },
      onClick(i) {
        if (i.content.text === '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      buttonClick(i) {
        console.log(i);
        if (i.content.text === '加入购物车') {
          const cartInfo = {
            goods_id: this.goods_info.goods_id,
            goods_name: this.goods_info.goods_name,
            goods_price: this.goods_info.goods_price,
            goods_count: 1,
            goods_small_logo: this.goods_info.goods_small_logo,
            goods_state: true
          }
          this.addCart(cartInfo)
        }
      }
    },
    filters: {
      price(pri) {
        return Number(pri).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
  .goods-detail {
    padding-bottom: 50px;
  }

  swiper {
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .goods-property {
    padding: 10px;

    .goods-price {
      font-size: 18px;
      color: #C00000;
      margin: 10px 0;
    }

    .goods-explain {
      display: flex;
      justify-content: space-between;

      .goods-name {
        font-size: 12px;
        margin-right: 10px;
        border-right: 1px solid #efefef;
      }

      .goods-collect {
        width: 120px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        color: gray;
      }
    }

    .goods-courier {
      font-size: 12px;
      margin: 10px 0;
      color: gray;
    }
  }

  .goods-bottom-button {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
  }
</style>
