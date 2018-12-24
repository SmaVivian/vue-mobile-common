import { MessageBox, Toast } from 'mint-ui';

export const common = {
  confirmLogin: function(msg, closeOnClickModal) {
    MessageBox({
      title: '提示',
      message: msg || '登录超时，是否重新登录',
      showCancelButton: true,
      closeOnClickModal: closeOnClickModal || true  // 点击遮罩是否关闭弹窗
    })
    .then(action => {
      location.href = '#/my/login';
      // this.$router.push({ path: '/my/login'});
    }).catch(() => {
      location.href = '#/';
    });
  },
  confirm: function(title, okCall, cancalCall) {
    MessageBox.confirm(title)
    .then((action) => {
      okCall();
    }).catch(() => {
      cancalCall && cancalCall();
    });
  }
}