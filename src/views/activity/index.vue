<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="请输入活动名称" style="width: 200px;" class="filter-item ml-10" />
      <el-select class="filter-item  ml-10">
        <el-option v-for="item in options" :key="item.name" :label="item.name" :value="item.value" />
      </el-select>
      <!-- 是否已关联 -->
      <el-button class="filter-item  ml-10" type="primary" icon="el-icon-search">
        搜索
      </el-button>
      <el-button class="filter-item  ml-10" type="plain" icon="el-icon-refresh">
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
      <el-table-column label="申请人姓名" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="目前参加活动人数" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.joins.Num }}</span>
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
          <el-tag :type="row.status == 1 ? 'success' : 'info'">{{ row.status == 0 ? '未审核' : row.status == 1 ?'上线中' : '已下架' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="物资" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="material_show(row)">
            查看物资
          </el-button>
          <el-button type="primary" size="mini" @click="material_apply(row)">
            申请物资
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="信息" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="Move_UserInfo(row)">
            参加人员
          </el-button>
          <el-button type="primary" size="mini" @click="Move_Activity(row)">
            活动信息
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini">
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row)">
            删除
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
import { getActivityList, delActivity } from '@/api/activity'
import Material from '@/components/material'
export default {
  name: 'Activity',
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
          'name': '已下架架',
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
      var start = Date.now()
      const res = await getActivityList(this.listQuery)
      if (res.code === 200) {
        var millis = Date.now() - start
        console.log(millis + 'ms')
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
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 移动到userInfo
    Move_UserInfo(row) {
      this.$router.push({
        path: '/activity/userInfo',
        query: {
          activityId: row.id
        }
      })
    },
    // 移动到活动信息页面
    Move_Activity(row) {
      this.$router.push({
        path: '/activity/show',
        query: {
          activityId: row.id
        }
      })
    },
    // 打开物资信息
    material_show(row) {
      this.material = row.material
      // eslint-disable-next-line eqeqeq
      if (this.material.length == 0) {
        this.$message({
          type: 'error',
          message: '暂无物资信息'
        })
      } else {
        this.dialogMaterial = true
      }
    },
    material_apply(row) {
      this.$router.push({
        path: '/material/myApply'
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
