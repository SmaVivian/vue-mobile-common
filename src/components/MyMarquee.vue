<template>
  <div class="cmp-marque" :style="{height: height + 'px'}">
    <ul ref="box" :style="{transform: `translate3d(0,${currenTranslateY}px,0)`, transition: `transform ${noAnimate ? 0 : duration}ms`}">
      <li v-for="(item, index) in dataList" 
        :key="index" 
        :style="{height: height + 'px', lineHeight: height + 'px'}">
        {{item.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'myCmpMarquee',
  props: {
    arrMarquee: {
      type: Array,
      default: []
    },
    interval: {
      type: Number,
      default: 2000
    },
    duration: {
      type: Number,
      default: 300
    },
    direction: {
      type: String,
      default: 'up'
    },
    itemHeight: {
      type: Number,
      default: 30
    }
  },
  data () {
    return {
      dataList: this.arrMarquee,
      currenTranslateY: 0,
      height: this.itemHeight,
      length: 0,
      currentIndex: 0,
      noAnimate: false
    }
  },
  methods: {
    destroy () {
      this.timer && clearInterval(this.timer)
    },
    init () {
      this.destroy()

      if(this.cloneNode) {
        this.$refs.box.removeChild(this.cloneNode);
      }

      this.cloneNode = '';
      let firstItem = this.$refs.box.firstElementChild
      if(!firstItem) return
      this.length = this.$refs.box.children.length

      if (this.direction === 'up') {
        this.cloneNode = firstItem.cloneNode(true)
        this.$refs.box.appendChild(this.cloneNode)
      } else {
        this.cloneNode = this.$refs.box.lastElementChild.cloneNode(true)
        this.$refs.box.insertBefore(this.cloneNode, firstItem)
      }
      return true
    },
    start () {
      if (this.direction === 'down') this.go(false)
      this.timer = setInterval(() => {
        if (this.direction === 'up') {
          this.currentIndex += 1
          this.currenTranslateY = -this.currentIndex * this.height
        } else {
          this.currentIndex -= 1
          this.currenTranslateY = -(this.currentIndex + 1) * this.height
        }
        if (this.currentIndex === this.length) {
          setTimeout(() => {
            this.go(true)
          }, this.duration)
        } else if (this.currentIndex === -1) {
          setTimeout(() => {
            this.go(false)
          }, this.duration)
        } else {
          this.noAnimate = false
        }
      }, this.interval + this.duration)
    },
    go (toFirst) {
      this.noAnimate = true
      if (toFirst) {
        this.currentIndex = 0
        this.currenTranslateY = 0
      } else {
        this.currentIndex = this.length - 1
        this.currenTranslateY = -(this.currentIndex + 1) * this.height
      }
    }
  },
  created () {

  },
  mounted () {
    this.$nextTick(() => {
      this.init()
      this.start()
    })
  },
  beforeDestroy () {
    this.destroy()
  },
}
</script>

<style lang="less" scoped>
  .cmp-marque {
    text-align: center;
    overflow: hidden;
  }
</style>


