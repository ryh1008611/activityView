<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8" :offset="8">
        <h2 style="text-align:center">个人信息</h2>
        <el-form ref="users-form" :model="users" label-position="left" label-width="80px" :span="6" :offset="6">
          <el-form-item label="姓名">
            <el-input v-model="users.name" :disabled="!isEdit" />
            <el-button v-if="!isEdit" type="primary" class="spacing" icon="el-icon-edit" circle @click="IsEdit()" />
          </el-form-item>
          <el-form-item label="年级">
            <el-input v-model="users.classNum" :disabled="!isEdit" />
            <el-button v-if="!isEdit" type="primary" class="spacing" icon="el-icon-edit" circle @click="IsEdit()" />
          </el-form-item>
          <el-form-item label="学院">
            <el-input v-model="users.academy" :disabled="!isEdit" />
            <el-button v-if="!isEdit" type="primary" class="spacing" icon="el-icon-edit" circle @click="IsEdit()" />
          </el-form-item>
          <el-form-item label="专业">
            <el-input v-model="users.major" :disabled="!isEdit" />
            <el-button v-if="!isEdit" type="primary" class="spacing" icon="el-icon-edit" circle @click="IsEdit()" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="users.email" :disabled="true" />
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="users.phone" :disabled="!isEdit" />
            <el-button v-if="!isEdit" type="primary" class="spacing" icon="el-icon-edit" circle @click="IsEdit()" />
          </el-form-item>
          <el-form-item v-if="isEdit">
            <el-button type="primary" @click="updateHandle()">确定修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getInfo, updateUserInfo } from '@/api/user'
export default {
  name: 'UserInfo',
  data() {
    return {
      users: {},
      isEdit: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const self = this
      const res = await getInfo()
      if (res.code === 200) {
        self.users = res.data
      }
    },
    IsEdit() {
      this.isEdit = true
    },
    async updateHandle() {
      const self = this
      const res = updateUserInfo(self.users)
      if (res.code === 200) {
        self.$message({
          'type': 'success',
          'message': '修改成功!'
        })
      } else {
        self.$message({
          'type': 'success',
          'message': '修改成功!'
        })
      }
      this.isEdit = false
    }
  }
}
</script>

<style scoped>
.el-input {
    width: 280px;
}
.spacing
{
    margin: 0 10px;
}
</style>
