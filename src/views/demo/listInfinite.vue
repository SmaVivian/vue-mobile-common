<template>
<!-- 列表无限加载Demo -->
  <div class="page-list-infinite">
    <ul class="m-list-wrap"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <li class="m-list" flex="dir:left cross:center" v-for="(item, index) in dataList" :key="index">
        <img :src="item.pageUrl || ''" alt="">
        <div class="content" flex="dir:top">
          <p>123</p>
          <p>塑料袋开发建设地方</p>
        </div>
      </li>
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
      // defaultImg: this.$store.state.user.defaultImg,
      loading: true, //为false会加载更多数据
      loadingTextBtn: true,
      loadingText: "正在加载更多",
      allLoaded: false,

      dataList: [],
      size: 10,
      currentPage: 1
    }
  },
  methods: {
    loadMore() {
      console.log(111111111)
      this.currentPage++;
      this.loading = true;
      this.getData();
    },
    getData(isFirst) {
      console.log(isFirst)
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
        console.log('data1:', res);
        if(res.success === 1) {
          this.loading = res.data.length > 0 ? false : true;
          this.allLoaded = this.currentPage >= res.page.totalPage ? true : false;
          this.loadingText = this.allLoaded ? '已全部加载' : '正在加载更多';
          if(isFirst) {
            this.dataList = res.data;
            this.loadingTextBtn = false;
          } else {
            this.dataList = this.dataList.concat(res.data);
            this.loadingTextBtn = this.allLoaded ? true : false;
          }
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
    this.getData(true);
  }
}
</script>

