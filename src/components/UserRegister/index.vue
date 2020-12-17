<template>
  <div>
    <el-form :model="userRegister" label-width="100px">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="userRegister.username" autocomplete="off" maxlength="12" />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="userRegister.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="userRegister.checkPass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="userRegister.target" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="userRegister.userCode" type="text" autocomplete="off" style="width:70%" />
        <el-button type="primary" :disabled="isDisabled" style="float:right;margin-top:5px;margin-right:10px" @click="sendMsg">{{ buttonName }}</el-button>
      </el-form-item>
    </el-form>
    <div style="margin-left:70%">
      <el-button @click="closeDialog()">取 消</el-button>
      <el-button type="primary" @click="register()">注 册</el-button>
    </div>
  </div>
</template>

<script>
import { getCheckCode } from '@/api/email'
import { register } from '@/api/user'
export default {
  name: 'UserRegister',
  data() {
    return {
      userRegister: {},
      buttonName: '发送邮箱',
      isDisabled: false,
      time: 30,
      checkCode: '',
      checkEmail: ''
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    // 邮箱重置时间
    sendMsg() {
      getCheckCode({
        'target': this.userRegister.target
      }).then(res => {
        if (res.code === 200) {
          // 返回值
          // 校验验证码
          this.checkCode = res.CheckCode
          // 校验邮箱
          this.checkEmail = res.email
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
        } else {
          this.$message({
            type: 'success',
            message: '发送失败'
          })
        }
      })
    },
    register() {
      // eslint-disable-next-line eqeqeq
      if (this.checkCode == this.userRegister.userCode && this.checkEmail == this.userRegister.target) {
        register({
          'username': this.userRegister.username,
          'password': this.userRegister.pass,
          'email': this.userRegister.target
        }).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '注册成功!'
            })
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
            this.closeDialog()
          } else {
            this.$message({
              type: 'error',
              message: '注册失败!'
            })
          }
        })
      } else {
        this.$message({
          type: 'error',
          message: '验证码或邮箱不正确'
        })
      }
    },
    // 关闭弹窗
    closeDialog() {
      this.$emit('ChangeReply', false)
    }
  }
}
</script>

<style scoped lang="less">

</style>
