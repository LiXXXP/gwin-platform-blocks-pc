<template>
  <div class="gwin-platform-attr">
    <div v-if="Object.keys(designState.tablePageConfig.forms)?.length">
      <div class="gwin-platform-attr__tab">
        <p
          v-for="(item, index) in attrState.attrs"
          :key="item.name"
          :class="{ active: index === attrState.currentIndex }"
          @click="onSwitchAttr(index)"
        >
          {{ item.name }}
        </p>
      </div>
      <div>
        <AttrControl v-if="attrState.currentIndex === 0"></AttrControl>
        <AttrForm v-else></AttrForm>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 子组件
import AttrForm from './attr-form.vue' // 表单属性
import AttrControl from './attr-control.vue' // 控件属性
// data
import { designState } from '@/views/design/use-design-config'
import { attrState, useAttrMethod } from './attr'
const { onSwitchAttr } = useAttrMethod()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('attr') {
  width: 272px;
  padding: 16px 0;
  margin-left: 20px;
  border-radius: 8px;
  background: #fff;
  overflow-x: hidden;
  overflow-y: overlay;
  box-shadow: 0px 10px 20px 0px rgba(195, 200, 222, 0.1);
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(144, 147, 153, 0.5);
  }
  @include e('tab') {
    display: flex;
    align-items: center;
    p {
      width: 50%;
      cursor: pointer;
      font-size: 14px;
      color: #1a2234;
      text-align: center;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(59, 114, 255, 0.1);
      &.active,
      &:hover {
        color: #2f51ff;
        font-weight: 500;
      }
      &.active {
        border-color: #2f51ff;
      }
    }
  }
}
</style>
