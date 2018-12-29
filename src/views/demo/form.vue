<template>
  <div class="page-form">
    <div class="g-form">
      <div class="top">
        <img :src="avatarurl" alt="" :onerror="defaultHeadImg" @click="clickFile">
      </div>

      <div class="m-form-col">
        <div class="control">
          <label class="label">详情</label>
          <i class="g-icon-more"></i>
        </div>
      </div>

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
          <i class="g-icon-more"></i>
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
          <span class="tri-name" @click="openPicker">{{birthday ? birthday : '请选择时间'}}</span>
          <i class="g-icon-more"></i>
        </div>
      </div>

      <div class="m-form-col">
        <div class="control t-area">
          <label class="label">文本域</label>
          <textarea name="" id="" cols="30" rows="5" ref="textarea"></textarea>
        </div>
      </div>

      <div class="m-form-col">
        <div class="control t-area">
          <label class="label">自适应高</label>
          <textarea name="" id="" cols="30" rows="1" ref="textarea"></textarea>
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

    <input type="file" id="fileInput" style="display: none;" @change="triggerFile($event)" ref="filePicker">
  </div>
</template>

<script>
import Autosize from 'autosize' // 文本域高度自适应
import moment from 'moment'
export default {
  data() {
    return {
      defaultHeadImg: this.$store.getters.defaultHeadImg,
      
      avatarurl: '',  // 头像
      mytime: "",
      startDate: new Date(new Date().getTime() + 24*60*60*1000),
      name: '',
      email: '',
      password: '',
      phone: '',
      birthday: '',

      handler:function(e){e.preventDefault();},
    }
  },
  methods: {
    clickFile() {
      // document.getElementById('fileInput').click();
      const event = new MouseEvent('click');
      this.$refs.filePicker.dispatchEvent(event);
    },
    triggerFile(e) {
      let vm = this;
      let deviceFile = e.target.files;
      let formData = new FormData();

      formData.append('file', deviceFile[0]);
      formData.append('userId', this.$store.getters.userid);
      formData.append('token', this.$store.getters.token);

      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      this.$http.base({
        method: 'post',
        url: '/m/uploadHeadImage.do',
        headers: {'Content-Type': 'multipart/form-data'},
        data: formData
      }).then((response)=>{
        if(response.data.success==1) {
          vm.avatarurl = response.data.data;
        } else if (response.data.success==999) {
          this.$common.confirmLogin();
        } else {
          Toast({
            message: response.data.data || '接口异常',
            position: 'bottom'
          });
        }
      });
    },
    // 打开时间选择器
    openPicker() {
      this.$refs.picker.open();

      this.closeTouch();//关闭默认事件
    },
    handleConfirm(data) {
      this.openTouch();//打开默认事件

      this.birthday = moment(data).format('YYYY/MM/DD');
    },

    // 高度自适应
    updateAutosize() {
      Autosize.update(this.$refs.textarea)
    },
    bindAutosize() {
      Autosize(this.$refs.textarea)
    },
    unbindAutosize() {
      Autosize.destroy(this.$refs.textarea)
    },

    /*解决iphone页面层级相互影响滑动的问题*/
    closeTouch() {
      document.getElementsByTagName("body")[0].addEventListener('touchmove',
        this.handler, { passive: false} ); //阻止默认事件
    },
    openTouch() {
      document.getElementsByTagName("body")[0].removeEventListener('touchmove',
        this.handler, { passive: false} ); //打开默认事件
    },
  },
  mounted() {
    this.bindAutosize()
  },
  beforeDestroy () {
    this.unbindAutosize()
  }
}
</script>

<style lang="less" scoped>
  @import '../../assets/css/form.less';

  .top {
    width: 5rem;
    margin: auto;
    padding: 1.5rem 0;
    img {
      width: 5rem;
      height: 5rem;
      border-radius: 100%;
    }
  }
</style>

