<template>
  <div>
    <div class="nav_bar">
      <van-nav-bar class="nav_bar_item" title="ShowMe Welike" :left-arrow="true" @click-left="back" :fixed="true"/>
    </div>
    <div id="content_iframe">
      <div v-if="showStyle === '1'">
        <video :src="detailURL" height="200px" width="100%" controls="controls">您的浏览器不支持 video 标签</video>
        <iframe id="ad" src="http://www.baidu.com" style="overflow: hidden"/>
      </div>
      <iframe v-else :src="detailURL" width="100%" height="100%" style="overflow: hidden"/>
    </div>
  </div>
</template>

<script>
import {NavBar} from 'vant'
import utils from '../assets/script/utils'
import $ from 'jquery'

export default {
  name: 'ItemDetail',
  components: {
    [NavBar.name]: NavBar
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  data () {
    return {
      detailURL: utils.getURLParameterValue('detailURL'),
      showStyle: utils.getURLParameterValue('showStyle')
    }
  },
  mounted () {
    let pgwidth = $(document).width()
    let pgheiht = $(document).height()
    $('#content_iframe').height(pgheiht)
    $('#content_iframe').width(pgwidth)
    $('#ad').height(pgheiht - 200)
    $('#ad').width(pgwidth)
  }
}
</script>

<style scoped>
  .nav_bar {
    margin-top: 0;
    height: 46px;
  }

  .nav_bar_item {
    background-color: #FF842F;
  }
</style>
