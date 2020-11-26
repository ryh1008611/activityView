<template>
  <div class="app-container">
    <el-row>
      <el-col :span="16" :offset="4">
        <h1 style="text-align:center">{{ activity.title }}</h1>
      </el-col>
      <el-col :span="16" :offset="4">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in activity.images" :key="'imgages_' + item.id">
            <!-- <h3 class="medium">{{ item }}</h3> -->
            <img :src="item.url" style="width:100%;height:100%">
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col
        :span="16"
        :offset="4"
      >
        <el-card class="box-card" style="padding: 0">
          <el-col>活动内容:</el-col>
          <el-col>{{ activity.content }}</el-col>
          <el-col>活动地点:</el-col>
          <el-col>{{ activity.adress }}</el-col>
          <el-col>活动规则:</el-col>
          <el-col>
            <p v-for="(item, index) in activity.rule" :key="'rule_' + index"><span>{{ activityRules[index] + ':' }}</span><span>{{ item }}</span></p>
          </el-col>
          <el-col>活动奖品:</el-col>
          <el-col>
            <p v-for="(item, index) in activity.prize" :key="'prize_' + index"><span>{{ activityPrize[index] + ':' }}</span><span>{{ item }}</span></p>
          </el-col>
          <el-col>活动时间:</el-col>
          <el-col>
            <p>开始时间：{{ activity.start }} 结束时间：{{ activity.end }}</p>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { showActivity } from '@/api/activity'
export default {
  name: 'Show',
  data() {
    return {
      activity: {},
      activityId: this.$route.query.activityId,
      activityRules: ['第一条', '第二条', '第三条', '第四条', '第五条', '第六条', '第七条'],
      activityPrize: ['第一名', '第二名', '第三名', '第四名', '第五名', '第六名', '第七名']
    }
  },
  created() {
    this.getList()
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
</style>
