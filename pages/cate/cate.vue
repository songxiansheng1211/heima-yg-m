<template>
  <view>
    <view class="scroll-view-container">
      <!-- left -->
      <scroll-view class="scrool-left" scroll-y="true" :style="{height: vh + 'px'}">
        <block v-for="(item,index) in cateList" :key="index">
          <view class="scrool-left-item-view" :class="active === index ? 'active' : ''" @click="changeCate(index)">{{item.cat_name}}</view>
        </block>
      </scroll-view>
      <!-- right -->
      <scroll-view scroll-y="true" :style="{height: vh + 'px'}" :scroll-top="scrollTop">
        <view v-for="(item2,index) in cateLevel2" :key="index">
          <view class="cate-level2-item">/{{item2.cat_name}}/</view>
          <view class="cate-level3">
            <view class="cate-level3-item" v-for="(item3,index) in item2.children" :key="index" @click="goGoodsList(item3)">
              <image :src="item3.cat_icon"></image>
              <text>{{item3.cat_name}}</text>
            </view>
          </view>
          </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        vh: 0,
        cateList: [],
        active: 0,
        cateLevel2: [],
        scrollTop: 0
      };
    },
    onLoad() {
      // 获取当前使用设备（手机）的信息
      const sysInfo = uni.getSystemInfoSync()
      this.vh = sysInfo.windowHeight
      this.getCateList()
    },
    methods: {
      async getCateList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/categories')
        if(res.meta.status !== 200) {
          return uni.$showMsg()
        } else {
          this.cateList = res.message
          this.cateLevel2 = this.cateList[0].children
        }
      },
      changeCate(index) {
        this.active = index
        this.cateLevel2 = this.cateList[index].children
        // 只是设置0不生效 因为值没有发生改变
        // 所以在0-1之间切换
        this.scrollTop = this.scrollTop === 0 ? 1 :  0
      },
      goGoodsList(item) {
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?cid=' + item.cat_id
        })
      }
    }
  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;

    .scrool-left {
      width: 120px;

      .scrool-left-item-view {
        background-color: #F7F7F7;
        line-height: 60px;
        text-align: center;
        font-size: 12px;

        &.active {
          background-color: #FFFFFF;
          position: relative;

          &::before {
            content: ' ';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #c00000;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }
        }
      }
    }
    .cate-level2-item {
      text-align: center;
      font-size: 12px;
      font-weight: 700;
      padding: 15px 0;
    }
    .cate-level3 {
      display: flex;
      flex-wrap: wrap;
      .cate-level3-item {
        width: 33.33%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        image {
          width: 60px;
          height: 60px;
        }
        text {
          font-size: 12px;
        }
      }
    }
  }
</style>
