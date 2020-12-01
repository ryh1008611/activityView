<template>
  <div>
    <el-col :span="16">
      <el-form ref="TopicsProp" :model="TopicsProp" :rules="rules" label-position="left" label-width="80px" :span="12">
        <el-form-item label="收件人" required prop="target">
          <el-input v-model="TopicsProp.target" placeholder="请输入收件人" />
        </el-form-item>
        <el-form-item label="标题" required prop="title">
          <el-input v-model="TopicsProp.title" placeholder="请输入标题主题" />
        </el-form-item>
        <el-form-item label="正文" required prop="content">
          <el-input v-model="TopicsProp.content" type="textarea" :rows="4" placeholder="请输入正文" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">发送邮件</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
import { sendEmail } from '@/api/email'
export default {
  name: 'EmailSend',
  props: {
    aim: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      TopicsProp: {
        target: this.aim,
        title: '',
        TopicsProp: ''
      },
      rules: {
        target: [
          { required: true, message: '请输入收件人地址', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
  },
  created() {
  },
  methods: {
    async onSubmit() {
      const self = this
      const res = await sendEmail(self.TopicsProp)
      // eslint-disable-next-line eqeqeq
      if (res.code == 200) {
        self.$message({
          type: 'success',
          message: res.msg
        })
        // 初始化
        // self.TopicsProp = {
        //   target: '',
        //   title: '',
        //   TopicsProp: ''
        // }
        self.$refs['TopicsProp'].resetFields()
        // 关闭父组件的弹窗
        self.$emit('ChangeReply', false)
      } else {
        self.$message({
          type: 'error',
          message: res.msg
        })
      }
    }
  }
}
</script>
<style>
*{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.inputCommonly{
    width:100px;
    margin: 0 10px;
}
</style>
