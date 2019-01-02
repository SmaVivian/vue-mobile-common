<template>
  <div class="page-swiper">
    <!-- 最新展览 start -->
    <div class="content-wrap content-wrap-exhibition">
      <div class="g-title" flex="dir:left main:justify cross:center">
        <h1>最新展览</h1>
        <router-link tag="span" to="/display" flex="dir:left cross:center">全部 {{dataExhibition.count}} <i class="icon-more"></i></router-link>
      </div>

      <div class="swiper-container slide-wrap-exhibition">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in dataExhibition.listData" :key="index">
            <div class="slide-item">
              <img :src="item.pictureId" alt="" :onerror="defaultImg">
              <div class="slide-content">
                <p class="content ell">{{item.headline}}</p>
                <span class="des">{{item.orgName}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="g-no-data" v-if="dataExhibition.listData.length === 0 && !isLoading">
        <div class="no-data-bg"></div>
      </div>
    </div>
    <!-- 最新展览 end -->

    <!-- 最热活动 start -->
    <div class="content-wrap content-wrap-activity">
      <div class="g-title" flex="dir:left main:justify cross:center">
        <h1>最热活动</h1>
        <router-link tag="span" to="/activity" flex="dir:left cross:center">全部 {{dataActivity.count}} <i class="icon-more"></i></router-link>
      </div>
      
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <router-link tag="div" :to="{path: '/activityDetail', query: {id:item.activityId}}" class="swiper-slide slide-wrap-activity" v-for="(item, index) in dataActivity.listData" :key="index">
            <img :src="item.picUrl" alt="" :onerror="defaultImg">
            <p flex="dir:left main:justify">
              <span class="des ell">{{item.activityName}}</span>
              <span class="time">{{item.activityStartDate}}</span>
            </p>
          </router-link>
        </div>

        <div class="swiper-pagination"></div>
      </div>

      <div class="g-no-data" v-if="dataActivity.listData.length === 0 && !isLoading">
        <div class="no-data-bg"></div>
      </div>
    </div>
    <!-- 最热活动 end -->
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
export default {
  data() {
    return {
      isLoading: true,
      defaultImg: this.$store.getters.defaultImg,
      dataExhibition: {
        count: '',
        listData: []
      },
      dataActivity: {
        count: '',
        listData: []
      },
    }
  },
  methods: {
    getData() {
      this.isLoading = true;
      this.$http.get(this.$staticUrl+'/data/swiper.json', {
       
      }).then(res => {
        this.isLoading = false;
        if(res.success === 1) {
          let data = res.data;
          this.dataExhibition.listData = data.newSpreadtrum;  // 最新展览
          this.dataActivity.listData = data.activityList.data;    // 最热活动

          this.dataExhibition.count = data.countSpreadtrum;  // 最新展览
          this.dataActivity.count = data.countActivity;    // 最热活动

          this.initSwiper();
        } else {
          Toast({
            message: res.data,
            position: 'center'
          });
        }
      })
    },
    handleClickSlide(index) {
      this.$router.push({path: '/displayDetail', query: {id: this.dataExhibition.listData[index].id}});
    },
    initSwiper() {
      let vm = this;
      this.$nextTick(() => {
        var swiper = new Swiper('.content-wrap-exhibition .swiper-container', {
          effect: 'coverflow',
          loop: true,
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true,
          },
          onClick: function() {
            vm.handleClickSlide(swiper.realIndex); 
          }
        });

        var swiperActivity = new Swiper('.content-wrap-activity .swiper-container', {
          autoplay: 5000,
          // loop: true,
          pagination: '.content-wrap-activity .swiper-pagination'
        });
      })
    }
  },
  mounted() {
    this.getData();
  }
}
</script>

<style lang="less" scoped>
.page-swiper {
  padding: 1rem 0;
  .content-wrap {
    padding: 0 1rem;
    margin-bottom: 2rem;
  }
  .icon-more {
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #C8C8CD;
    border-style: solid;
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    margin-left: .25rem;
    margin-top: .1rem;
  }
  .content-wrap-exhibition {
    padding: 0;
    .g-title {
      padding: 0 1rem;
    }
    .swiper-container {
      width: 100%;
      .swiper-slide {
        width: 300px;
        padding-bottom: .3rem;
      }
    }
    .slide-item {
      position: relative;
      width: 300px;
      box-shadow: 0px 0.2rem 0.3rem rgba(234,234,234,1);
      border-radius: .75rem;
      img {
        width: 100%;
        height: 200px;
        border-radius: .75rem .75rem 0 0;
      }
      .slide-content {
        padding: .5rem 1rem;
        .content {
          font-size: 0.75rem;
          line-height: 1.05rem;
          font-weight: bold;
          color: #666;
        }
        .des {
          margin-top: .25rem;
          color: #B9B9B9;
          font-size: .65rem;
          font-weight: 400;
          line-height: .9rem;
        }
      }
    }
  }
  .content-wrap-activity {
    .swiper-container {
      padding-bottom: .5rem;
      .swiper-pagination {
        position: absolute;
        bottom: 1.5rem;
      }
    }
    .slide-wrap-activity {
      width: 16.25rem;
      // box-shadow: 0 0.2rem 0.3rem #ccc;
      box-shadow: 0px 0.2rem 0.3rem rgba(234,234,234,1);
      border-radius: .75rem;
      img {
        width: 100%;
        height: 8.97rem;
        border-radius: 0.75rem 0.75rem 0 0;
      }
      p {
        padding: .5rem .5rem 2.7rem;
        .des {
          color: #666;
          font-size: .75rem;
          font-weight: bold;
          line-height: 1.05rem;
          width: 11rem;
          height: 1.05rem;
        }
        .time {
          color: #B9B9B9;
          font-size: .65rem;
          font-weight: 400;
          line-height: .9rem;
        }
      }
    }
  }
}
</style>

<style lang="less">
.page-swiper {
  .swiper-pagination {
    .swiper-pagination-bullet {
      width:0.5rem;
      height:0.2rem;
      background:rgba(216,216,216,1);
      border-radius:0.1rem;
    }
    .swiper-pagination-bullet-active {
      width:1.25rem;
      height:0.2rem;
      background:linear-gradient(54deg,rgba(128,226,255,1) 0%,rgba(72,165,255,1) 100%);
      border-radius:0.1rem;
    }
  }
  .swiper-container-3d .swiper-slide-shadow-bottom,
  .swiper-container-3d .swiper-slide-shadow-left,
  .swiper-container-3d .swiper-slide-shadow-right,
  .swiper-container-3d .swiper-slide-shadow-top {
    border-radius: 0.75rem;
  }
}
</style>


