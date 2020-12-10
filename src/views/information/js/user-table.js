// eslint-disable-next-line no-unused-vars
// import waves from '@/directive/waves'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { updateUserStatus } from '@/api/user'
import { getUserList } from '@/api/user'
import roleList from '@/components/RoleList'
export default {
  name: 'UsesInfo',
  components: { Pagination, roleList },
  data() {
    return {
      listQuery: {
        page: 1,
        pageSize: 10
      },
      ActivityInfo: [],
      total: 0,
      // 物资
      userId: null,
      dialogRole: false,
      dialogState: false,
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
      ],
      userInfo: {},
      dialogInformation: false
    }
  },
  created() {
    this.getList()
  },
  fillter: {
  },
  methods: {
    async getList() {
      const res = await getUserList(this.listQuery)
      if (res.code === 200) {
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
    // async handleDelete(row, index) {
    //   const res = await delActivity(row.id)
    //   const self = this
    //   // eslint-disable-next-line eqeqeq
    //   this.$confirm('此操作将永久删除, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     // eslint-disable-next-line eqeqeq
    //     if (res.code == 200) {
    //       self.getList()
    //       this.$notify({
    //         title: 'Success',
    //         message: '删除成功',
    //         type: 'success',
    //         duration: 2000
    //       })
    //     } else {
    //       this.$notify({
    //         title: 'error',
    //         message: res.msg,
    //         type: 'error',
    //         duration: 2000
    //       })
    //     }
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },
    // // 移动到userInfo
    // Move_UserInfo(row) {
    //   this.$router.push({
    //     path: '/activity/userInfo',
    //     query: {
    //       activityId: row.id
    //     }
    //   })
    // },
    // 更爱用户状态
    setUserState(row) {
      updateUserStatus({
        'user_id': row.id,
        'status': row.status
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
