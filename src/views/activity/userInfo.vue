<template>
  <div class="app-container">
    <el-table
      :data="ActivityUserInfo"
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
      <el-table-column label="姓名" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话号码" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年级" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.classNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学院" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.academy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="专业" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.major }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否签到" width="150px" align="center">
        <template slot-scope="{row}">
          <div>
            <el-switch
              v-model="row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              active-text="已签"
              inactive-text="未签"
              @change="setSignIn(row)"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini">
            发送邮件
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
import { getActivityUserInfo } from '@/api/activity'
export default {
  name: 'Activity',
  components: { Pagination },
  data() {
    return {
      listQuery: {
        activityId: this.$route.query.activityId,
        page: 1,
        pageSize: 10
      },
      ActivityUserInfo: [],
      total: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await getActivityUserInfo(this.listQuery)
      if (res.code === 200) {
        this.ActivityUserInfo = res.data.data
        this.total = res.data.total
        console.log(res)
      } else {
        this.$message({
          'type': 'error',
          'message': '获取失败'
        })
      }
    },
    setSignIn(row) {

    }
  }
}
</script>
