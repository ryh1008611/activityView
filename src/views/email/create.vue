<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8" :offset="8">
        <h2 style="text-align:center">邮箱绑定</h2>
        <el-form ref="email" :model="email" :rules="rules" label-position="left" label-width="80px" :span="6" :offset="6">
          <p v-if="isBinding" style="font-size:12px;color:red">*该邮箱已经绑定，如需修改，请联系管理员</p>
          <el-form-item label="邮箱" required prop="mail_adress">
            <el-input v-model="email.mail_adress" :disabled="isBinding" placeholder="请填写邮箱地址" />
          </el-form-item>
          <el-form-item label="授权码" required prop="authorizationCode">
            <el-input v-model="email.authorizationCode" :disabled="isBinding" placeholder="请填写授权码" />
          </el-form-item>
          <router-link to="/email/step" style="font-size:12px;color:blue">如何获取授权码？点击查看教程</router-link>
          <el-form-item v-if="!isBinding">
            <el-button type="primary" @click="onSubmit(email)">立即绑定</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getEmailInfo, setEmailInfo } from '@/api/email'
export default {
  name: 'EmailCreate',
  data() {
    return {
      email: {},
      isBinding: false,
      rules: {
        mail_adress: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' }
        ],
        authorizationCode: [
          { required: true, message: '请输入授权码', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      getEmailInfo().then(res => {
        if (res.data.length > 0) {
          this.isBinding = true
          this.email = res.data[0]
        }
      })
    },
    onSubmit(email) {
      this.$refs.email.validate((valid) => {
        if (valid) {
          setEmailInfo(this.email).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: res.msg
              })
              this.isBinding = true
            } else {
              this.$message({
                type: 'error',
                message: res.msg
              })
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '不能为空'
          })
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
