<template>
  <div class="gwin-platform-delete">
    <el-dialog v-model="deleteState.deleteDialog.isShow" width="480px" top="26vh" custom-class="gwin-platform-dialog">
      <template #title>
        <div class="gwin-platform-delete__title">删除{{ appState.dialogData.type === 'group' ? '分组' : '页面' }}</div>
      </template>
      <div class="gwin-platform-delete__hint">
        <i></i>
        <p>确定要删除该{{ appState.dialogData.type === 'group' ? '分组' : '页面' }}吗？</p>
      </div>
      <div class="gwin-platform-delete__row">
        {{
          appState.dialogData.type === 'group'
            ? `仅删除当前分组「${appState.dialogData.name}」，分组下的内容将自动移出，不会同步删除`
            : `「${appState.dialogData.name}」表单及所有业务数据将全部删除，请谨慎操作`
        }}
      </div>
      <el-checkbox v-model="deleteState.deleteDialog.isChecked" label="确认执行此操作" size="large" />
      <div class="gwin-platform-delete__footer">
        <div @click="deleteState.deleteDialog.isShow = false">取消</div>
        <div
          :class="['gwin-platform-delete__footer--red', { active: deleteState.deleteDialog.isChecked }]"
          @click="onDelete"
        >
          删除
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useDeleteMethod, deleteState } from './delete'
const { appState, onDelete } = useDeleteMethod()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('delete') {
  @include e('title') {
    color: #1a2234;
    font-size: 20px;
    font-weight: 500;
  }
  @include e('hint') {
    width: 100%;
    padding: 8px;
    display: flex;
    border-radius: 2px;
    margin-bottom: 14px;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid #faad14;
    background: rgba(255, 186, 47, 0.1);
    i {
      width: 16px;
      height: 16px;
      margin-right: 2px;
      background: url('@/assets/img/application/icon-hint.png') no-repeat 0 0;
      background-size: 100%;
    }
    p {
      color: #faad14;
      font-size: 14px;
    }
  }
  @include e('row') {
    font-size: 14;
    color: #1a2234;
    margin-bottom: 40px;
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
    @include m('red') {
      margin-left: 8px;
      color: #b1b6bb !important;
      background-color: #f5f5f5 !important;
      border: 1px solid #f7f7f8 !important;
      &:hover,
      &.active {
        color: #fff !important;
        font-weight: 500 !important;
        border: 1px solid #fd3c58 !important;
        background-color: #fd3c58 !important;
      }
    }
  }
}
</style>
