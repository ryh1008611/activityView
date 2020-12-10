<template>
  <div>
    <el-form-item
      label="权限"
      :rules="{
        required: true, message: '权限不能为空', trigger: 'blur'
      }"
    >
      <el-select v-model="topic.id" placeholder="请选择">
        <el-option
          v-for="item in roleList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-button type="primary" style="margin-left:10px" @click="handleStore">保存</el-button>
      <el-button type="danger" @click="handleDelete">删除</el-button>
    </el-form-item>
  </div>
</template>

<script>
export default {
  props: {
    roles: {
      type: Object,
      default: () => {}
    },
    roleList: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      topic: this.roles
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    handleStore() {
      this.$emit('store', this.topic.id)
    },
    handleDelete() {
      this.$emit('delete', this.topic.pivot.id)
    }
  }
}
</script>

<style scoped lang="less">

</style>
