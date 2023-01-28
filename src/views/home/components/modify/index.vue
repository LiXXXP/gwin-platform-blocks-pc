<template>
  <div class="gwin-platform-create">
    <el-dialog v-model="homeState.modifyDialog.isShow" width="480px" top="26vh" custom-class="gwin-platform-dialog">
      <template #title>
        <div class="gwin-platform-create__title">修改应用名称</div>
      </template>
      <div class="gwin-platform-create__row">
        <p>应用名称</p>
        <el-input v-model="homeState.modifyDialog.appName" placeholder="请输入2-15个字" minlength="2" maxlength="15" />
        <span v-if="!homeState.modifyDialog.appName.trim() || homeState.modifyDialog.appName.trim().length < 2">
          *请输入应用名称, 大于两个字符, 不能为空格
        </span>
      </div>
      <div class="gwin-platform-create__row">
        <p>channel</p>
        <el-input v-model="homeState.modifyDialog.channel" placeholder="请输入channel" />
      </div>
      <div class="gwin-platform-create__row">
        <p>entityId</p>
        <el-input v-model="homeState.modifyDialog.entityId" placeholder="请输入entityId" />
      </div>
      <div class="gwin-platform-create__footer">
        <div @click="homeState.modifyDialog.isShow = false">取消</div>
        <div class="gwin-platform-create__footer--blue" @click="onModifyName">确定</div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { homeState } from '@/views/home/use-home-config'
import { useHomeMethod } from '@/views/home/use-home-method'
const { onModifyName } = useHomeMethod()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('create') {
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
        font-weight: 500 !important;
        border: 1px solid #5d78ff !important;
        background-color: #5d78ff !important;
      }
    }
  }
}
</style>
