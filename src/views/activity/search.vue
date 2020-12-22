<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="请输入活动名称" style="width: 200px;" class="filter-item ml-10" />
      <el-input v-model="listQuery.adress" placeholder="请输入活动地址" style="width: 200px;" class="filter-item ml-10" />
      <el-date-picker
        v-model="listQuery.start"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        class="filter-item ml-10"
      />
      <!-- 是否已关联 -->
      <el-button class="filter-item  ml-10" type="primary" icon="el-icon-search" @click="getList()">
        搜索
      </el-button>
      <el-button
        class="filter-item  ml-10"
        type="plain"
        icon="el-icon-refresh"
        @click="listQuery = { page: 1,pageSize: 10}"
      >
        重置
      </el-button>
    </div>
    <el-table
      :data="ActivityInfo"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动标题" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动封面" width="150px" align="center">
        <template slot-scope="{row}">
          <div>
            <img :src="row.url" style="width:100px;height:100px">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="活动地址" align="center">
        <template slot-scope="{row}">
          <span>{{ row.adress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="主办方" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间">
        <template slot-scope="{row}">
          <span style="color:#409EFF;">{{ row.start }}</span>
        </template>
      </el-table-column>
      <el-table-column label="截止时间" align="center">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.end }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="Move_Activity(row)">
            立即报名
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <!-- 弹窗 -->
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
// import waves from '@/directive/waves'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { getActivityOnlineList } from '@/api/activity'
export default {
  name: 'Search',
  components: { Pagination },
  data() {
    return {
      listQuery: {
        page: 1,
        pageSize: 10
      },
      ActivityInfo: [],
      total: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
    //   var start = Date.now()
      const res = await getActivityOnlineList(this.listQuery)
      if (res.code === 200) {
        // var millis = Date.now() - start
        // console.log(millis + 'ms')
        this.ActivityInfo = res.data.data
        this.total = res.data.total
      } else {
        this.$message({
          'type': 'error',
          'message': '获取失败'
        })
      }
    },
    // 移动到活动信息页面
    Move_Activity(row) {
      this.$router.push({
        path: '/activity/show',
        query: {
          activityId: row.id
        }
      })
    }
  }
}
</script>
<style>
.ml-10{
  margin-left: 10px;
}
</style>
