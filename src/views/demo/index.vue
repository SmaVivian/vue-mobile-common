<template>
  <div class="home">
    这里是首页 <span>用户状态：{{aaa}}</span>
    <p class="test-rem" @click="changeUserState('vivi')">测试修改状态及rem自适应宽度测试修改状态及rem自适应宽度测试修改状态及rem自适应宽度测试修改状态及rem自适应宽度</p>
    <mt-button @click.native="handleClick">测试mint-ui按钮</mt-button>
    <HelloWorld></HelloWorld>
  </div>
</template>

<style lang="less" scoped>
  @import '../../assets/css/mixin.less';
  .test-rem {
    width: 5rem;
    background: #84d5da;
    font-size: @title;
    #f-radius(5px);
    // #f-textoverflow(2);
  }
</style>

<script>
import HelloWorld from "@cmp/HelloWorld";
export default {
  components: {
    HelloWorld
  },
  data() {
    return {}
  },
  computed: {
    aaa() {
      return this.$store.state.user.userInfo;
    }
  },
  methods: {
    changeUserState(info) {
      console.log(info)
      this.$store.dispatch('setUserIfo', info);
    },
    handleClick() {
      this.$toast('Hello world!')  // 测试mint-ui
    },
    getData() {
      // this.$http.get('/stp-web/route/list', {
      //   keyWord: '',
      //   orderType: 0,
      //   orderName: 1,
      //   scenicSpot: '',
      //   currentPageNo: 1,
      //   pageSize: 10,
      //   travelDays: '',
      //   searchPriceMax: '',
      //   searchPriceMin: '',
      //   hotelStar: '',
      //   startDate: ''
      // }).then(response => {
      //   console.log('data:', response);
      // }, error => {
      //   console.log('异常');
      // })
    }
  },
  mounted() {
    this.getData();
  },
  created() {
      
  },
}
</script>
