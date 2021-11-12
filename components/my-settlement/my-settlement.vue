<template>
  <view class="settlement-container">
    <!-- 全选按钮 -->
    <label class="radio" @click="changeAllStatus">
      <radio color="#c00000" :checked="isFullCheck" /><text>全选</text>
    </label>
    <!-- 合计-->
    <view class="amount-box">
      合计：<text class="amount-text">{{checkGoodsAmount}}</text>
    </view>
    <!-- 结算 -->
    <view class="btn-settle">结算({{checkedCount}})</view>
  </view>
</template>

<script>
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
    name:"my-settlement",
    data() {
      return {
        
      };
    },
    computed:{
      ...mapGetters('m_cart',['checkedCount','total','checkGoodsAmount']),
      isFullCheck() {
        return this.total === this.checkedCount
      }
    },
    methods:{
      ...mapMutations('m_cart',['updateAllGoodsStatus']),
      changeAllStatus() {
        this.updateAllGoodsStatus(!this.isFullCheck)
      }
    }
  }
</script>

<style lang="less">
 .settlement-container {
   height: 50px;
   position: fixed;
   left: 0;
   right: 0;
   bottom: 0;
   background-color: white;
   display: flex;
   justify-content: space-between;
   align-items: center;
   font-size: 14px;
   padding-left: 5px;
   .radio {
     display: flex;
     align-items: center; 
   }
   .amount-box {
     .amount-text {
       color: #c00000;
       font-weight: bold;
     }
   }
   .btn-settle {
     background-color: #c00000;
     height: 50px;
     color: white;
     line-height: 50px;
     padding: 0 10px;
     min-width: 80px;
     text-align: center;
   }
 }
</style>
