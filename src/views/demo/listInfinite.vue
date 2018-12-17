<template>
<!-- 列表无限加载Demo -->
  <div class="page-list-infinite">
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
          <p>123</p>
          <p>塑料袋开发建设地方</p>
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
  </div>
</template>

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
      }
    }
  }
</style>

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
    loadMore() {
      console.log(this.currentPage, this.loading)

      this.currentPage++;
      this.loading = true;
      this.getData();
    },
    getData() {
      this.loadingTextBtn=true;
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
          this.allLoaded = this.currentPage >= res.page.totalPage ? true : false;
          this.loadingText = this.allLoaded ? '已全部加载' : '正在加载更多';
          console.log('ajax',this.loading)
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
  activated() {
    this.inPage = true;  // 进入页面
    !this.isFirst && (this.loading = this.allLoaded);  // 取缓存页面是否还有更多数据
  },
  deactivated() {
    this.inPage = false;  // 离开页面
    this.loading = true;  // 禁止滚动加载数据
  }
}
</script>

