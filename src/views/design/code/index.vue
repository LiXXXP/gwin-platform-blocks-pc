<template>
  <div class="gwin-platform-design-code">
    <!-- 保存 -->
    <div class="gwin-platform-content">
      <Bar :is-add="false">
        <template #cancel>
          <div class="gwin-platform-content__cancel" @click="onCancel">
            <p>取消修改</p>
          </div>
        </template>
      </Bar>
      <CodeMirror
        v-model:modelValue="designState.tablePageConfig"
        :min-height="'calc(100vh - 200px)'"
        :language="'json'"
        @on-blur="onBlur"
      ></CodeMirror>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { designState } from '@/views/design/use-design-config'

// 公共组件
import CodeMirror from '@/components/CodeMirror/index.vue'
import Bar from '@/views/design/components/bar/index.vue' // 保存 新建

/**
 * 取消修改
 */
const onCancel = () => {
  designState.tablePageConfig = designState.oldTablePageConfig
}

/**
 * blur
 */
const onBlur = (val: string) => {
  if (val) {
    try {
      designState.tablePageConfig = JSON.parse(val)
    } catch (error) {
      designState.tablePageConfig = val
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('design-code') {
  width: 100%;
  padding: 20px;
  display: flex;
  overflow: hidden;
  justify-content: center;
  box-sizing: border-box;
  height: calc(100vh - 50px);
  background-color: #f8fbff;
}
@include b('content') {
  width: calc(100vw - 308px);
  height: calc(100vh - 166px);
  @include e('cancel') {
    width: 92px;
    height: 32px;
    color: #31373d;
    font-size: 14px;
    cursor: pointer;
    line-height: 32px;
    margin-right: 16px;
    border-radius: 4px;
    text-align: center;
    box-sizing: border-box;
    border: 1px solid #d4d6d9;
    &:hover {
      color: #2f51ff;
      border-color: #2f51ff;
    }
  }
  @include e('editor') {
    width: 100%;
    border-radius: 4px;
    border: 1px solid #d4d6d9;
  }
}
</style>
