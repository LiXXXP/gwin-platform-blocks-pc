<template>
  <el-form-item :rules="props.rules">
    <template #label>
      <span>{{ props.label }}</span>
      <el-tooltip v-if="props.content" :content="props.content" placement="top" popper-class="gwin-platform-tooltip">
        <i class="gwin-platform-icon__psq"></i>
      </el-tooltip>
    </template>
    <el-input
      :model-value="props.modelValue"
      :placeholder="props.placeholder"
      clearable
      @input="onInput"
      @change="onChange"
      @blur="$emit('blur')"
    />
  </el-form-item>
</template>

<script lang="ts" setup>
interface Props {
  rules?: any
  label: string
  content?: string
  placeholder: string
  modelValue: string | number | any
}

const props = withDefaults(defineProps<Props>(), {
  rules: () => [],
  label: '',
  content: '',
  placeholder: '',
  modelValue: ''
})

const emits = defineEmits(['update:modelValue', 'onChange', 'blur'])

const onInput = (value: string | number) => {
  emits('update:modelValue', value)
}

const onChange = (value: string | number) => {
  emits('onChange', value)
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
