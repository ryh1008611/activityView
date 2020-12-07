// eslint-disable-next-line no-unused-vars
// import waves from '@/directive/waves'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { getUserRoleList } from '@/api/role'
export default {
  name: 'UsesInfo',
  components: { Pagination },
  data() {
    return {
      listQuery: {
        page: 1,
        pageSize: 10,
        user_id: this.$routh.query.userId
      },
      RoleInfo: [],
      total: 0
    }
  },
  created() {
    this.getList()
  },
  fillter: {
  },
  methods: {
    async getList() {
      const res = await getUserRoleList(this.listQuery)
      if (res.code === 200) {
        this.RoleInfo = res.records.data
        this.total = res.records.total
        console.log(res)
      } else {
        this.$message({
          'type': 'error',
          'message': '获取失败'
        })
      }
    }
  }
}
