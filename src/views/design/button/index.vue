<template>
  <div class="gwin-platform-design-button">
    <div class="gwin-platform-left">
      <!-- 按钮控件 -->
      <Control></Control>
    </div>
    <div class="gwin-platform-right">
      <!-- 保存 -->
      <Bar :is-add="false"></Bar>
      <div class="gwin-platform-right__content">
        <Content></Content>
        <div class="gwin-platform-attr">
          <Attr
            v-if="designState.tablePageConfig.buttonGroup[contentState.currentIndex]"
            :list-item="designState.tablePageConfig.buttonGroup[contentState.currentIndex]"
          ></Attr>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { designState } from '@/views/design/use-design-config'
import { contentState } from '@/views/design/button/components/content/content'
// 子组件
import Control from '@/views/design/button/components/control/index.vue'
import Content from '@/views/design/button/components/content/index.vue'
import Attr from '@/views/design/button/components/attr/index.vue'
// 公共组件
import Bar from '@/views/design/components/bar/index.vue' // 保存 新建
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('design-button') {
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
