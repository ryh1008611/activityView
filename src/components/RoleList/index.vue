<template>
  <div>
    <!-- <el-checkbox  :checked="role.roleStatus" :label="role.name">{{ role.name }}</el-checkbox> -->
    <el-button type="primary" @click="addRole()">新增</el-button>
    <el-form ref="role" :model="role" label-width="80px">
      <div v-for="(role, index) in roleUserList" :key="'role' + index">
        <TextInput
          :roles.sync="role"
          :role-list="roleList"
          @store="handleStore"
          @delete="handleDelete"
        />
      </div>
    </el-form>
  </div>
</template>

<script>
import { getRoleList, getUserRoleList, addRole, deleteRole } from '@/api/role'
import TextInput from '@/components/fromData/input'
export default {
  name: 'RoleName',
  components: { TextInput },
  props: {
    userId: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    return {
      user_id: this.userId,
      roleList: null,
      roleUserList: null
    }
  },
  created() {
    this.getList()
    this.getUserRoleList()
  },
  mounted() {
  },
  methods: {
    async getList() {
      const self = this
      const res = await getRoleList()
      if (res.code === 200) {
        self.roleList = res.data.data
      }
    },
    async getUserRoleList() {
      const self = this
      console.log(self.user_id)
      const res = await getUserRoleList({
        user_id: self.user_id
      })
      if (res.code === 200) {
        // eslint-disable-next-line require-atomic-updates
        self.roleUserList = res.data
      }
    },
    handleDelete(id) {
      console.log('删除', id)
      this.$confirm('将删除这权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(id).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
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
    // 保存新增的权限
    handleStore(id) {
      addRole({
        user_id: this.user_id,
        role_id: id
      }).then(res => {
        if (res.code === 200) {
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
    },
    addRole() {
      this.roleUserList.push({})
    }

  }
}
</script>

<style scoped lang="less">

</style>
