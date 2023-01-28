<template>
  <div class="gwin-platform-left__control">
    <div class="gwin-platform-title">
      <i></i>
      <p>按钮控件</p>
    </div>
    <div class="gwin-platform-list">
      <draggable
        :list="controlState.list"
        item-key="name"
        :sort="false"
        :group="{ name: 'people', pull: 'clone', put: false }"
        @end="onEnd"
      >
        <template #item="{ element }">
          <div class="gwin-platform-list__item">
            <img :src="element.url" />
            <p>{{ element.name }}</p>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable'
import { controlState, useControlMethod } from './control'
const { onEnd } = useControlMethod()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('left') {
  @include e('control') {
    width: 248px;
    padding: 16px;
    border-radius: 8px;
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
  }
}
@include b('title') {
  display: flex;
  align-items: center;
  i {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    background: url('@/assets/img/button/icon-btns.png') no-repeat 0 0;
    background-size: 100%;
  }
  p {
    font-size: 14px;
    color: #1a2234;
    font-weight: 500;
  }
}
@include b('list') {
  & > div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  @include e('item') {
    width: 100px;
    height: 32px;
    display: flex;
    cursor: pointer;
    line-height: 32px;
    border-radius: 2px;
    align-items: center;
    margin: 12px 16px 0 0;
    justify-content: center;
    background-color: #f7faff;
    &:nth-child(2n) {
      margin-right: 0;
    }
    &:hover {
      background-color: #e4ecf8;
    }
    p {
      width: 60px;
      font-size: 12px;
      color: #1a2234;
    }
    img {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }
  }
}
</style>
