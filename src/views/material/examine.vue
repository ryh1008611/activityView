<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="请输入物资名称" style="width: 200px;" class="filter-item ml-10" />
      <!-- 是否已关联 -->
      <el-button class="filter-item  ml-10" type="primary" icon="el-icon-search">
        搜索
      </el-button>
      <el-button class="filter-item  ml-10" type="plain" icon="el-icon-refresh">
        重置
      </el-button>
    </div>
    <el-table
      :data="MaterialInfo"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="物资名称" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.materialName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请单位" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请活动名" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ActivityName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="物资申请数量" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="150px" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status === 1 ?'success' : row.status === 2 ? 'danger' : 'info'">{{ row.status === 1 ?'通过' : row.status === 2 ? '未通过' : '未审核' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="审核" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="examine(row, 1)">
            通过
          </el-button>
          <el-button size="mini" type="danger" @click="examine(row, 2)">
            不通过
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
import Pagination from '@/components/Pagination'
import { examineMaterialList, updateExamineStatus } from '@/api/material'
export default {
  name: 'ExamineMaterialList',
  components: { Pagination },
  data() {
    return {
      listQuery: {
        page: 1,
        pageSize: 10
      },
      MaterialInfo: [],
      total: 0,
      // 物资
      material: [],
      dialogMaterial: false,
      createMaterial: {},
      operation: false,
      // 搜索功能栏目
      options: [
        {
          'name': '未审核',
          'value': 0
        },
        {
          'name': '通过',
          'value': 1
        },
        {
          'name': '不通过',
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
      const res = await examineMaterialList(this.listQuery)
      if (res.code === 200) {
        //   赋值
        this.MaterialInfo = res.records.data
        this.total = res.records.total
        console.log(res)
      } else {
        this.$message({
          'type': 'error',
          'message': '获取失败'
        })
      }
    },
    // 通过审核updateExamineStatus
    examine(row, status) {
      this.$confirm('此操作将更改状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateExamineStatus(row.id, status).then(res => {
          if (res.code === 200) {
            this.getList()
            this.$message({
              type: 'success',
              message: res.msg
            })
          } else {
            this.$message({
              type: 'success',
              message: res.msg
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
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
