<template>
  <div class="gwin-platform-design-basic">
    <div class="gwin-platform-left">
      <!-- 配置 -->
      <Config></Config>
    </div>
    <div class="gwin-platform-right">
      <!-- 保存 -->
      <Bar @on-add="onOpenAddDialog"></Bar>
      <div class="gwin-platform-right__content">
        <Content></Content>
        <Attr></Attr>
      </div>
    </div>
  </div>
  <!-- 新建接口 -->
  <AddApi></AddApi>
</template>

<script lang="ts" setup>
// 子组件
import Config from '@/views/design/basic/components/config/index.vue'
import Content from '@/views/design/basic/components/content/index.vue'
import Attr from '@/views/design/basic/components/attr/attr-index.vue'
import AddApi from '@/views/design/basic/components/add/index.vue'
// 公共组件
import Bar from '@/views/design/components/bar/index.vue' // 保存 新建
// method
import { useAddMethod } from '@/views/design/basic/components/add/add'
const { onOpenAddDialog } = useAddMethod()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('design-basic') {
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
