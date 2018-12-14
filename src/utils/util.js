
/**
 * @param {校验的字符串} str 
 * @param {校验类型 'phone' 'password'} type 
 * @Auth zhangwei
 * @date 20181029
 */
export const validate = (str, type) => {
  let isMatch = false,
    isMobile = /^1[3578]\d{9}$|^147\d{8}$/,
    ispass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;

  switch(type) {
    case 'phone':
      if(isMobile.test(str)) {
        isMatch = true;
      }
      break;
    case 'password':
      if(ispass.test(str)) {
        isMatch = true;
      }
      break;
  }

  return isMatch;
}

/**
 * 滑动删除
 * @Auth zhangwei
 * @date 20181029
 */
export let utilSlide = {
  elem: '.list-item',
  startX: 0,
	endX: 0,
  //滑动开始
  touchStart: function(e){
    this.startX = e.touches[0].clientX;
  },
  //滑动
  touchMove: function(e){
    let parentElement = e.currentTarget.parentElement;
    this.endX = e.changedTouches[0].clientX;
    if( parentElement.dataset.type == 0 && this.startX - this.endX > 30  ){
      this.restSlide();
      parentElement.dataset.type = 1;
      e.preventDefault();
    }

    if( parentElement.dataset.type == 1 && this.startX - this.endX < -30 ){
      this.restSlide();
      parentElement.dataset.type = 0;
      e.preventDefault();
    }
  },
  //判断当前是否有滑块处于滑动状态
  checkSlide: function(){
    let listItems = document.querySelectorAll(this.elem);

    for( let i = 0 ; i < listItems.length ; i++){
      if( listItems[i].dataset.type == 1 ) {
        return true;
      }
    }
    return false;
  },
  //一次只能滑动一个
  restSlide: function(){
    let listItems = document.querySelectorAll(this.elem);

    for( let i = 0 ; i < listItems.length ; i++){
      listItems[i].dataset.type = 0;
    }
  }
}