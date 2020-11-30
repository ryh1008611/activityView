<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="请输入活动名称" style="width: 200px;" class="filter-item ml-10" />
      <el-select class="filter-item  ml-10">
        <el-option v-for="item in options" :key="item.name" :label="item.name" :value="item.value" />
      </el-select>
      <!-- 是否已关联 -->
      <el-button v-waves class="filter-item  ml-10" type="primary" icon="el-icon-search">
        搜索
      </el-button>
      <el-button v-waves class="filter-item  ml-10" type="plain" icon="el-icon-refresh">
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
      <el-table-column label="信息标题" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收到时间" width="80px">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.joins.start }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="430" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="mail_show(row)">
            查看物资
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <!-- 弹窗 -->
    <!-- <el-dialog title="物资信息" :visible.sync="dialogMaterial">
      <div v-for="(item, index) in material" :key="item.name">
        <Material :topics-prop.sync="material[index]" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMaterial = false">
          关闭
        </el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
// import waves from '@/directive/waves'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { getActivityList, delActivity } from '@/api/activity'
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
      total: 0,
      // 物资
      material: [],
      dialogMail: false
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
    async handleDelete(row, index) {
      const res = await delActivity(row.id)
      const self = this
      // eslint-disable-next-line eqeqeq
      if (res.code == 200) {
        self.getList()
        this.$notify({
          title: 'Success',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      } else {
        this.$notify({
          title: 'error',
          message: res.msg,
          type: 'error',
          duration: 2000
        })
      }
    },
    // 查看邮箱信息
    mail_show(row) {
    //   this.material = row.material
    //   // eslint-disable-next-line eqeqeq
    //   if (this.material.length == 0) {
    //     this.$message({
    //       type: 'error',
    //       message: '暂无物资信息'
    //     })
    //   } else {
    //     this.dialogMaterial = true
    //   }
    }
  }
}
</script>
<style>
.ml-10{
  margin-left: 10px;
}
</style>
