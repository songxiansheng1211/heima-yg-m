<template>
  <view>
    <view class="goods-list">
      <view v-for="(item,i) in goodsList" :key="i" @click="goToDetail(item)">
        <my-goods :goods="item"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryForm: {
          cid: '',
          query: '',
          pagenum: 1,
          pagesize: 10
        },
        goodsList: [],
        total: 0,
        isLoading: false
      };
    },
    onLoad(options) {
      this.queryForm.cid = options.cid || ''
      this.queryForm.query = options.query || ''
      this.getGoodsList()
    },
    onReachBottom() {
      // 上拉加载完毕提示
      if(this.queryForm.pagenum * this.queryForm.pagesize >= this.total) return uni.$showMsg('数据加载完毕了！')
      // 节流处理
      if(this.isLoading) return
      this.queryForm.pagenum += 1
      this.getGoodsList()
    },
    onPullDownRefresh() {
      this.queryForm.pagenum = 1
      this.total = 0
      this.isLoading = false
      this.goodsList = []
      this.getGoodsList(() => uni.stopPullDownRefresh())
    },
    methods: {
      async getGoodsList(cd) {
        this.isLoading = true
        const {
          data: res
        } =
        await uni.$http.get('/api/public/v1/goods/search', this.queryForm)
        this.isLoading = false
        // 调用停止下拉刷新
        cd && cd()
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        } else {
          // this.goodsList = res.message.goods
          this.goodsList = [...this.goodsList, ...res.message.goods]
          this.total = res.message.total
        }
      },
      goToDetail(item) {
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      }
    }
  }
</script>

<style lang="scss">
</style>
