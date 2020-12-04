<template>
  <div>
    <el-form :model="userRegister" label-width="100px">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="userRegister.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="userRegister.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="userRegister.checkPass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="userRegister.checkPass" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="userRegister.checkPass" type="text" autocomplete="off" style="width:70%" />
        <el-button type="primary" :disabled="isDisabled" style="float:right;margin-top:5px;margin-right:10px" @click="sendMsg">{{ buttonName }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'UserRegister',
  data() {
    return {
      userRegister: {},
      buttonName: '发送邮箱',
      isDisabled: false,
      time: 30
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    // 邮箱重置时间
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
    }
  }
}
</script>

<style scoped lang="less">

</style>
