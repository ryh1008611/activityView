<template>
  <div>
    <el-col :span="24">
      <div class="letter_bg">
        <h2 style="text-align:center">{{ TopicsProp.title }}</h2>
        <p>亲爱的朋友:</p>
        <p style="text-indent:2em"><span>您好！</span>{{ TopicsProp.content }}</p>
        <div>
          <p style="float:right">
            {{ TopicsProp.created_at }}
          </p>
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'EmailShow',
  props: {
    topicsProp: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      TopicsProp: this.topicsProp,
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
.letter_bg{
    /* background-image: url('/images/letter.jpg'); */
    background: rgb(209,180,127);
    width:100%;
    height:400px;
    background-size: 100% 100%;
    padding: 10px;
}
</style>
