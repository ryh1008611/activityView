<template>
  <div class="app-container">
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
      <el-table-column label="申请人姓名" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="目前参加活动人数" width="110px" align="center">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.joins.Num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" width="80px">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.joins.start }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center" width="95">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.joins.end }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动状态" class-name="status-col" width="100">
        <template slot-scope="{row}">
          {{ row.status }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="330" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="Move_UserInfo(row)">
            查看参加人员
          </el-button>
          <el-button type="primary" size="mini">
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
// import waves from '@/directive/waves'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { getActivityList } from '@/api/activity'
export default {
  name: 'Activity',
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
      const res = await getActivityList(this.listQuery)
      if (res.code === 200) {
        this.ActivityInfo = res.records.data
        this.total = res.records.total
        console.log(res)
      } else {
        this.$message({
          'type': 'error',
          'message': '获取失败'
        })
      }
    },
    // 移动到userInfo
    Move_UserInfo(row) {
      this.$router.push({
        path: '/activity/userInfo',
        query: {
          activityId: row.id
        }
      })
    }
  }
}
</script>
