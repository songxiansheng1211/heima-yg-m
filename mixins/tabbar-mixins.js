import {
    mapGetters
  } from 'vuex'

	export default {
		data() {
			return {
				
			};
		},
    onShow() {
      this.setTabBar()
    },
    watch:{
      total() {
        this.setTabBar()
      }
    },
    computed:{
      ...mapGetters('m_cart',['total'])
    },
    methods:{
      setTabBar() {
        uni.setTabBarBadge({
          index: 2,
          text: this.total + ''  // text 必须是 字符串不能是数字
        })
      }
    }
	}