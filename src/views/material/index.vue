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
      <el-button class="filter-item  ml-10" type="primary" icon="el-icon-plus" @click="dialogMaterial = true;operation = true">
        添加物资
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
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.describe }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="dialogMaterial = true;operation = false; createMaterial = row">
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
    <el-dialog :title="operation ? '添加物资' : '修改物资'" :visible.sync="dialogMaterial">
      <el-form ref="createMaterial" :model="createMaterial" label-width="100px" class="demo-ruleForm">
        <el-form-item label="物资名称">
          <el-input v-model="createMaterial.name" />
        </el-form-item>
        <el-form-item label="物资描述">
          <el-input v-model="createMaterial.describe" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="operation" @click="dialogMaterial = false;addMaterial()">
          确定
        </el-button>
        <el-button v-if="!operation" @click="dialogMaterial = false;updateMaterial()">
          确定
        </el-button>
        <el-button @click="dialogMaterial = false;createMaterial = {}">
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
import { getMaterialList, createMaterials, updateMaterial, deleteMaterial } from '@/api/material'
export default {
  name: 'MaterialList',
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
      operation: false
      // 搜索功能栏目
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await getMaterialList(this.listQuery)
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
    // 删除物资
    handleDelete(row) {
      this.$confirm('此操作将永久删除该物资, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMaterial(row.id).then(res => {
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
    async addMaterial() {
      const self = this
      const res = await createMaterials(self.createMaterial)
      if (res.code === 200) {
        self.$message({
          type: 'success',
          message: res.msg
        })
        // 刷新页面，重置属性
        self.getList()
        self.createMaterial = {}
      } else {
        self.$message({
          type: 'success',
          message: res.msg
        })
      }
    },
    // 修改物资
    async updateMaterial() {
      const self = this
      const res = await updateMaterial(self.createMaterial)
      if (res.code === 200) {
        self.$message({
          type: 'success',
          message: res.msg
        })
        // 刷新页面，重置属性
        self.getList()
        self.createMaterial = {}
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
