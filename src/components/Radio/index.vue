<template>
  <el-form-item>
    <template #label>
      <span>{{ props.label }}</span>
      <el-tooltip v-if="props.content" :content="props.content" placement="top" popper-class="gwin-platform-tooltip">
        <i class="gwin-platform-icon__psq"></i>
      </el-tooltip>
    </template>
    <el-radio-group :model-value="props.modelValue" @change="onChange">
      <el-radio v-for="item in props.options" :key="item.label" :label="item.label">{{ item.value }}</el-radio>
    </el-radio-group>
  </el-form-item>
</template>

<script lang="ts" setup>
interface Props {
  label: string
  content?: string
  modelValue: any
  options: any[]
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  content: '',
  modelValue: '',
  options: () => []
})

const emits = defineEmits(['update:modelValue'])

const onChange = (value: any) => {
  emits('update:modelValue', value)
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
</style>
