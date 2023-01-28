<template>
  <el-form ref="ruleFormRef" label-position="top" size="default" class="gwin-platform-form">
    <Radio
      v-model:modelValue="designState.tablePageConfig.isMountedSearch"
      :label="'加载查询'"
      :content="'页面加载的时候就查询数据'"
      :options="[
        { label: true, value: '是' },
        { label: false, value: '否' }
      ]"
    ></Radio>
    <hr />
    <Radio
      v-model:modelValue="designState.tablePageConfig.tableConfig.isTablePagination"
      :label="'是否分页'"
      :options="[
        { label: true, value: '是' },
        { label: false, value: '否' }
      ]"
    ></Radio>
    <hr />
    <CodeMirror
      v-model:modelValue="designState.tablePageConfig.tableConfig.config"
      :label="'表格属性'"
      :language="'json'"
      :min-height="'40vh'"
      :placeholder="'请输入JSON'"
      :is-edit="false"
      @on-blur="onBlur"
    ></CodeMirror>
  </el-form>
</template>

<script lang="ts" setup>
// 公共组件
import Radio from '@/components/Radio/index.vue'
import CodeMirror from '@/components/CodeMirror/index.vue'

import { designState } from '@/views/design/use-design-config'

const onBlur = (val: string) => {
  if (val) {
    try {
      designState.tablePageConfig.tableConfig.config = JSON.parse(val)
    } catch (error) {
      designState.tablePageConfig.tableConfig.config = val
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
hr {
  height: 1px;
  border: none;
  margin-bottom: 24px;
  background-color: #eaedff;
}
</style>
