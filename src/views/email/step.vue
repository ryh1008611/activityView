<template>
  <div class="app-container">
    <el-steps :active="active" align-center>
      <el-step title="步骤1" description="登录QQ邮箱，点击账号下面的设置" />
      <el-step title="步骤2" description="在设置中点击账户" />
      <el-step title="步骤3" description="滑到下面看到红色圈圈的服务，点击开启" />
      <el-step title="步骤4" description="给手机发送验证，获取授权码" />
      <el-step title="步骤4" description="获取授权码，复制到绑定界面中" />
    </el-steps>
    <img :src="'/stepImg/step' + active +'.png'" alt="">
    <el-button style="margin-top: 12px;float:right" @click="next">下一步</el-button>
  </div>
</template>

<script>
export default {
  name: 'Step',
  data() {
    return {
      active: 1
    }
  },
  created() {
  },
  methods: {
    next() {
      if (this.active++ > 4) this.active = 1
    }
  }
}
</script>

<style scoped>
</style>
