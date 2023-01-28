<template>
  <div class="gwin-platform-left__form">
    <div class="gwin-platform-title">
      <i></i>
      <p>表单</p>
    </div>
    <div
      v-for="item in Object.keys(designState.tablePageConfig.forms)"
      :key="item"
      :class="['gwin-platform-list', { active: item === attrState.formRule.key }]"
      @click="onSelectForm(item)"
    >
      <i></i>
      <p>{{ item }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { designState } from '@/views/design/use-design-config'
import { attrState } from '@/views/design/form/components/attr/attr'
import { nextTick } from 'vue'

/**
 * 点击表单
 */
const onSelectForm = (name: string) => {
  // key 名
  nextTick(() => {
    attrState.formRule.key = name
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('left') {
  @include e('form') {
    width: 248px;
    height: 30vh;
    padding: 16px 8px;
    border-radius: 8px;
    overflow-x: hidden;
    overflow-y: overlay;
    margin-bottom: 20px;
    box-sizing: border-box;
    background-color: #fff;
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
    margin: 0 8px;
    background: url('@/assets/img/form/icon-form.png') no-repeat 0 0;
    background-size: 100%;
  }
  p {
    font-size: 14px;
    color: #1a2234;
    font-weight: 500;
  }
}
@include b('list') {
  padding: 8px 0;
  display: flex;
  cursor: pointer;
  margin-top: 8px;
  border-radius: 4px;
  align-items: center;
  &.active {
    background-color: #f7faff;
  }
  &:hover,
  &.active {
    p {
      color: #2f51ff;
      font-weight: 500;
    }
    i {
      background-image: url('@/assets/img/application/icon-page-active.png');
    }
  }
  i {
    width: 16px;
    height: 16px;
    margin: 0 8px;
    background: url('@/assets/img/application/icon-page.png') no-repeat 0 0;
    background-size: 100%;
  }
  p {
    width: 200px;
    font-size: 14px;
    color: #1a2234;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
