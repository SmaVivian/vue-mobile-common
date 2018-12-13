<template>
  <div class="page-form">
    <div class="g-form">
      <div class="m-form-col">
        <div class="title">邮箱验证</div>
        <div class="control">
          <label class="label">邮箱</label>
          <input name="email" type="text" placeholder=""
            v-model="email" 
            v-validate="'required|email'" 
            class="border"
            :class="{'input': true, 'is-danger': errors.has('email') }">
          <i v-show="email" class="clear" @click="email=''">×</i>
        </div>
        <div v-show="errors.has('email')" class="help">{{ errors.first('email') }}</div>
      </div>

      <div class="m-form-col">
        <div class="title">账户</div>
        <div class="control">
          <label class="label">账户</label>
          <input name="name" type="text" placeholder=""
            v-model="name" 
            v-validate="'required|min:3|alpha'" 
            class="border"
            :class="{'input': true, 'is-danger': errors.has('name') }">
          <i v-show="name" class="clear" @click="name=''">×</i>
        </div>
        <div v-show="errors.has('name')" class="help">{{ errors.first('name') }}</div>
      </div>

      <div class="m-form-col">
        <div class="control">
          <label class="label">密码</label>
          <input v-model="password"  v-validate="'required|min:6'" type="password" name="password">
          <i v-show="password" class="clear" @click="password=''">×</i>
        </div>
        <div v-show="errors.has('password')" class="help">{{ errors.first('password') }}</div>
      </div>

      <div class="m-form-col">
        <div class="control">
          <label class="label">手机号</label>
          <input v-model="phone" v-validate="'required|phone'" type="text" name="phone">
          <i v-show="phone" class="clear" @click="phone=''">×</i>
        </div>
        <div v-show="errors.has('phone')" class="help">{{ errors.first('phone') }}</div>
      </div>

      <div class="m-form-col">
        <div class="control">
          <label class="label">生日</label>
          <input type="text" :value="birthday" name="" placeholder="请选择时间" @click="openPicker">
          <i class="g-icon-more"></i>
        </div>
      </div>

      <div class="m-form-col">
        <div class="control baseline">
          <label class="label">文本域</label>
          <textarea name="" id=""></textarea>
        </div>
      </div>
    </div>

    <mt-datetime-picker
      type="date"
      ref="picker"
      v-model="mytime"
      year-format="{value}年"
      month-format="{value}月"
      date-format="{value}日"
      @confirm="handleConfirm"
      confirmText="确定"
      :startDate="startDate">
    </mt-datetime-picker>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      mytime: "",
      startDate: new Date(new Date().getTime() + 24*60*60*1000),
      name: '',
      email: '',
      password: '',
      phone: '',
      birthday: ''
    }
  },
  methods: {
    openPicker() {
      this.$refs.picker.open();
    },
    handleConfirm (data){
      this.birthday = moment(data).format('YYYY/MM/DD');
    },
  }
}
</script>

<style lang="less" scoped>
  @import '../../assets/css/form.less';
</style>

