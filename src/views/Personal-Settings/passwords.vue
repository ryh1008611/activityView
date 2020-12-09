<template>
  <div>
    <el-row>
      <el-col :span="8" :offset="8">
        <h2 style="text-align:center">修改密码</h2>
        <el-form ref="passWordList" :model="passWordList" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="旧密码">
            <el-input v-model="passWordList.oldPass" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="新密码" prop="pass">
            <el-input v-model="passWordList.pass" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="passWordList.checkPass" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('passWordList')">提交</el-button>
            <el-button @click="resetForm('passWordList')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- <el-container id="app">
      <el-button type="primary" :disabled="isDisabled" @click="sendMsg">{{ buttonName }}</el-button>
    </el-container> -->
  </div>
</template>

<script>
import { updatePassword } from '@/api/user'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.passWordList.checkPass !== '') {
          this.$refs.passWordList.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passWordList.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      passWordList: {
        pass: '',
        checkPass: '',
        oldPass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      buttonName: '发送短信',
      isDisabled: false,
      time: 30
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    submitForm(formName) {
      this.$router.push({
        path: '#'
      })
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updatePassword(this.passWordList.pass).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: res.data
              })
              this.logout()
              this.$router.go(0)
            } else {
              this.$message({
                type: 'error',
                message: res.data
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    sendMsg() {
      const me = this
      me.isDisabled = true
      const interval = window.setInterval(function() {
        me.buttonName = '（' + me.time + '秒）后重新发送'
        --me.time
        if (me.time < 0) {
          me.buttonName = '重新发送'
          me.time = 10
          me.isDisabled = false
          window.clearInterval(interval)
        }
      }, 1000)
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style scoped lang="less">

</style>
