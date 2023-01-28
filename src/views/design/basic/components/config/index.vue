<template>
  <div class="gwin-platform-left__config">
    <div
      v-for="item in configState.list"
      :key="item.name"
      :class="{ active: configState.config === item.key }"
      @click="onClickConfig(item.key)"
    >
      <i :class="item.className"></i>
      <p>{{ item.name }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { configState, useConfigMethod } from './config'
const { onClickConfig } = useConfigMethod()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('left') {
  @include e('config') {
    width: 248px;
    padding: 16px;
    border-radius: 8px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: overlay;
    box-sizing: border-box;
    background-color: #fff;
    height: calc(100vh - 90px);
    box-shadow: 0px 10px 20px 0px rgba(195, 200, 222, 0.1);
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: rgba(144, 147, 153, 0.5);
    }
    div {
      color: #1a2234;
      font-size: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 12px 14px;
      &.active {
        background-color: #f7faff;
      }
      &:hover,
      &.active {
        color: #2f51ff;
        font-weight: 500;
        border-radius: 4px;
        .gwin-platform-icons__api {
          background-image: url('@/assets/img/basic/icon-api-active.png');
        }
        .gwin-platform-icons__var {
          background-image: url('@/assets/img/basic/icon-var-active.png');
        }
      }
      i {
        width: 16px;
        height: 16px;
        margin-right: 14px;
      }
    }
  }
}
@include b('icons') {
  @include e('api') {
    background: url('@/assets/img/basic/icon-api.png') no-repeat 0 0;
    background-size: 100%;
  }
  @include e('var') {
    background: url('@/assets/img/basic/icon-var.png') no-repeat 0 0;
    background-size: 100%;
  }
}
</style>
