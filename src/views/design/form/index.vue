<template>
  <div class="gwin-platform-design-form">
    <div class="gwin-platform-left">
      <!-- 创建的表单列表 -->
      <List></List>
      <!-- 基础控件 -->
      <Control></Control>
    </div>
    <div class="gwin-platform-right">
      <!-- 保存 新增 -->
      <Bar @on-add="onOpenAddDialog"></Bar>
      <div class="gwin-platform-right__content">
        <Content ref="contentRef"></Content>
        <Attr></Attr>
      </div>
    </div>
  </div>
  <!-- 新建表单 -->
  <AddForm></AddForm>
</template>

<script lang="ts" setup>
import { provide, ref } from 'vue'
// 子组件
import List from '@/views/design/form/components/list/index.vue' // 表单列表
import Control from '@/views/design/form/components/control/index.vue' // 基础控件
import AddForm from '@/views/design/form/components/add/index.vue' // 新建表单
import Content from '@/views/design/form/components/content/index.vue' // 内容
import Attr from '@/views/design/form/components/attr/attr-index.vue' // 属性
// 公共组件
import Bar from '@/views/design/components/bar/index.vue' // 保存 新建
// method
import { useAddMethod } from '@/views/design/form/components/add/add'
import { FormItemGetOptionFromApiKey } from '@/symbols'

const contentRef = ref()

provide(FormItemGetOptionFromApiKey, formItemGetOptionFromApi)

function formItemGetOptionFromApi(key: string, params: Record<string, any>) {
  contentRef.value.handleFormItemGetOptionFromApi(key, params)
}

const { onOpenAddDialog } = useAddMethod()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('design-form') {
  width: 100%;
  padding: 20px;
  display: flex;
  box-sizing: border-box;
}
@include b('left') {
  display: flex;
  flex-direction: column;
}
@include b('right') {
  margin-left: 20px;
  width: calc(100vw - 308px);
  @include e('content') {
    display: flex;
    height: calc(100vh - 166px);
  }
}
</style>
