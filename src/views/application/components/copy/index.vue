<template>
  <div class="gwin-platform-copy">
    <el-dialog v-model="copyState.copyDialog.isShow" width="480px" top="26vh" custom-class="gwin-platform-dialog">
      <template #title>
        <div class="gwin-platform-copy__title">复制页面</div>
      </template>
      <div class="gwin-platform-copy__row">
        <p>页面名称</p>
        <el-input v-model="copyState.copyDialog.pageName" placeholder="请输入2-15个字" minlength="2" maxlength="15" />
        <span v-if="!copyState.copyDialog.pageName.trim() || copyState.copyDialog.pageName.trim().length < 2">
          *请输入页面名称, 大于两个字符, 不能为空格
        </span>
      </div>
      <div class="gwin-platform-copy__row">
        <p>分组名称</p>
        <el-select v-model="copyState.copyDialog.groupId" placeholder="请选择分组名称">
          <el-option v-for="item in appState.groupList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
      <div class="gwin-platform-copy__footer">
        <div @click="copyState.copyDialog.isShow = false">取消</div>
        <div :class="['gwin-platform-copy__footer--blue']" @click="onCopy">确定</div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useCopyMethod, copyState } from './copy'

const { onCopy, appState } = useCopyMethod()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('copy') {
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
