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
      <el-menu-item index="2"><router-link to="/activity/ActivitySearch">活动查询</router-link></el-menu-item>
      <el-menu-item index="3"><router-link to="/activity/ActivityMy">我的活动</router-link></el-menu-item>
      <el-menu-item index="4"><router-link to="/activity/process">报名流程</router-link></el-menu-item>
    </el-menu>
    <el-row>
      <el-col :span="12">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in rotationTopic" :key="item.activityId">
            <!-- <h3>{{ item }}</h3> -->
            <img
              style="width: 100%; height: 100%"
              :src="item.url"
            >
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <!-- <div slot="header" class="clearfix">
            <span>精彩活动</span>
          </div> -->

          <el-table
            :data="infomationTopic"
            style="width: 100%;margin-top:-20px;"
            size="mini"
          >
            <el-table-column
              prop="date"
              label="序号"
              width="50"
            >
              <template slot-scope="row">
                {{ row.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              prop="title"
              label="活动名称"
            >
              <template slot-scope="{row}">
                <span class="pointer" @click="Move_activity(row.id)">{{ row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="start"
              label="开始时间"
              width="100"
            />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-divider><i class="el-icon-loading" style="font-size:40px;color:#67C23A" /><i class="el-icon-loading" style="font-size:40px;color:#E6A23C" /><i class="el-icon-loading" style="font-size:40px;color:#F56C6C" /></el-divider>
    <el-card>
      <el-row>
        <el-card v-for="o in onlineList" :key="o.id" style="width:300px;float:left;margin:10px" :body-style="{ padding: '0px' }">
          <img :src="o.url" class="image">
          <div style="padding: 14px;margin-top:-20px">
            <p><span style="font-size:14px">活动名称：</span><time class="time">{{ o.title }}</time></p>
            <div class="bottom clearfix">
              <p><span style="font-size:14px">开始时间：</span><time class="time">{{ o.start }}</time></p>
              <el-button type="text" class="button" @click="Move_activity(o.id)">点击报名</el-button>
            </div>
          </div>
        </el-card>
      </el-row>
      <div>加载更多...</div>
    </el-card>
  </div>
</template>

<script>
import { infomationList, rotationList, getActivityOnlineList } from '@/api/activity'
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
      ],
      // 咨询栏
      infomationTopic: {},
      // 导航栏
      rotationTopic: {},
      // 推荐栏
      onlineList: {},
      // 查询列表
      searchList: {
        page: 1,
        pageSize: 10,
        title: null,
        adress: null,
        start: null
      }
    }
  },
  created() {
    this.getRotationList()
    this.getInfomationList()
    this.getActivityOnlineList()
  },
  mounted() {

  },
  methods: {
    // 咨询栏目
    getInfomationList() {
      infomationList().then(res => {
        if (res.code === 200) {
          this.infomationTopic = res.data.data
        }
      })
    },
    // 轮播栏目
    getRotationList() {
      rotationList().then(res => {
        if (res.code === 200) {
          this.rotationTopic = res.data
          console.log(this.rotationTopic[0])
        }
      })
    },
    // 推荐活动栏目
    getActivityOnlineList() {
      getActivityOnlineList(this.searchList).then(res => {
        if (res.code === 200) {
          this.onlineList = res.data.data
        }
      })
    },
    Move_activity(row) {
      this.$router.push({
        path: '/activity/show',
        query: {
          activityId: row
        }
      })
    }
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
  /* 手 */
  .pointer{
    cursor: pointer;
  }
</style>
<style scoped lang="less">

</style>
