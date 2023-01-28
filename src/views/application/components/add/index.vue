<template>
  <el-popover
    ref="popover"
    placement="bottom-end"
    :width="160"
    trigger="click"
    :show-arrow="false"
    popper-class="gwin-platform-popper"
  >
    <template #reference>
      <div class="gwin-platform-add">
        <i></i>
        <p>新建</p>
      </div>
    </template>
    <template #default>
      <div class="gwin-platform-select">
        <p @click="onOpenAddDialog('group')">新建分组</p>
        <p @click="onOpenAddDialog('page')">新建页面</p>
      </div>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
// method
import { useAddMethod } from './add'
const { onOpenAddDialog } = useAddMethod()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('add') {
  display: flex;
  padding: 16px 0;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(59, 114, 255, 0.1);
  &:hover {
    p {
      font-weight: 500;
    }
  }
  i {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    background: url('@/assets/img/application/icon-add.png') no-repeat 0 0;
    background-size: 100%;
  }
  p {
    color: #2f51ff;
    font-size: 14px;
  }
}
@include b('select') {
  p {
    color: #1a2234;
    font-size: 14px;
    cursor: pointer;
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0;
    }
    &:hover {
      color: #2f51ff;
    }
  }
}
</style>
