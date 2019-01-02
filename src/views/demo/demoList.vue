<template>
  <div>
    <div class="demo-list" flex="dir:left box:mean cross:center">
      <router-link tag="div" to="/list/infinite" class="item g-1px-r" flex="cross:center main:center">列表无限加载</router-link>
      <router-link tag="div" to="/list/pulldown" class="item g-1px-r" flex="cross:center main:center">列表下拉刷新+图片懒加载</router-link>
      <router-link tag="div" to="/list/tab" class="item" flex="cross:center main:center">tab列表</router-link>
    </div>
    <div class="demo-list" flex="dir:left box:mean">
      <router-link tag="div" to="/demo/login" class="item g-1px-r g-1px-t" flex="cross:center main:center">登录</router-link>
      <router-link tag="div" to="/demo/form" class="item g-1px-r g-1px-t" flex="cross:center main:center">表单校验</router-link>
      <router-link tag="div" to="/demo/myCmp" class="item g-1px-t" flex="cross:center main:center">自定义组件</router-link>
    </div>
    <div class="demo-list" flex="dir:left box:mean">
      <router-link tag="div" to="/demo/swiper" class="item g-1px-r g-1px-t" flex="cross:center main:center">轮播</router-link>
      <router-link tag="div" to="" class="item g-1px-r g-1px-t" flex="cross:center main:center"></router-link>
      <router-link tag="div" to="" class="item g-1px-t" flex="cross:center main:center"></router-link>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/mixin.less';

  .g-1px-t,
  .g-1px-r {
    position: relative;
  }
  .g-1px-t:before{
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #C7C7C7;
    color: #C7C7C7;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }
  
  .g-1px-r:after {
    content: " ";
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    bottom: 0;
    border-right: 1px solid #C7C7C7;
    color: #C7C7C7;
    transform-origin: 100% 0;
    transform: scaleX(0.5);
  }
  .demo-list {
    text-align: center;
    font-size: .75rem;
    .item {
      height: 5rem;
    }
  }
</style>
