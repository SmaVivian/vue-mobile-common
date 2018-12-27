<template>
  <span>{{currentTime}}</span>
</template>

<script>
export default {
  name: 'myCountDown',
  props: {
    value: Number,
    start: {
      type: Boolean,
      default: true
    }
  },
  created () {
    if (this.value) this.currentTime = this.value
  },
  methods: {
    tick () {
      let vm = this
      this.interval = setInterval(function () {
        if (vm.currentTime > 0) {
          vm.currentTime--
        } else {
          vm.stop()
          vm.index++
          vm.$emit('on-finish', vm.index)  // 参数Demo 可不传
        }
      }, 1000)
    },
    stop () {
      clearInterval(this.interval)
    }
  },
  watch: {
    value (val) {
      this.currentTime = val
    },
    // 监听数
    currentTime (val) {
      
    },
    start (newVal, oldVal) {
      if (newVal === true && oldVal === false && this.currentTime > 0) {
        this.tick()
      }
    }
  },
  mounted () {
    if (this.start) {
      this.tick()
    }
  },
  data () {
    return {
      interval: null,
      index: 0,
      currentTime: 60
    }
  }
}
</script>