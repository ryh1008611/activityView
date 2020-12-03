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
      <el-button class="filter-item  ml-10" type="primary" icon="el-icon-search" @click="dialogcreateMaterial = true">
        物资申请
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
      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="_edit(row);">
            修改信息
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <!-- 弹窗 -->
    <!-- 修改物资 -->
    <el-dialog title="修改物资" :visible.sync="dialogMaterial">
      <el-form ref="editMaterial" :model="editMaterial" label-width="100px" class="demo-ruleForm">
        <el-form-item label="物资数量">
          <el-input v-model="editMaterial.num" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateMaterial()">
          确定
        </el-button>
        <el-button @click="dialogMaterial = false">
          关闭
        </el-button>
      </div>
    </el-dialog>
    <!-- 申请物资 -->
    <el-dialog title="申请物资" :visible.sync="dialogcreateMaterial">
      <el-form ref="createMaterial" :model="createMaterial" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动名称">
          <el-select v-model="createMaterial.activity_id" placeholder="请选择">
            <el-option
              v-for="item in ActivityList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="物资名称">
          <el-select v-model="createMaterial.material_id" placeholder="请选择">
            <el-option
              v-for="item in Material"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="物资数量">
          <el-input v-model="createMaterial.num" style="width:200px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="_createMaterial()">
          确定
        </el-button>
        <el-button @click="dialogcreateMaterial = false">
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
// eslint-disable-next-line no-unused-vars
import { getMaterialList, myMaterialList, updateMaterialApply, createMaterialApply } from '@/api/material'
import { passActivityList } from '@/api/activity'
export default {
  name: 'MyMaterialList',
  components: { Pagination },
  data() {
    return {
      listQuery: {
        page: 1,
        pageSize: 10,
        status: null
      },
      //   物资列表
      Material: [],
      MaterialInfo: [],
      total: 0,
      // 物资
      material: [],
      ActivityList: [],
      dialogMaterial: false,
      dialogcreateMaterial: false,
      createMaterial: {},
      editMaterial: {},
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
    this.getMaterialList()
    this.passActivityList()
  },
  methods: {
    async getList() {
      const res = await myMaterialList(this.listQuery)
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
    async getMaterialList() {
      const self = this
      const res = await getMaterialList()
      if (res.code === 200) {
        self.Material = res.records.data
      }
    },
    async passActivityList() {
      const self = this
      const res = await passActivityList(self.createMaterial)
      if (res.code === 200) {
        self.ActivityList = res.data
      }
    },
    _edit(row) {
      if (row.status === 0) {
        this.editMaterial = row
        this.dialogMaterial = true
      } else {
        this.$message({
          'type': 'warning',
          'message': '只有未审核才可以修改'
        })
      }
    },
    updateMaterial() {
      updateMaterialApply(this.editMaterial).then(res => {
        if (res.code === 200) {
          this.$message({
            'type': 'success',
            'message': res.msg
          })
        } else {
          this.$message({
            'type': 'error',
            'message': res.msg
          })
        }
        this.dialogMaterial = false
      })
    },
    _createMaterial() {
      createMaterialApply(this.createMaterial).then(res => {
        if (res.code === 200) {
          this.$message({
            'type': 'success',
            'message': res.msg
          })
          this.getList()
        } else {
          this.$message({
            'type': 'error',
            'message': res.msg
          })
        }
        this.dialogcreateMaterial = false
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
