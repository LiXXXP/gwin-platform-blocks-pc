<template>
  <div class="gwin-platform-attr">
    <AttrApi v-if="configState.config === 'apis'"></AttrApi>
    <AttrVar v-if="configState.config === 'variables'"></AttrVar>
  </div>
</template>

<script lang="ts" setup>
// 子组件
import AttrApi from './attr-api.vue' // 接口配置
import AttrVar from './attr-var.vue' // 变量配置

import { configState } from '@/views/design/basic/components/config/config'
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('attr') {
  width: 272px;
  padding: 20px;
  margin-left: 20px;
  border-radius: 8px;
  background: #fff;
  overflow: auto;
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
