<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="请输入活动名称" style="width: 200px;" class="filter-item ml-10" />
      <!-- 是否已关联 -->
      <el-button class="filter-item  ml-10" type="primary" icon="el-icon-search">
        搜索
      </el-button>
      <el-button class="filter-item  ml-10" type="plain" icon="el-icon-refresh">
        重置
      </el-button>
    </div>
    <el-table
      :data="EmailInfo"
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
      <el-table-column label="接收方" width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.target }}</span>
        </template>
      </el-table-column>
      <el-table-column label="信息标题" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收信时间" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="430" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="mail_show(row)">
            查看信件
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <!-- 弹窗 -->
    <el-dialog title="我的邮件" :visible.sync="dialogShow">
      <show-email v-if="someShow" :topics-prop="thisEmail" style="height:400px" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">
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
import { delActivity } from '@/api/activity'
import { getMySend } from '@/api/email'
import showEmail from '@/components/Email/show'
export default {
  name: 'MyEmail',
  components: { Pagination, showEmail },
  data() {
    return {
      listQuery: {
        page: 1,
        pageSize: 10
      },
      EmailInfo: [],
      total: 0,
      aimAdress: '',
      // 物资
      thisEmail: [],
      dialogReply: false,
      dialogShow: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await getMySend(this.listQuery)
      if (res.code === 200) {
        this.EmailInfo = res.records.data
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
      this.thisEmail = row
      //   重新加载子组件
      this.someShow = false
      var _this = this
      this.$nextTick(function() {
        _this.someShow = true
      })
      //   关闭弹窗
      this.dialogShow = true
      // this.dialogMaterial = true
    }
  }
}
</script>
<style>
.ml-10{
  margin-left: 10px;
}
</style>
