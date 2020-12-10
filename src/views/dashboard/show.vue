<template>
  <div class="app-container">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="3">活动查询</el-menu-item>
      <el-menu-item index="4"><a>我的活动</a></el-menu-item>
      <el-menu-item index="4"><a>报名流程</a></el-menu-item>
    </el-menu>
    <el-row>
      <el-col :span="12">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in imageList" :key="item.id">
            <!-- <h3>{{ item }}</h3> -->
            <el-image
              style="width: 100%; height: 100%"
              :src="item.url"
            />
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <!-- <div slot="header" class="clearfix">
            <span>精彩活动</span>
          </div> -->
          <div v-for="o in 7" :key="o" class="text item" style="width:100%;height:30px">
            <p><span class="font-blue">{{ o + '.列表内容 ' + o }}</span></p>
            <!-- <p style="float:right"><span class="font-blue">2020-12-12</span></p> -->
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider><i class="el-icon-loading" style="font-size:40px;color:#67C23A" /><i class="el-icon-loading" style="font-size:40px;color:#E6A23C" /><i class="el-icon-loading" style="font-size:40px;color:#F56C6C" /></el-divider>
    <el-card>
      <el-row>
        <el-card v-for="o in 10" :key="o" style="width:300px;float:left;margin:10px" :body-style="{ padding: '0px' }">
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">2012-10-12</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-row>
      <div>加载更多...</div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageList: [
        {
          id: 1,
          url: '/images/show/1.jpg'
        },
        {
          id: 2,
          url: '/images/show/2.jpg'
        },
        {
          id: 3,
          url: '/images/show/3.jpg'
        },
        {
          id: 4,
          url: '/images/show/4.jpg'
        }
      ]
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>
<style>
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .box-card
  {
      height: 302px;
      font-size: 14px
  }
  .font-blue{
      color: #409EFF;
      font-size: 14px
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  .image{
      width: 100%;
      height: 300px
  }
</style>
<style scoped lang="less">

</style>
