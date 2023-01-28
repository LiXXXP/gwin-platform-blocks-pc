<template>
  <div class="gwin-platform-create">
    <el-dialog v-model="homeState.createDialog.isShow" width="480px" top="26vh" custom-class="gwin-platform-dialog">
      <template #title>
        <div class="gwin-platform-create__title">新建应用</div>
      </template>
      <div class="gwin-platform-create__row">
        <p>应用名称</p>
        <el-input v-model="homeState.createDialog.appName" placeholder="请输入2-15个字" minlength="2" maxlength="15" />
        <span v-if="!homeState.createDialog.appName.trim() || homeState.createDialog.appName.trim().length < 2">
          *请输入应用名称, 大于两个字符, 不能为空格
        </span>
      </div>
      <div class="gwin-platform-create__row">
        <p>channel</p>
        <el-input v-model="homeState.createDialog.channel" placeholder="请输入channel" />
      </div>
      <div class="gwin-platform-create__row">
        <p>entityId</p>
        <el-input v-model="homeState.createDialog.entityId" placeholder="请输入entityId" />
      </div>
      <div class="gwin-platform-create__row">
        <div class="gwin-platform-row">
          <p>选择图标</p>
          <i></i>
        </div>
        <div class="gwin-platform-icons">
          <div
            v-for="(item, index) in 211"
            :key="item"
            :class="{ active: index === iconActiveIndex }"
            @click="iconActiveIndex = index"
          >
            <img :src="handleAppIconPath(index)" class="gwin-platform-icons__svg" />
          </div>
        </div>
      </div>
      <div class="gwin-platform-create__footer">
        <div @click="homeState.createDialog.isShow = false">取消</div>
        <div class="gwin-platform-create__footer--blue" @click="onCreateApply(iconActiveIndex)">确定</div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { homeState } from '@/views/home/use-home-config'
import { useHomeMethod } from '@/views/home/use-home-method'

const { onCreateApply } = useHomeMethod()

function handleAppIconPath(index: number) {
  const url = new URL(`../../../../assets/img/app/${index}.png`, import.meta.url).href
  return url
}

const iconActiveIndex = ref<number>(0) // 当前选择 icon 的 index
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
        border: 1px solid #5d78ff !important;
        background-color: #5d78ff !important;
      }
    }
  }
}
@include b('row') {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
  p {
    margin-bottom: 0;
  }
  i {
    width: 25px;
    height: 14px;
    margin-left: 6px;
    background: url('@/assets/img/home/icon-new.png') no-repeat 0 0;
    background-size: 100%;
  }
}
@include b('icons') {
  width: 100%;
  height: 200px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  overflow-x: hidden;
  overflow-y: overlay;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(144, 147, 153, 0.5);
  }
  div {
    width: 88px;
    height: 88px;
    display: flex;
    cursor: pointer;
    align-items: center;
    margin-right: 16px;
    margin-bottom: 16px;
    border-radius: 16px;
    justify-content: center;
    border: 1px solid #f7f7f8;
    &:nth-child(4n) {
      margin-right: 0;
    }
    &:hover,
    &.active {
      border-color: #2f51ff;
    }
  }
  @include e('svg') {
    width: 44px;
    height: 44px;
  }
}
</style>
