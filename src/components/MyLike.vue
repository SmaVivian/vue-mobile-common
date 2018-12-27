<template>
  <div class="cmp-like">
    <i class="cmp-icon-like" :class="['cmp-icon-like', isMyLike ? 'active' : '']" @click.stop="changeLike"></i>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
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
    // 其他入参
    type: {
      type: String,
      default: ''
    },
    // 成功回调
    callback: Function  
  },
  data() {
    return {
      isMyLike: this.isLike
    }
  },
  // watch:{
  //   isLike(newVal, oldVal) {
  //     this.isMyLike = newVal;
  //   }
  // },
  methods: {
    changeLike() {
      // 接口联调时注释
      // 是否有回调
      if(!this.callback) {
        this.isMyLike = !this.isMyLike;
      } else {
        this.callback(this.likeId);  // 删除
      }

      // 接口联调时打开
      // this.addLike();
    },
    // 添加/取消收藏
    addLike() {
      if(!this.$store.state.user.userid) {
        this.$router.push({path: '/demo/login'});
        return;
      }
      this.$http.get('/appCollectionrelation/updateCollectionStatus.do',{
        userId: this.$store.state.user.userid,
        cid: this.likeId,   // 藏品id或主题展id,根据type类型划分
        type: this.type,   // 收藏类型； 1：专题 2：藏品'
        hasCollected: this.isMyLike ? '0' : '1'
      }).then((res) => {
        if(res.success == 1) {
          if(!this.callback) {
            this.isMyLike = !this.isMyLike;
          } else {
            this.callback(this.likeId);  // 删除
          }
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
.cmp-icon-like {
	display: block;
	background: url('~@assets/images/cmp/shoucang.png') center center no-repeat;
	background-size: 100%;
	position: absolute;
  width: 1.14rem;
  height: .98rem;
  top: 0.31rem;
  right: 0.31rem;
	z-index: 2;
}

.cmp-icon-like.active {
  background: url('~@assets/images/cmp/shoucang_2.png') center center no-repeat;
  background-size: 100% 100%;
}
</style>
