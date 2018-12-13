import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import zh from 'vee-validate/dist/locale/zh_CN'//引入中文文件

Vue.use(VeeValidate);

Validator.localize('zh', zh);

const dictionary = {
  zh: {
    messages: {
      email: () => '请输入正确的邮箱格式',
      required: ( field )=> "请输入" + field
    },
    attributes:{
      email: '邮箱',
      password:'密码',
      name: '账号',
      phone: '手机'
    }
  }
};

Validator.localize(dictionary);

Validator.extend('phone', {
  getMessage: field => field + '必须是11位手机号码',
  validate: value => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
});