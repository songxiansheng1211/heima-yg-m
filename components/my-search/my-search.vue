<template>
  <view class="my-search-contaniner" :style="{'background-color': bgcolor}" @click="goSearch">
    <view class="my-search-box" :style="{'border-radius': radius + 'px'}">
      <uni-icons type="search" size="16"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-search",
    data() {
      return {

      };
    },
    props: {
      bgcolor: {
        type: String,
        default: '#C00000'
      },
      radius: {
        type: Number,
        default: 16
      }
    },
    methods:{
      goSearch() {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
  .my-search-contaniner {
    height: 50px;
    // background-color: #C00000;
    display: flex;
    align-items: center;
    padding: 0 10px;

    .my-search-box {
      height: 32px;
      width: 100%;
      background-color: #FFFFFF;
      // border-radius: 16px;
      display: flex;
      justify-content: center;
      align-items: center;

      .placeholder {
        font-size: 12px;
        margin-left: 3px;
      }
    }
  }
</style>
