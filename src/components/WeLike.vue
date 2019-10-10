<template>
  <div class="body_content">
    <div class="nav_bar">
      <van-nav-bar class="nav_bar_item" title="ShowMe Welike" left-text="Search" right-text="Setting" :fixed="true">
        <van-icon name="search" slot="left"/>
        <van-icon name="friends-o" slot="right"/>
      </van-nav-bar>
    </div>
    <div class="tab_bar">
      <van-tabs background="#000000" v-model="active" @change="onChange" title-active-color="#FFFFFF" swipeable>
        <van-tab v-for="(category, index) in categoryList" :title="category.name" :key="index" :fixed="true">
          <waterfall :col='col' :data="data" @loadmore="loadmore(pageNum+1)" @scroll="scroll" :isTransition=true>
            <div class="cell-item" v-for="(item,index) in data" :key="index">
              <img v-if="item.image_url" :src="item.image_url" alt="加载错误"
                   @click="detail(item.video_url, item.link_url)"/>
              <div class="item-body">
                <div class="item-desc">{{item.title}}</div>
                <div class="item-footer">
                  <div class="avatar" :style="{backgroundImage : `url(${item.avatar})` }"></div>
                  <div class="name">{{item.user}}</div>
                  <div class="like" :class="item.duration?'active':''">
                    <i></i>
                    <div class="like-total">{{item.duration}}s</div>
                  </div>
                </div>
              </div>
            </div>
          </waterfall>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import {
  NavBar, Icon, Tabbar, TabbarItem,
  Tabs, Tab, Toast
} from 'vant'
import Axios from 'axios'

export default {
  name: 'WeLike',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Toast.name]: Toast
  },
  data () {
    return {
      active: 0,
      col: 2,
      categoryList: [],
      data: [],
      pageNum: 0
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    onChange (index, title) {
      console.log(index + ' - ' + title)
    },
    scroll (scrollData) {
      console.log(scrollData)
    },
    loadmore (index) {
      Axios.get('http://wx.88q.club:5000/videos?page=' + index).then(res => {
        if (res.data.data.length > 0) {
          this.data = this.data.concat(res.data.data)
          this.pageNum = index
          console.log(JSON.stringify(this.data))
        } else {
          Toast.success('NO More')
        }
      }).catch(error => {
        console.log('Error', error.getMessages())
      })
    },
    load () {
      Axios.get('http://wx.88q.club:5000/types').then(res => {
        console.log(JSON.stringify(res.data))
        this.categoryList = res.data.data
      }).catch(error => {
        console.log('Error', error.getMessages())
        Toast.fail('Server is busying')
      })
      Axios.get('http://wx.88q.club:5000/videos?page=' + this.pageNum).then(res => {
        console.log(JSON.stringify(res.data))
        this.data = res.data.data
      }).catch(error => {
        console.log('Error', error.getMessages())
        Toast.fail('Server is busying')
      })
    },
    detail (videoUrl, linkUrl) {
      // let url = videoUrl
      // let showType = 1
      // if (typeof videoUrl === 'undefined' || videoUrl == null || videoUrl === '') {
      //   url = linkUrl
      //   showType = 2
      // }

      // 暂时写定
      let url = linkUrl
      let showType = 2
      this.$router.push({
        path: '/detail',
        query: {
          detailURL: url,
          showStyle: showType
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .nav_bar {
    margin-top: 0;
    height: 46px;
  }

  .nav_bar_item {
    background-color: #FF842F;
  }

  .tab_bar {
    margin-top: 0;
  }

  .cell-item {
    width: 100%;
    // margin-bottom: 18px;
    background: #ffffff;
    border: 2px solid #F0F0F0;
    border-radius: 12px 12px 12px 12px;
    overflow: hidden;
    box-sizing: border-box;

    img {
      // border-radius: 12px 12px 0 0;
      width: 100%;
      height: auto;
      display: block;
    }

    .item-body {
      // border: 1px solid #F0F0F0;
      padding: 12px;

      .item-desc {
        font-size: 15px;
        color: #333333;
        line-height: 15px;
        font-weight: bold;
      }

      .item-footer {
        margin-top: 22px;
        position: relative;
        display: flex;
        align-items: center;

        .avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-repeat: no-repeat;
          background-size: contain;
        }

        .name {
          max-width: 150px;
          margin-left: 10px;
          font-size: 14px;
          color: #999999;
        }

        .like {
          position: absolute;
          right: 0;
          display: flex;
          align-items: center;

          &.active {
            i {
            }

            .like-total {
              color: #FF4479;
            }
          }

          i {
            width: 28px;
            display: block;
          }

          .like-total {
            margin-left: 10px;
            font-size: 12px;
            color: #999999;
          }
        }
      }
    }
  }
</style>
