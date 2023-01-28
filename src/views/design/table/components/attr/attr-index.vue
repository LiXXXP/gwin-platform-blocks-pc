<template>
  <div>
    <AttrData v-if="configState.configIndex === 0"></AttrData>
    <AttrHandle v-if="configState.configIndex === 1"></AttrHandle>
  </div>
</template>

<script lang="ts" setup>
// 子组件
import AttrData from './attr-data.vue' // 数据列
import AttrHandle from './attr-handle.vue' // 操作列

import { configState } from '@/views/design/table/components/config/config'
</script>

<style lang="scss" scoped></style>
