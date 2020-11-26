<template>
  <div>
    <el-col style="line-height:30px;font-size:18px" :span="4">
      {{ TopicsProp.name }}：
    </el-col>
    <el-col :span="4">
      <el-input
        v-model="TopicsProp.pivot.num"
        :disabled="isban"
        class="inputCommonly"
      />
    </el-col>
    <el-col :span="16">
      <el-input-number v-model="TopicsProp.pivot.num" :disabled="isban" />
    </el-col>
    <br>
  </div>
</template>

<script>
export default {
  name: 'Material',
  props: {
    topicsProp: {
      type: Object,
      default: () => {}
    },
    isBan: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isban: this.isBan,
      TopicsProp: this.topicsProp
    }
  },
  watch: {
  },
  created() {
  },
  methods: {
    getList() {
    },
    handleCreate() {
    },
    createData() {
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
