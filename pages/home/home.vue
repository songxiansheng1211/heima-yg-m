<template>
  <view>
    <view class="my-search-box">
      <my-search @click="goToSearch"></my-search>
    </view>
    <!-- 轮播图区域 -->
    <swiper class="swiper" indicator-dots="true" autoplay="true" interval="3000" duration="1000" circular="true">
      <swiper-item v-for="(item,index) in swiperList" :key="index">
        <navigator class="swiper-item" :url="'../../subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航区域 -->
    <view class="catitems">
      <view class="catitems-item" v-for="(item,index) in catitems" :key="index" @click="navClickHandle(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
    <!-- 楼层展示 -->
    <view class="floot">
      <view class="floot-item" v-for="(item,index) in flootList" :key="index">
        <image :src="item.floor_title.image_src" class="floot-title"></image>
        <view class="floot-image">
          <navigator class="floot-left-iamge" :url="item.product_list[0].url">
            <!-- mode设置图片高度自适应 -->
            <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width +'rpx'}"
              mode="widthFix">
            </image>
          </navigator>
          <view class="floot-right-images">
            <navigator class="floot-right-item" v-for="(img,i2) in item.product_list" :key="i2" v-if="i2 !== 0"
              :url="img.url">
              <image :src="img.image_src" :style="{width: img.image_width + 'rpx'}" mode="widthFix"></image>
            </navigator>
          </view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 轮播图列表
        swiperList: [],
        catitems: [],
        flootList: []
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getCatitems()
      this.getFlootList()
    },
    methods: {
      goToSearch() {
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
      },
      async getSwiperList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata')
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        } else {
          this.swiperList = res.message
        }
      },
      async getCatitems() {
        const res = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.data.meta.status !== 200) {
          return uni.$showMsg()
        } else {
          this.catitems = res.data.message
        }
      },
      navClickHandle(item) {
        if (item.name === '分类') {
          uni.switchTab({
            url: '../cate/cate'
          })
        }
      },
      async getFlootList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        } else {
          res.message.forEach(floot => {
            floot.product_list.forEach(item => {
              item.url = '/subpkg/goods_list/goods_list?' + item.navigator_url.split('?')[1]
            })
          })
          this.flootList = res.message
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  swiper {
    height: 330rpx;
    //   swiper-item,
    //   image {
    //     height: 100%;
    //     width: 100%;
    //   }
  }

  .catitems {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floot-title {
    width: 100%;
    height: 60rpx
  }

  .floot-image {
    display: flex;
    padding-left: 10rpx;
  }

  .floot-right-images {
    display: flex;
    // flex-wrap: wrap;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .my-search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }
</style>
