<template>
  <div>
    <div v-for="(item, index) in TopicsProp" :key="'sign_' + index">
      <Sign :topics.sync="TopicsProp[index]" :is-ban="Ban" />
      <p>-</p>
    </div>
  </div>
</template>

<script>
import Sign from './sign.vue'
export default {
  name: 'MaterialIndex',
  components: { Sign },
  props: {
    topicsProp: {
      type: Object,
      default: () => {}
    },
    ban: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      Ban: this.ban,
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
