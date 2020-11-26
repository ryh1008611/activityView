<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8" :offset="8">
        <h2 style="text-align:center">学生活动管理系统活动申请</h2>
        <el-form ref="book-form" :model="activity" label-position="left" label-width="80px" :span="6" :offset="6">
          <el-form-item label="活动标题" required>
            <el-input v-model="activity.title" onchange="value=value.replace(/[^\d]/g,'')" />
          </el-form-item>
          <el-form-item label="活动类型" required>
            <el-select v-model="activity.type" placeholder="请选择">
              <el-option
                v-for="(item) in Options"
                :key="item.ActivityCode"
                :label="item.name"
                :value="item.ActivityCode"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="活动内容" required>
            <el-input v-model="activity.content" />
          </el-form-item>
          <el-form-item label="活动地址" required>
            <el-input v-model="activity.adress" />
          </el-form-item>
          <el-form-item label="开始时间" required>
            <el-date-picker
              v-model="activity.start"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item label="结束时间" required>
            <el-date-picker
              v-model="activity.end"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item label="活动规则" required>
            <el-input v-model="activity.rule" />
          </el-form-item>
          <el-form-item label="活动奖品" required>
            <el-input v-model="activity.prize" />
          </el-form-item>
          <el-form-item label="图片上传" required>
            <el-upload
              action
              :auto-upload="false"
              :on-change="beforeActivityUpload"
              list-type="picture-card"
            >
              <i slot="default" class="el-icon-plus" />
              <div slot="file" slot-scope="{file}">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                >
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in" />
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download" />
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete" />
                  </span>
                </span>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogImages">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { activityTypeList } from '@/api/activity'
import { updateFile } from '@/api/file'
export default {
  name: 'Create',
  data() {
    return {
      activity: {},
      Options: [],
      dialogImages: false,
      dialogImageUrl: '',
      disabled: false,
      activityImg: null
    }
  },
  created() {
    this.setOptions()
    this.activityImg = new FormData()
  },
  methods: {
    onSubmit() {
      // const self = this
    },
    onCancel() {
    },
    setOptions() {
      activityTypeList().then(res => {
        if (res.code === 200) {
          this.Options = res.data
          // console.log(res)
        } else {
          console.log('error', res.msg)
        }
      })
    },
    setSubjectName(item) {
      // this.Options.forEach(it => {
      //   if (it.subjectCode === item) {
      //     // 相等
      //     this.book.subjectName = it.subjectName
      //   }
      // })
    },
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    uploadFile(file) {
      console.log(file)
    },
    beforeActivityUpload(param) {
      console.log(param.url)
      const img = new FormData()
      img.append('file', param.url)
      // const res = await updateFile(img)
      updateFile(img).then(res => {
        // eslint-disable-next-line eqeqeq
        if (res.code == 200) {
          console.log(res.msg)
        } else {
          console.log(res.msg)
        }
      })
      // eslint-disable-next-line eqeqeq
    }
  }
}
</script>

<style scoped>

</style>
