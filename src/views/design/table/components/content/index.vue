<template>
  <div class="gwin-platform-content" :style="{ width: configState.configIndex === 2 ? '100%' : 'calc(100% - 292px)' }">
    <Data v-if="configState.configIndex !== 2"></Data>
    <Other v-else></Other>
  </div>
</template>

<script lang="ts" setup>
import Data from './data.vue'
import Other from './other.vue'
import { configState } from '@/views/design/table/components/config/config'
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('content') {
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  overflow: auto;
  overflow-x: overlay;
  overflow-y: overlay;
  box-sizing: border-box;
  box-shadow: 0px 10px 20px 0px rgba(195, 200, 222, 0.1);
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(144, 147, 153, 0.5);
  }
}
</style>
