<template>
  <div class="gwin-platform-add">
    <el-dialog v-model="addState.addDialog.isShow" width="480px" top="26vh" custom-class="gwin-platform-dialog">
      <template #title>
        <div class="gwin-platform-add__title">新增{{ configState.config === 'apis' ? '接口' : '变量' }}</div>
      </template>
      <div class="gwin-platform-add__row">
        <p>{{ configState.config === 'apis' ? '接口' : '变量' }}名称</p>
        <el-input v-model="addState.addDialog.name" placeholder="请输入" />
        <span v-if="!addState.addDialog.name"> *请输入{{ configState.config === 'apis' ? '接口' : '变量' }}名称 </span>
      </div>
      <div v-if="configState.config === 'apis'" class="gwin-platform-add__row">
        <p>接口路径</p>
        <el-input v-model="addState.addDialog.path" placeholder="请输入接口路径" />
      </div>
      <div class="gwin-platform-add__footer">
        <div @click="addState.addDialog.isShow = false">取消</div>
        <div :class="['gwin-platform-add__footer--blue', { active: addState.addDialog.name }]" @click="onAddApi">
          确定
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { configState } from '@/views/design/basic/components/config/config'
import { useAddMethod, addState } from './add'

const { onAddApi } = useAddMethod()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('add') {
  @include e('title') {
    color: #1a2234;
    font-size: 20px;
    font-weight: 500;
  }
  @include e('row') {
    margin-bottom: 20px;
    p {
      color: #1a2234;
      font-size: 14px;
      margin-bottom: 14px;
    }
    span {
      display: block;
      font-size: 12px;
      margin-top: 6px;
      color: #ff5555;
      text-align: right;
    }
  }
  @include e('footer') {
    display: flex;
    margin-top: 36px;
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
