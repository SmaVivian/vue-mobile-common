<template>
  <div class="cmp-like">
    <i class="g-icon-like" :class="['g-icon-like', isMyLike ? 'active' : '']" @click.stop="changeLike"></i>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import { getCookie } from '@/utils/util';
export default {
  name: 'cmpLike',
  props: {
    isLike: {
      type: Boolean,
      default: false
    },
    likeId: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isMyLike: this.isLike
    }
  },
  watch:{
    isLike(newVal, oldVal) {
      this.isMyLike = newVal;
    }
  },
  methods: {
    changeLike() {
      // this.isMyLike = !this.isMyLike;

      // 添加收藏
      this.addLike();
    },
    addLike() {
      if(!getCookie('id')) {
        this.$router.push({path: '/login'});
        return;
      }
      // debugger
      this.$http.get('/appCollectionrelation/updateCollectionStatus.do',{
        userId: getCookie('id'),
        cid: this.likeId,   // 藏品id或主题展id,根据type类型划分
        type: this.type,   // 收藏类型； 1：专题 2：藏品'
        hasCollected: this.isMyLike ? '0' : '1'
      }).then((res) => {
        if(res.success == 1) {
          this.isMyLike = !this.isMyLike;
          Toast({
            message: this.isMyLike?'添加收藏成功':'取消收藏成功',
            position: 'bottom'
          });
        } else {
          Toast({
            message: res.error.message || (this.isMyLike?'取消收藏失败':'添加收藏失败'),
            position: 'bottom'
          });
        }
      })
    }
  },
  mounted() {
    
  },
  activated() {
  }
}
</script>

<style scoped>

</style>
