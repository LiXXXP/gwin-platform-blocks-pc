<!--
 * @Author: Jin Biao
 * @Date: 2021-12-07 13:40:32
 * @LastEditTime: 2021-12-07 18:45:58
 * @Description:  上传图片组件
-->
<template>
  <el-upload
    action="/cos/v1/FileUpload"
    :data="{ channel: 'gwin-cloud', fileName: 'licenseUri' + Date.parse(new Date()) + '.jpeg' }"
    list-type="picture-card"
    accept="image/jpeg,image/png,image/jpg,image/JPG,image/PNG,image/JPEG"
    :limit="props.limit"
    :multiple="true"
    :file-list="state.fileList"
    :on-exceed="handleOnExceed"
    :before-upload="handleBeforeUpload"
    :on-success="handleSuccess"
    :on-change="handleChange"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :class="{ hide: state.hideUpload }"
  >
    <el-icon><svg-icon class-name="icon" icon-class="add"></svg-icon></el-icon>
  </el-upload>
  <!-- 预览 -->
  <el-dialog v-model="state.dialogVisible" :append-to-body="true">
    <img style="width: 100%" :src="state.dialogImageUrl" alt="" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['onUploadSuccess'])

interface UploadProps {
  limit: number
  images: Array
}
const props = withDefaults(defineProps<UploadProps>(), {
  limit: 1
})

const state = reactive({
  fileList: [],
  dialogImageUrl: '',
  dialogVisible: false,
  hideUpload: false
})

onMounted(() => {
  props.images.forEach((item) => {
    state.fileList.push({
      url: item
    })
  })
})

// 文件数量
const handleOnExceed = () => {
  ElMessage.error(`最多只能上传${props.limit}张图片！`)
}

// 文件格式
const handleBeforeUpload = (file) => {
  const isIMAGE = file.type === 'image/jpeg' || 'image/png' || 'image/jpg' || 'image/JPG' || 'image/PNG' || 'image/JPEG'
  const isLt500KB = file.size / 1024 / 1024 < 5
  if (!isIMAGE) {
    ElMessage.error('上传图片只能是图片格式！')
  }
  if (!isLt500KB) {
    ElMessage.error('上传文件大小不能超过 5M!')
  }
  return isIMAGE && isLt500KB
}
// 预览
const handlePictureCardPreview = (file) => {
  state.dialogImageUrl = file.url
  state.dialogVisible = true
}

// 上传成功
const handleSuccess = (response, file, fileList) => {
  state.fileList = fileList
}

// 文件改变
const handleChange = (file, fileList) => {
  state.hideUpload = fileList.length >= props.limit
  state.fileList = fileList
  updateChange()
}

// 删除
const handleRemove = (file, fileList) => {
  state.hideUpload = fileList.length >= props.limit
  state.fileList = fileList
  updateChange()
}

// 文件更新
const updateChange = () => {
  const imgList = []
  let show = true
  state.fileList.forEach((item) => {
    if (item.response && item.response.status.success) {
      show = true
      imgList.push(item.response.body.fileUrl)
    } else {
      show = false
      imgList.push(item.url)
    }
  })
  if (show) emit('onUploadSuccess', imgList)
}
</script>

<style lang="scss" scoped>
.hide :deep(.el-upload--picture-card) {
  display: none;
}
</style>
