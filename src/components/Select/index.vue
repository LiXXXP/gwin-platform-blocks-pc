<template>
  <el-form-item>
    <template #label>
      <div class="gwin-platform-title">
        <div>
          <span>{{ props.label }}</span>
          <el-tooltip
            v-if="props.content"
            :content="props.content"
            placement="top"
            popper-class="gwin-platform-tooltip"
          >
            <i class="gwin-platform-icon__psq"></i>
          </el-tooltip>
        </div>
        <el-button
          v-if="props.isTitleRightButton"
          size="small"
          :icon="RefreshRight"
          round
          @click="onTitleRightButtonClick"
        >
          {{ rightButtonTitle }}
        </el-button>
      </div>
    </template>
    <el-select
      :model-value="props.modelValue"
      :placeholder="props.placeholder"
      :multiple="props.multiple"
      clearable
      @change="onChange"
    >
      <el-option v-for="item in props.options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </el-form-item>
</template>

<script lang="ts" setup>
import { RefreshRight } from '@element-plus/icons-vue'

interface Props {
  label: string
  content?: string
  placeholder: string
  modelValue: any
  multiple?: boolean
  options: any[]
  isTitleRightButton?: boolean
  rightButtonTitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  content: '',
  placeholder: '',
  modelValue: '',
  multiple: false,
  options: () => [],
  isTitleRightButton: false,
  rightButtonTitle: ''
})

const emits = defineEmits(['change', 'update:modelValue', 'titleRightButtonClick'])

const onChange = (value: any) => {
  emits('update:modelValue', value)
  emits('change', value)
}

const onTitleRightButtonClick = () => {
  emits('titleRightButtonClick')
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
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

@include b('title') {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
