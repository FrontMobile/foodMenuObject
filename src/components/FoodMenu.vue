<template>
  <div id="app" align="center">
    <div id="menu">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="isLoading" :finished="isFinished" @load="onLoad" style="margin-top: 5px;">
          <van-row type="flex" justify="space-between" v-for="(item, index) in sites" class="item_class" :key="index">
            <van-col span="4">
              <div class="item_index">{{index + 1}}</div>
            </van-col>
            <van-col span="12" align="left" style="line-height: 45px;">{{item.name}}</van-col>
            <van-col span="4" style="line-height: 45px;">{{item.likes}}</van-col>
            <van-col v-if="item.islike === 'like'" span="4">
              <van-image class="item_img" src="/static/img/recommend.png" @click="addLike(index, item.likes)"></van-image>
            </van-col>
            <van-col v-else span="4">
              <van-image class="item_img" src="/static/img/unrecommend.png" @click="addLike(index, item.likes)"></van-image>
            </van-col>
          </van-row>
        </van-list>
      </van-pull-refresh>
    </div>
    <div id="share" @click="share">
      <b>分 享 有 礼 ></b>
    </div>
    <div id="company">青岛禹锡智慧科技有限公司 技术支持</div>
  </div>
</template>

<script>
import $ from 'jquery'
import {
  Button, Icon, PullRefresh, List,
  Cell, Row, Col, Image, Toast
} from 'vant'
import utils from '../assets/script/utils'
import config from '../assets/script/config'
import Axios from 'axios'

export default {
  name: 'App',
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [PullRefresh.name]: PullRefresh,
    [Row.name]: Row,
    [Col.name]: Col,
    [Image.name]: Image,
    [Toast.name]: Toast
  },
  data () {
    return {
      message: '本店菜品排行榜',
      isLoading: false,
      isFinished: true,
      bgstyle: {
        backgroundSize: $(document).width() + ' ' + $(document).height()
      },
      sites: []
    }
  },
  mounted () {
    let pgwidth = $(document).width()
    let pgheiht = $(document).height()
    $('#app').height(pgheiht)
    $('#app').width(pgwidth)
    this.onLoad()
  },
  methods: {
    share () {
      Toast.success('请点击浏览器右上角选择分享')
    },
    addLike (index, num) {
      this.$set(this.sites[index], 'likes', parseInt(num) + 1)
      this.sites.sort(function (a, b) {
        let x = a['likes']
        let y = b['likes']
        return ((x < y) ? ((x > y) ? 1 : 0) : -1)
      })
      console.log(JSON.stringify(this.sites[0]))
      this.$set(this.sites[0], 'islike', 'like')
      this.$set(this.sites[1], 'islike', 'like')
      this.$set(this.sites[2], 'islike', 'like')
      for (let i = 3; i < this.sites.length; i++) {
        this.$set(this.sites[i], 'islike', 'like-o')
      }
    },
    onLoad () {
      console.log('Loding ...')
      let merchantID = utils.getURLParameterValue('mid')
      this.isFinished = true
      this.isLoading = false
      let defaultMenus = [{
        img: '/static/img/recommend.png',
        name: '红烧茄子',
        description: '这里是菜品介绍',
        likes: 9999,
        islike: 'like'
      }, {
        img: '/static/img/unrecommend.png',
        name: '韭菜鸡蛋',
        description: '这里是菜品介绍',
        likes: 9999,
        islike: 'like'
      }, {
        img: '/static/img/unrecommend.png',
        name: '红烧肉',
        description: '这里是菜品介绍',
        likes: 9999,
        islike: 'like'
      }, {
        img: '/static/img/unrecommend.png',
        name: '东坡肘子',
        description: '这里是菜品介绍',
        likes: 9999,
        islike: 'like-o'
      }, {
        img: '/static/img/unrecommend.png',
        name: '蚂蚁上树',
        description: '这里是菜品介绍',
        likes: '9999',
        islike: 'like-o'
      }, {
        img: '/static/img/unrecommend.png',
        name: '地三鲜',
        description: '这里是菜品介绍',
        likes: '9999',
        islike: 'like-o'
      }, {
        img: '/static/img/unrecommend.png',
        name: '尖椒豆皮',
        description: '这里是菜品介绍',
        likes: '9999',
        islike: 'like-o'
      }]
      if (merchantID) {
        console.log('商户ID' + merchantID)
        // 第一种方式 (无法更也买呢 -- 封存)
        // $.ajax(config.menuAPI, {
        //   type: 'get',
        //   success: function (data) {
        //     console.debug(JSON.stringify(data))
        //     this.sites = data.data
        //   },
        //   error: function (error) {
        //     console.error(error.toString())
        //   }
        // })
        // 第二种方式
        Axios.get(config.menuAPI).then(res => {
          console.log(JSON.stringify(res.data.data))
          defaultMenus = res.data.data
          this.sites = res.data.data
        }).catch(error => {
          console.log('Error', error.getMessages())
        })
      } else {
        this.sites = defaultMenus
      }
      return defaultMenus
    },
    onRefresh () {
      console.log('Refresh ...')
      this.isFinished = false
      this.isLoading = false
      this.sites = []
      this.onLoad()
    }
  }
}
</script>

<style>
  #app {
    background-image: url("/static/img/backgrand.png");
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 1px;
  }

  #menu {
    background-image: url("/static/img/menu_backgrand.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    height: 350px;
    width: 90%;
    margin-top: 200px;
    margin-left: auto;
    margin-right: auto;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  #share {
    background: transparent;
    background-image: url("/static/img/share_btn.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    height: 40px;
    width: 60%;
    margin-top: 10px;
    text-align: center;
    line-height: 45px;
    color: azure;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  #company {
    height: 20px;
    width: 80%;
    text-align: center;
    color: white;
    position: fixed;
    bottom: 5px;
    margin-left: 10%;
    margin-right: 10%;
    font-size: small;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .item_class {
    width: 90%;
    height: 45px;
    margin-top: 2px;
    background-image: url("/static/img/item_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
  }

  .item_img {
    height: 30px;
    width: 35px;
    margin-top: 5px;
  }

  .item_index {
    background-image: url("/static/img/index_num.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 25px;
    width: 25px;
  }
</style>
