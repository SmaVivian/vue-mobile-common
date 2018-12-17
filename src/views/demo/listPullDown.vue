<template>
<!-- 下拉刷新Demo -->
  <div class="page-list-infinite">
    <mt-loadmore :top-method="loadTop" :topDistance="60" ref="loadmore">
      <ul class="m-list-wrap"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <router-link tag="li" class="m-list" flex="dir:left cross:center" 
          v-for="(item, index) in dataList" 
          :to="{path: '/list/pulldown/detail', query: {id: item.id}}"
          :key="index">
          <img :src="item.pageUrl || ''" alt="">
          <div class="content" flex="dir:top">
            <p class="ell">{{item.infoTopic}}</p>
            <p>...</p>
          </div>
        </router-link>
      </ul>

      <div class="g-loading-text" v-show="loadingTextBtn">
        <mt-spinner v-if="(allLoaded==false)" type="snake" :size="16"></mt-spinner>
        <span class="text" v-text="loadingText"></span>
      </div>

      <div class="g-no-data" v-if="dataList.length === 0 && !loadingTextBtn">
        <div class="no-data-bg"></div>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      inPage: true,   // 进入页面
      isFirst: true,
      // defaultImg: this.$store.state.user.defaultImg,
      loading: false, //为false会加载更多数据
      loadingTextBtn: true,
      loadingText: "正在加载更多",
      allLoaded: false,

      dataList: [],
      size: 10,
      currentPage: 0
    }
  },
  methods: {
    // 下拉刷新
    loadTop() {
      this.currentPage = 1;
      [this.dataList, this.loadingText, this.allLoaded] = [[], '正在加载更多', false];   // es6之解构赋值
      this.$refs.loadmore.onTopLoaded();
      this.getData(true);
    },
    loadMore() {
      console.log(this.currentPage, this.loading)

      this.currentPage++;
      this.loading = true;
      this.getData();
    },
    getData() {
      this.loadingTextBtn=true;
      // debugger
      // mock数据
      // this.$http.get("/demo/listcommon", {
      // 有数据
      this.$http.get("/pc/esaleInfo/getListData.do", {
      // 无数据
      // this.$http.get("/pc/conllection/getListData.do?key=&collectionType=A0211_33&collectionYear=", {
        museumId: '',
        type: '',
        size: this.size,
        currentPage: this.currentPage
      }).then(res => {
        if(res.success === 1) {
          this.loading = res.data.length > 0 ? false : true;
          console.log('ajax',this.loading)
          this.allLoaded = this.currentPage >= res.page.totalPage ? true : false;
          this.loadingText = this.allLoaded ? '已全部加载' : '正在加载更多';
          if(this.isFirst) {
            this.isFirst = false;
            this.dataList = res.data;
            this.loadingTextBtn = false;
          } else {
            this.dataList = this.dataList.concat(res.data);
            this.loadingTextBtn = this.allLoaded ? true : false;
          }

          // 离开页面禁止滚动
          !this.inPage && (this.loading = true);
        } else {
          Toast({
            message: error.message,
            position: 'bottom'
          });
          this.loadingTextBtn = false;
        }
      }, error => {
        console.log('异常');
      })
    }
  },
  mounted() {
    // this.getData();
  },
  activated() {
    this.inPage = true;  // 进入页面
    !this.isFirst && (this.loading = this.allLoaded);  // 取缓存页面是否还有更多数据
    console.log('activated',this.loading)
  },
  deactivated() {
    this.inPage = false;  // 离开页面
    this.loading = true;  // 禁止滚动加载数据
    console.log('deactivated',this.loading)
  }
  // beforeRouteLeave(to, from, next) {
  //   console.log(to.name)
  //   if(to.name == 'DemoList') {//返回主页
  //     from.meta.keepAlive = false //不缓存搜索页
  //   } else if(to.name == 'ListPullDownDetail') {//进入详情页
  //     from.meta.keepAlive = true //缓存搜索页
  //   }
  //   next()
  // }
}
</script>

<style lang="less" scoped>
  .m-list-wrap {
    .m-list {
      height: 4rem;
      border-bottom: solid 1px #ececec;
      img {
        width: 5rem;
        height: 100%;
      }
      .content {
        padding-left: .5rem;
        width: 13rem;
      }
    }
  }
</style>