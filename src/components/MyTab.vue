<template>
  <div class="cmp-tab">
    <div class="tab-wrap scrollable">
      <div class="tab-item" 
        v-for="(item, index) in dataList" 
        :class="{'active': index === activeIndex}"
        @click="clickTab(index)"
        :key="index">
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cmpTab',
  props: {
    dataTab: {
      type: Array,
      default: []
    },
    callback: Function
  },
  data() {
    return {
      activeIndex: 0,
      dataList: this.dataTab
    }
  },
  methods: {
    clickTab(index) {
      this.activeIndex = index;
      this.callback(this.dataList[this.activeIndex].id);
    }
  },
  mounted() {
  }
}
</script>


<style lang="less" scoped>
  .cmp-tab {
    height: 44px;
    top: 0;
    left: 0;
    right: 0;
    overflow: hidden;    /*隐藏滚动条*/
    position: relative;
    .tab-wrap {
      display: flex;
      background-color: #fff;
      height: 44px;
      position: relative;
      &.scrollable {
        overflow-y: hidden; 
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;   /*解决ios上滑动不流畅*/
        box-sizing: content-box;
        padding-bottom: 20px;  /*隐藏滚动条*/
        &::-webkit-scrollbar{
          display: none;
        }
        .tab-item {
          flex: 0 0 22%;
        }
      }
      .tab-item {
        display: block;
        flex: 1;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background: linear-gradient(180deg, #e5e5e5, #e5e5e5, rgba(229, 229, 229, 0)) bottom left no-repeat;
        background-size: 100% 1px;
        font-size: 14px;
        text-align: center;
        line-height: 44px;
        color: #666;
        &.active {
          color: rgb(252, 55, 140);
          border-bottom: solid 2px rgb(252, 55, 140);
        }
      }
    }
  }
</style>
