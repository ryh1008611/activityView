<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="请输入活动类型名称" style="width: 200px;" class="filter-item ml-10" />
      <el-input v-model="listQuery.ActivityCode" placeholder="请输入活动代号" style="width: 200px;" class="filter-item ml-10" />
      <!-- 是否已关联 -->
      <el-button class="filter-item  ml-10" type="primary" icon="el-icon-search" @click="getList()">
        搜索
      </el-button>
      <el-button class="filter-item  ml-10" type="plain" icon="el-icon-refresh" @click="listQuery.name = '';listQuery.ActivityCode= ''">
        重置
      </el-button>
      <el-button class="filter-item  ml-10" type="primary" icon="el-icon-plus" @click="dialogActivityType = true;operation = true">
        添加活动类型
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
      <el-table-column label="活动类型名称" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动类型代号" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ActivityCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="dialogActivityType = true;operation = false; createActivityType = row">
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
    <el-dialog :title="operation ? '添加活动类型' : '修改活动类型'" :visible.sync="dialogActivityType">
      <el-form ref="createActivityType" :model="createActivityType" class="demo-ruleForm">
        <el-form-item label="活动类型名称">
          <el-input v-model="createActivityType.name" />
        </el-form-item>
        <el-form-item label="活动类型代号">
          <el-input v-model="createActivityType.ActivityCode" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="operation" type="primary" @click="dialogActivityType = false;addActivityType()">
          确定
        </el-button>
        <el-button v-if="!operation" type="primary" @click="dialogActivityType = false;updateActivityType()">
          修改
        </el-button>
        <el-button @click="dialogActivityType = false;createActivityType = {}">
          关闭
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
// import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { activityTypeList, addActivityType, updateActivityType, deleteActivityType } from '@/api/activity'
export default {
  name: 'ActivityTypeList',
  components: { Pagination },
  data() {
    return {
      listQuery: {
        page: 1,
        pageSize: 10,
        name: '',
        ActivityCode: ''
      },
      MaterialInfo: [],
      total: 0,
      // 物资
      material: [],
      dialogActivityType: false,
      createActivityType: {},
      operation: false
      // 搜索功能栏目
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await activityTypeList(this.listQuery)
      if (res.code === 200) {
        //   赋值
        this.MaterialInfo = res.data.data
        this.total = res.data.total
        console.log(res)
      } else {
        this.$message({
          'type': 'error',
          'message': '获取失败'
        })
      }
    },
    // 删除物资
    handleDelete(row) {
      this.$confirm('此操作将永久删除该活动类型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteActivityType(row.id).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: res.msg
            })
            this.getList()
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
          message: '已取消删除'
        })
      })
    },
    // 添加物资
    async addActivityType() {
      const self = this
      const res = await addActivityType(self.createActivityType)
      if (res.code === 200) {
        self.$message({
          type: 'success',
          message: res.msg
        })
        // 刷新页面，重置属性
        self.getList()
        self.createActivityType = {}
      } else {
        self.$message({
          type: 'success',
          message: res.msg
        })
      }
    },
    // 修改物资
    async updateActivityType() {
      const self = this
      const res = await updateActivityType(self.createActivityType.id, self.createActivityType)
      if (res.code === 200) {
        self.$message({
          type: 'success',
          message: res.msg
        })
        // 刷新页面，重置属性
        self.getList()
        self.createActivityType = {}
      } else {
        self.$message({
          type: 'success',
          message: res.msg
        })
      }
    }
  }
}
</script>
<style>
.ml-10{
  margin-left: 10px;
}
</style>
