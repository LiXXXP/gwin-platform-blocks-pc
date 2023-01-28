<template>
  <el-form-item>
    <template v-if="props.label" #label>
      <div class="gwin-platform-title">
        <div>
          <span style="font-weight: 700">{{ props.label }}</span>
          <el-tooltip
            v-if="props.content"
            :content="props.content"
            placement="top"
            popper-class="gwin-platform-tooltip"
          >
            <i class="gwin-platform-icon__psq"></i>
          </el-tooltip>
        </div>
        <el-button v-if="props.isEdit" size="small" :icon="Edit" round @click="onOpenCodeDialog">编辑</el-button>
      </div>
    </template>
    <div
      ref="codeEditBox"
      class="gwin-platform-editor"
      :style="{ height: props.minHeight ? props.minHeight : '100px' }"
    ></div>
    <p v-if="props.placeholder">*{{ props.placeholder }}</p>
  </el-form-item>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Edit } from '@element-plus/icons-vue'
import { useMonacoEditor } from './monaco'

const codeEditBox = ref<HTMLElement>() // dom element
const emits = defineEmits(['update:modelValue', 'onBlur', 'onOpenCodeDialog'])

interface Props {
  modelValue: any
  label?: string
  content?: string
  placeholder?: string
  minHeight?: string
  language?: string
  isEdit?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  content: '',
  placeholder: '',
  modelValue: null,
  minHeight: '',
  language: 'json',
  isEdit: true
})

const { onOpenCodeDialog } = useMonacoEditor(codeEditBox, emits, props)
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
p {
  color: #606266;
  font-size: 12px;
  line-height: 20px;
}
@include b('title') {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
@include b('icon') {
  @include e('psq') {
    width: 14px;
    height: 14px;
    cursor: pointer;
    margin-left: 8px;
    margin-bottom: 3px;
    display: inline-block;
    vertical-align: middle;
    background: url('@/assets/img/form/icon-psq.png') no-repeat 0 0;
    background-size: 100%;
  }
}
@include b('editor') {
  width: 100%;
  border-radius: 4px;
  border: 1px solid #d4d6d9;
}
</style>
