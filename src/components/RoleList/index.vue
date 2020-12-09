<template>
  <div>
    <el-checkbox v-for="(role, index) in roleList" :key="'role' + index" :label="role.name">{{ role.name }}</el-checkbox>
  </div>
</template>

<script>
import { getRoleList, getUserRoleList } from '@/api/role'
export default {
  name: 'RoleName',
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
        self.roleList.forEach(el => {
          if (el.id === self.roleUserList.id) {
            el.$set('roleStatus', true)
          } else {
            el.$set('roleStatus', false)
          }
        })
        console.log(self.roleList)
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
