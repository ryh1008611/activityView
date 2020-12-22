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
      <el-table-column label="活动地址" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.adress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" width="80px">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.start }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center" width="95">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.end }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否签到" class-name="status-col">
        <template slot-scope="{row}">
          <el-tag :type="row.pivot.status == 1 ? 'success' : 'info'">{{ row.pivot.status == 1 ? '已签到' : '未签到' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="活动状态" class-name="status-col">
        <template slot-scope="{row}">
          <el-tag :type="row.status == 1 ? 'success' : 'info'">{{ row.status == 0 ? '未审核' : row.status == 1 ?'上线中' : '已下架' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="信息" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="Move_Activity(row)">
            活动信息
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <!-- 弹窗 -->
    <el-dialog title="物资信息" :visible.sync="dialogMaterial">
      <Material :topics-prop.sync="material" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMaterial = false">
          关闭
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
// import waves from '@/directive/waves'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { getMyJoinList } from '@/api/join'
import Material from '@/components/material'
export default {
  name: 'ActivityExamine',
  components: { Pagination, Material },
  data() {
    return {
      listQuery: {
        page: 1,
        pageSize: 10
      },
      ActivityInfo: [],
      total: 0,
      // 物资
      material: [],
      dialogMaterial: false,
      // 搜索功能栏目
      options: [
        {
          'name': '未审核',
          'value': 0
        },
        {
          'name': '已上架',
          'value': 1
        },
        {
          'name': '已下架',
          'value': 2
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await getMyJoinList({
        page: this.listQuery.page,
        pageSize: this.listQuery.pageSize,
        title: this.listQuery.title,
        adress: this.listQuery.adress,
        start: this.listQuery.start
      })
      if (res.code === 200) {
        this.ActivityInfo = res.data.data
        this.total = res.data.total
        console.log(res)
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
