<template>
  <div class="app-container">
    <el-row>
      <!-- <el-col :span="16" :offset="4">
        <h1 style="text-align:center">{{ activity.title }}</h1>
      </el-col>
      <el-col :span="16" :offset="4">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in activity.images" :key="'imgages_' + item.id"> -->
      <!-- <h3 class="medium">{{ item }}</h3> -->
      <!-- <img :src="item.url" style="width:100%;height:100%">
          </el-carousel-item>
        </el-carousel>
      </el-col> -->
      <el-col
        :span="16"
        :offset="4"
      >
        <el-card style="padding: 0;">
          <el-col :span="16" :offset="4">
            <h2 style="text-align:center;margin:0;color:#E6A23C">{{ activity.title }}</h2>
            <p style="text-align:center;"><time class="time"><span style="margin-right:4px">{{ activity.name }}</span>{{ activity.updated_at }}</time></p>
          </el-col>
          <!-- 1 -->
          <el-col><div class="border_ blue"><div class="triangle_left" />活动内容:<div class="triangle_right" /></div></el-col>
          <el-col>
            <span class="content">{{ activity.content }}</span>
            <el-divider>
              <i style="color:green" class="el-icon-picture-outline-round" />
              <i style="color:#E6A23C" class="el-icon-picture-outline-round" />
              <i style="color:red" class="el-icon-picture-outline-round" />
            </el-divider>
          </el-col>
          <!-- 图片 -->
          <el-col>
            <el-carousel width="100%" height="300px" direction="vertical" :autoplay="false">
              <el-carousel-item v-for="item in activity.images" :key="item.id">
                <img :src="item.url" style="width:100%;height:100%">
              </el-carousel-item>
            </el-carousel>
            <el-divider>
              <i style="color:green" class="el-icon-picture-outline-round" />
              <i style="color:#E6A23C" class="el-icon-picture-outline-round" />
              <i style="color:red" class="el-icon-picture-outline-round" />
            </el-divider>
          </el-col>
          <el-col><div class="border_ blue"><div class="triangle_left" />活动地点:<div class="triangle_right" /></div></el-col>
          <el-col>
            <span class="content">{{ activity.adress }}</span>
            <el-divider>
              <i style="color:green" class="el-icon-picture-outline-round" />
              <i style="color:#E6A23C" class="el-icon-picture-outline-round" />
              <i style="color:red" class="el-icon-picture-outline-round" />
            </el-divider>
          </el-col>
          <el-col><div class="border_ blue"><div class="triangle_left" />活动规则:<div class="triangle_right" /></div></el-col>
          <el-col>
            <p v-for="(item, index) in activity.rule" :key="'rule_' + index"><span class="content" style="font-weight:700">{{ activityRules[index] + ':' }}</span><span class="content">{{ item }}</span></p>
            <el-divider>
              <i style="color:green" class="el-icon-picture-outline-round" />
              <i style="color:#E6A23C" class="el-icon-picture-outline-round" />
              <i style="color:red" class="el-icon-picture-outline-round" />
            </el-divider>
          </el-col>
          <el-col>
            <div class="border_ blue"><div class="triangle_left" />活动奖品:<div class="triangle_right" /></div>
          </el-col>
          <el-col>
            <p v-for="(item, index) in activity.prize" :key="'prize_' + index"><span class="content" style="font-weight:700">{{ activityPrize[index] + ':' }}</span><span class="content">{{ item }}</span></p>
            <el-divider>
              <i style="color:green" class="el-icon-picture-outline-round" />
              <i style="color:#E6A23C" class="el-icon-picture-outline-round" />
              <i style="color:red" class="el-icon-picture-outline-round" />
            </el-divider>
          </el-col>
          <el-col><div class="border_ blue"><div class="triangle_left" />活动时间:<div class="triangle_right" /></div></el-col>
          <el-col>
            <p><span class="content">开始时间：<span style="color:#409EFF">{{ activity.start }}</span> 结束时间：<span style="color:#F56C6C">{{ activity.end }}</span></span></p>
          </el-col>
          <el-col>
            <el-button type="warning" style="margin-left:40%;width:20%;margin-bottom:20px" :disabled="isJoinState" @click="join()">{{ isJoinState?'您已参加':'立即报名' }}</el-button>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { showActivity } from '@/api/activity'
import { isJoin, addJoin } from '@/api/join'
export default {
  name: 'Show',
  data() {
    return {
      activity: {},
      activityId: this.$route.query.activityId,
      activityRules: ['第一条', '第二条', '第三条', '第四条', '第五条', '第六条', '第七条'],
      activityPrize: ['第一名', '第二名', '第三名', '第四名', '第五名', '第六名', '第七名'],
      isJoinState: false
    }
  },
  created() {
    this.getList()
    isJoin(this.activityId).then(res => {
      if (res.code === 200) {
        this.isJoinState = res.state
      }
    })
  },
  methods: {
    async getList() {
      const self = this
      const res = await showActivity(self.activityId)
      // eslint-disable-next-line eqeqeq
      if (res.code == 200) {
        self.activity = res.data[0]
      } else {
        this.$message({
          'type': 'error',
          'message': res.msg
        })
      }
    },
    // 报名参加
    join() {
      addJoin({ activityId: this.activityId }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.isJoinState = true
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    }
  }
}
</script>
<style>
/* .app-container{
    background-image: url('/star.png');
} */
.box-card {
      /* height: calc(100vh - 84px - 80px); */
      margin-bottom: 30px;
    }
    *{
      font-family: '思源黑体';
      /* font-size: 14px; */
    }
 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
   .time {
    font-size: 13px;
    color: #999;
  }
  .triangle_left{
    border-style: solid;
            border-width: 10px;
            border-color:  transparent transparent transparent #F56C6C;
            width: 0px;
            height: 0px;
            float: left;
  }
  .triangle_right{
    border-style: solid;
            border-width: 10px;
            border-color:  transparent #F56C6C transparent transparent ;
            width: 0px;
            height: 0px;
            float: right;
  }
  .border_{
    width: 120px;
    border: 3px solid #F56C6C;
  }
  .blue{
    color: #409EFF;
  }
  .content{
    font-size: 10px;
    margin-left:20px;
  }
</style>
