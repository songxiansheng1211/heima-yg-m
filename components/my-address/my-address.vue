<template>
  <view>
    <view class="address-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" class="address-btn" @click="chooseAddress">请选择收获地址+</button>
    </view>
    <!-- 渲染收货信息 -->
    <view class="address-info" v-else @click="chooseAddress">
      <view class="row1">
        <view class="row1-left">
          <view class="username">
            收货人：{{address.userName}}
          </view>
        </view>
        <view class="row1-right">
          <view class="phone">
            电话：{{address.telNumber}}
            <uni-icons type="arrowright" size="16"></uni-icons>
          </view>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">
          收货地址：
        </view>
        <view class="row2-right">
          {{addstr}}
        </view>
      </view>
    </view>
    <image src="/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'
  export default {
    name: "my-address",
    data() {
      return {
      };
    },
    methods: {
      ...mapMutations('m_user',['updateAddress']),
      async chooseAddress() {
        const [err, res] = await uni.chooseAddress().catch(err => err)
        if (err === null && res.errMsg === 'chooseAddress:ok') {
          this.updateAddress(res)
        }
        // console.log(err);
        // 用户没有授权
        if (err === null && res.errMsg === 'chooseAddress:fail auth deny'){
          this.reAuth() //调用reAuth 方法 重新向用户发送授权申请
        }
        // 返回一个数组  第一项为错误项 没有错误一般为null 第二项一般为我们需要的内容
      },
      // 实际中没有出现要求授权问题（）
      async reAuth() {
        const [err2, confirmResult] = await uni.showModal({
          content: '检测到您没打开地址权限，是否取设置打开？',
          confirmText:'确认',
          cancelText: '取消'
        })
        if (err2) {
          return
        }
        if(confirmResult.cancel) return uni.$showMsg('您取消了地址授权！')
        if(confirmResult.confirmText) return uni.openSetting({
          success(settingResult) {
            if(settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功!，请选择地址')
            if(!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权')
          }
        })
      }
    },
    computed: {
      ...mapState('m_user',['address']),
      ...mapGetters('m_user',['addstr'])
    }
  }
</script>

<style lang="scss">
  .address-box {
    height: 90px;
    // line-height: 90px;
    // text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    .address-btn {}
  }

  .address-border {
    display: block;
    width: 100%;
    height: 5px;
  }

  .address-info {
    font-size: 12px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 5px;

    .row1 {
      display: flex;
      justify-content: space-between;

      .row1-left {
        .username {}
      }

      .row1-right {
        display: flex;
        justify-content: space-between;
      }
    }

    .row2 {
      display: flex;
      // justify-content: space-between;
      align-items: center;
      margin-top: 10px;

      .row2-left {
        white-space: nowrap;
      }

      .row2-right {}
    }
  }
</style>
