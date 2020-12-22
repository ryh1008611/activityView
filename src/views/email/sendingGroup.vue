<template>
  <div class="app-container">
    <el-row v-loading="loading">
      <el-col :span="8" :offset="8">
        <h2 style="text-align:center">群发信息</h2>
        <el-form ref="userList" :model="userList" label-position="left" label-width="80px" :span="6" :offset="6">
          <el-form-item label="用户列表" required>
            <el-tag
              v-for="(item, index) in userList"
              :key="'user_' + item.id"
              closable
              style="margin-left:10px"
              :disable-transitions="false"
              @close="closeTag(index)"
            >{{ item.label }}</el-tag>
            <el-button type="success" icon="el-icon-plus" style="margin-left:10px" circle @click="dialogUserInfo = true" />
          </el-form-item>
          <el-form-item label="邮件标题" required>
            <el-input
              v-model="title"
              placeholder="请输入邮件标题"
              clearable
            />
          </el-form-item>
          <el-form-item label="邮件内容" required>
            <el-input
              v-model="content"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 20}"
              placeholder="请输入内容"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="sendEmail()">立即发送</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- 弹窗
     -->
    <el-dialog
      title="提示"
      :visible.sync="dialogUserInfo"
      width="50%"
    >
      <el-transfer
        v-model="dataList"
        :data="userInfoList"
        :titles="['待选人员', '发送人员']"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUserInfo = false">取 消</el-button>
        <el-button type="primary" @click="dialogUserInfo = false;synchronization()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getActivityUserInfo } from '@/api/activity'
import { sendUserGroup } from '@/api/email'
import { getAllUser } from '@/api/user'
export default {
  name: 'Create',
  data() {
    return {
      activityId: this.$route.query.activityId,
      userList: [],
      //   右边选框列表
      dataList: [],
      userInfoList: [],
      dialogUserInfo: false,
      //   邮件标题
      title: '',
      //   邮件内容
      content: '',
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const self = this
      if (this.activityId) {
        const res = await getActivityUserInfo({
          activityId: self.activityId
        })
        if (res.code === 200) {
        // self.userInfoList = res.data
          res.data.forEach(el => {
            self.userInfoList.push({
              id: el.id,
              key: el.id,
              label: el.name
            })
          })
        }
      } else {
        const res = await getAllUser()
        if (res.code === 200) {
        // self.userInfoList = res.data
          res.records.forEach(el => {
            self.userInfoList.push({
              id: el.id,
              key: el.id,
              label: el.name
            })
          })
        }
      }
    },
    // 关掉便签
    closeTag(row) {
    //   console.log(this.userList)
      this.userList.splice(row, 1)
      //   清楚穿梭框
      this.dataList.splice(row, 1)
    //   this.userList = []
    },
    // 同步
    synchronization() {
      this.userList = []
      const self = this
      this.dataList.forEach(el => {
        self.userInfoList.forEach(e => {
          if (e.id === el) {
            // this.userList.push(e)
            this.$set(self.userList, self.userList.length, e)
          }
        })
      })
    },
    // 发送邮件
    sendEmail() {
      this.loading = true
      sendUserGroup({
        'content': this.content,
        'title': this.title,
        'userList': this.userList
      }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '发送成功！'
          })
          this.loading = false
          //   清空信息
          this.title = ''
          this.content = ''
        } else {
          this.$message({
            type: 'error',
            message: '发送失败！'
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
