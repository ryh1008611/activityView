<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.search" placeholder="请输入活动名称" style="width: 200px;" class="filter-item ml-10" />
      <span style="margin: 0 10px">审核状态:</span>
      <el-select v-model="listQuery.status" placeholder="选择状态" style="width:120px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        />
      </el-select>
      <el-button class="filter-item  ml-10" type="primary" icon="el-icon-search" @click="getList()">
        搜索
      </el-button>
      <el-button class="filter-item  ml-10" type="plain" icon="el-icon-refresh" @click="listQuery.status = null;listQuery.search = ''">
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
          <el-tag :type="MaterisalStatus[row.apply_status]">{{ options[row.apply_status].name }}</el-tag>
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
      <el-table-column label="赁归" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="success" size="mini" @click="examine(row, 3)">
            领取
          </el-button>
          <el-button size="mini" type="warning" @click="examine(row, 4)">
            归还
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
        pageSize: 10,
        status: null
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
        },
        {
          'name': '已领取',
          'value': 3
        },
        {
          'name': '已归还',
          'value': 4
        }
      ],
      MaterisalStatus: ['info', 'success', 'danger', '', 'warning']
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
              type: 'error',
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
