<template>
  <div class="gwin-platform-design-table">
    <div class="gwin-platform-left">
      <!-- 操作 -->
      <Config></Config>
      <!-- 按钮控件 -->
      <Control v-if="configState.configIndex === 1"></Control>
    </div>
    <div class="gwin-platform-right">
      <!-- 保存 新增 -->
      <Bar :is-add="configState.configIndex === 0 ? true : false" @on-add="onOpenAddDialog"></Bar>
      <div class="gwin-platform-right__content">
        <Content></Content>
        <div v-if="configState.configIndex !== 2" class="gwin-platform-attr">
          <Attr></Attr>
        </div>
      </div>
    </div>
  </div>
  <!-- 新增 -->
  <Add></Add>
</template>

<script lang="ts" setup>
// 子组件
import Config from '@/views/design/table/components/config/index.vue'
import Control from '@/views/design/table/components/control/index.vue'
import Content from '@/views/design/table/components/content/index.vue'
import Attr from '@/views/design/table/components/attr/attr-index.vue'
import Add from '@/views/design/table/components/add/index.vue'
// 公共组件
import Bar from '@/views/design/components/bar/index.vue' // 保存 新建

import { configState } from '@/views/design/table/components/config/config'
import { useAddMethod } from '@/views/design/table/components/add/add'
const { onOpenAddDialog } = useAddMethod()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('design-table') {
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
@include b('attr') {
  width: 272px;
  padding: 20px;
  margin-left: 20px;
  border-radius: 8px;
  background: #fff;
  overflow-x: hidden;
  overflow-y: overlay;
  box-sizing: border-box;
  box-shadow: 0px 10px 20px 0px rgba(195, 200, 222, 0.1);
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(144, 147, 153, 0.5);
  }
}
</style>
