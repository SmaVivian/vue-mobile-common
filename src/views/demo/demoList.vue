<template>
  <div>
    <div class="demo-list" flex="dir:left box:mean cross:center">
      <router-link tag="div" to="/list/infinite" class="item g-1px-r" flex="cross:center main:center">list Infinite scroll</router-link>
      <div class="item g-1px-r" flex="cross:center main:center">list pull down</div>
      <div class="item" flex="cross:center main:center">list</div>
    </div>
    <div class="demo-list" flex="dir:left box:mean">
      <div class="item g-1px-r g-1px-t" flex="cross:center main:center">list Infinite scroll</div>
      <div class="item g-1px-r g-1px-t" flex="cross:center main:center">list pull down</div>
      <div class="item g-1px-t" flex="cross:center main:center">list</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
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
    .item {
      height: 5rem;
    }
  }
</style>

<script>
export default {
  
}
</script>
