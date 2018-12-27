<template>
  <div class="page-my-cmp">
    <div class="item g-icon-like-box">
      <span>收藏/点赞：</span>
      <my-cmp-like :isLike="collect==='1'?true:false" :likeId="likeId" :type="`2`"></my-cmp-like>
    </div>
    <div class="item g-icon-like-box" v-for="(item, index) in arr1" :key="index">
      <span>我的收藏列表(点击删除){{item.likeId2}}：</span>
      <my-cmp-like :isLike="item.collect2==='1'?true:false" :likeId="item.likeId2" :callback="deleItem"></my-cmp-like>
    </div>
  </div>
</template>

<script>
import myCmpLike from '@/components/MyLike'
export default {
  components: {
    myCmpLike
  },
  data() {
    return {
      collect: '0',
      likeId: '123323',
      arr1: [
        {
          collect2: '1',
          likeId2: '22222222'
        },
        {
          collect2: '1',
          likeId2: '33333333'
        },
      ]
      
    }
  },
  methods: {
    deleItem(likeId) {
      let index = this.arr1.findIndex((item) => {
        return item.likeId2 === likeId;
      });
      this.arr1.splice(index, 1);
    }
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
  .g-icon-like-box {
    position: relative;
  }

  .page-my-cmp {
    font-size: .75rem;
    color: #666;
    line-height: 1.5rem;
  }
</style>


