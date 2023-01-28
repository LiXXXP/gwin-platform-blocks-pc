<template>
  <div class="gwin-platform-move">
    <el-dialog v-model="moveState.moveDialog.isShow" width="480px" top="26vh" custom-class="gwin-platform-dialog">
      <template #title>
        <div class="gwin-platform-move__title">选择移动到目标应用分组</div>
      </template>
      <div class="gwin-platform-move__row">
        <p>应用名称</p>
        <el-select v-model="moveState.moveDialog.appId" placeholder="请选择应用名称" clearable @change="onChangeApp">
          <el-option v-for="item in homeState.applyList" :key="item.id" :label="item.appName" :value="item.id" />
        </el-select>
      </div>
      <div class="gwin-platform-move__row">
        <p>分组名称</p>
        <el-select v-model="moveState.moveDialog.groupId" placeholder="请选择分组名称" clearable>
          <el-option v-for="item in moveState.groupList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
      <div class="gwin-platform-move__footer">
        <div @click="moveState.moveDialog.isShow = false">取消</div>
        <div :class="['gwin-platform-move__footer--blue']" @click="onMove">确定</div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useMoveMethod, moveState } from './move'
const { onMove, homeState, onChangeApp } = useMoveMethod()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('move') {
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
