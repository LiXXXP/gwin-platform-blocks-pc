<template>
  <el-dialog v-model="dialogState.dialogVisible" title="编辑代码" width="60%" custom-class="gwin-platform-dialog">
    <CodeMirror
      v-model:modelValue="dialogState.moduleValue"
      :language="dialogState.language"
      :min-height="'300px'"
      @on-blur="onBlur"
    ></CodeMirror>
    <div class="gwin-platform-code__footer">
      <div @click="dialogState.dialogVisible = false">取消</div>
      <div class="gwin-platform-code__footer--blue" @click="onConfirm">确定</div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { dialogState, useCodeDialog } from './dialog'
import CodeMirror from '@/components/CodeMirror/index.vue'

const emits = defineEmits(['onConfirm'])

const { onConfirm, onBlur } = useCodeDialog(emits)
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('code') {
  @include e('footer') {
    display: flex;
    align-items: center;
    justify-content: end;
    div {
      width: 88px;
      height: 40px;
      cursor: pointer;
      font-size: 14px;
      color: #1a2234;
      line-height: 40px;
      text-align: center;
      border-radius: 20px;
      background-color: #fff;
      border: 1px solid #f7f7f8;
      &:hover {
        background-color: #f7f7f8;
      }
    }
    @include m('blue') {
      margin-left: 8px;
      color: #fff !important;
      border: 1px solid #2f51ff !important;
      background-color: #2f51ff !important;
      &:hover {
        border: 1px solid #5d78ff !important;
        background-color: #5d78ff !important;
      }
    }
  }
}
</style>
