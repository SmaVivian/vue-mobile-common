<template>
  <div class="page-form">
    <!-- <input type="text" name="name" class="layui-input" placeholder="账户"
      v-model="name" 
      v-validate="'required|min:3|alpha'" 
      :class="{'input': true, 'is-danger': errors.has('email') }">
    <span v-show="errors.has('email')" class="text-style" v-cloak> {{ errors.first('email') }} </span> -->

    <input v-validate="'required|email'" name="email" type="text">
    <span>{{ errors.first('email') }}</span>

    <input v-validate="'required|min:6'" type="password" name="password">
    <span>{{ errors.first('password') }}</span>

    <input v-validate="'required|phone'" type="text" name="phone">
    <span>{{ errors.first('phone') }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    }
  }
}
</script>

<style lang="less" scoped>

</style>

