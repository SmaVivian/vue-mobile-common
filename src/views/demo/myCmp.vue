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

    <div class="item">
      <span>计数器：</span>
      <my-count-down v-model="time1" @on-finish="finish"></my-count-down>
    </div>
    <div class="item">
      <span @click="startTime2">计数器2(手动点击)：</span>
      <my-count-down v-model="time2" :start="start" @on-finish="finish2" v-show="show"></my-count-down>
    </div>

    <div class="item">
      <span>Marquee1：</span>
      <my-cmp-marquee :arrMarquee="arr2"></my-cmp-marquee>
    </div>

    <div class="item">
      <span>Marquee：</span>
      <my-cmp-marquee :arrMarquee="arr2" :direction="`down`" :interval="5000" :duration="1000" :itemHeight="50"></my-cmp-marquee>
    </div>
  </div>
</template>

<script>
import myCmpLike from '@/components/MyLike'
import myCountDown from '@/components/MyCountDown'
import myCmpMarquee from '@/components/MyMarquee'
export default {
  components: {
    myCmpLike,
    myCountDown,
    myCmpMarquee
  },
  data() {
    return {
      // 收藏/点赞
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
      ],

      // 计数器
      show: true,
      time1: 15,
      time2: 5,
      value: '',
      start: false,
      
      // Marquee
      arr2: [
        {
          name: '扣水电费离开水电费1'
        },
        {
          name: '扣水电费离开水电费2'
        },
        {
          name: '扣水电费离开水电费3'
        },
        {
          name: '扣水电费离开水电费4'
        },
        {
          name: '扣水电费离开水电费5'
        },
        {
          name: '扣水电费离开水电费6'
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
    },
    finish(index) {
      // this.show = false
      // this.value = 'completed'
      console.log('current index', index)
    },
    startTime2() {
      this.start = true;
    },
    finish2 (index) {
      // this.start = false
      this.show = false
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


