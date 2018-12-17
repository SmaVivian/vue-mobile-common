<template>
  <div class="demo-detail">
    <h1>{{dataDetail.infoTopic}}</h1>
    <div v-html="dataDetail.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataDetail: ''
    }
  },
  methods: {
    getData() {
      this.$http.get('/pc/esaleInfo/getInfoDetail.do', {
        id: this.$route.query.id
      }).then(res => {
        console.log('data2:', res);
        this.dataDetail = res.data;
      })
    }
  },
  mounted() {
    this.getData();
  }
}
</script>

<style lang="less">
  .demo-detail { 
    img {
      max-width: 100%;
    }
  }
</style>

<style lang="less" scoped>
  .demo-detail {
    color: #666;
    font-size: .75rem;
    line-height: 1rem;
    
    h1 {
      color: #000;
      text-align: center;
      font-size: .85rem;
      line-height: 2rem;
    }
  }
</style>

