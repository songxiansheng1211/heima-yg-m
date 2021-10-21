<template>
  <view>
    <view>
      <uni-search-bar :radius="100" @input="input" cancelButton="none" class="search-bar" placeholder="请输入商品名称">
      </uni-search-bar>
    </view>
    <view class="sugg-list" v-if="thinkPad.length !== 0">
      <view class="sugg-item" v-for="(item,index) in thinkPad" :key="index" @click="goToGoods(item)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <view class="history-warp" v-else>
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="16" @click="clearHistory"></uni-icons>
      </view>
      <view class="history-list-warp">
        <!-- <view class="history-item" v-for="(item,index) in historyList" :key="index">{{item}}</view> -->
        <uni-tag class="history-item" :text="item" v-for="(item,i) in historys" :key="i" @click="goToGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        kw: '',
        thinkPad: [],
        historyList: []
      };
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    computed: {
      historys() {
        return [...this.historyList].reverse()
      }
    },
    methods: {
      input(e) {
        // 防抖处理
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.kw = e
          this.getThinkPad()
        }, 500)
      },
      async getThinkPad() {
        if (this.kw.length === 0) {
          this.thinkPad = []
          return
        } else {
          const {
            data: res
          } = await uni.$http.get('/api/public/v1/goods/qsearch?query=' + this.kw)
          if (res.meta.status !== 200) {
            return uni.$showMsg()
          } else {
            this.thinkPad = res.message
            this.saveSearchHistory()
          }
        }
      },
      goToGoods(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      saveSearchHistory() {
        this.historyList.push(this.kw)
        // 关键词重复
        const y = new Set(this.historyList)
        y.delete(this.kw)
        y.add(this.kw)
        this.historyList = Array.from(y)
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      clearHistory() {
        this.historyList = []
        uni.setStorageSync('kw', '[]')
      },
      goToGoodsList(item) {
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query=' + item
        })
      }
    }
  }
</script>

<style lang="scss">
  .search-bar {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .sugg-list {
    padding: 0 5px;

    .sugg-item {
      font-size: 12px;
      margin: 13px 0;
      border-bottom: 1px solid #efefef;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .goods-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }

  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #efefef;
    padding: 13px 5px;
    font-size: 12px;
    // margin: 13px 0;
  }

  .history-item {
    // width: 30px;
    margin: 5px 0 5px 5px;
    // padding: 0 5px;
    // height: 30px;
    // margin-left: 5px;
    // text-align: center;
    font-size: 12px;
    // line-height: 30px;
  }

  .history-list-warp {
    display: flex;
    flex-wrap: wrap;
  }
</style>
