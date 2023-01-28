<template>
  <div class="gwin-platform-home">
    <div class="gwin-platform-apply__list">
      <div v-for="(item, index) in homeState.applyList" :key="item.id" class="gwin-platform-apply__item">
        <div class="gwin-platform-apply__item--bg" @click="goApplicationPage(item.id)">
          <img :src="handleAppIconPath(item.iconUri)" class="gwin-platform-apply__svg" />
        </div>
        <div class="gwin-platform-apply__handle">
          <p>{{ item.appName }}</p>
          <i class="gwin-platform-icon__edit" @click="onOpenModifyDialog(item.appName, index)"></i>
          <i class="gwin-platform-icon__delete" @click="onOpenDeleteDialog(item.appName, index)"></i>
        </div>
      </div>
      <div class="gwin-platform-apply__item" @click="onOpenCreateDialog">
        <div class="gwin-platform-apply__item--bg"><i></i></div>
        <div class="gwin-platform-apply__handle">
          <p>新建应用</p>
          <i class="gwin-platform-icon__add"></i>
        </div>
      </div>
    </div>
    <CreateDialog></CreateDialog>
    <ModifyDialog></ModifyDialog>
    <DeleteDialog></DeleteDialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { homeState } from '@/views/home/use-home-config'
import { useHomeMethod } from '@/views/home/use-home-method'

// 子组件
import CreateDialog from './components/create/index.vue' // 新建应用弹窗
import ModifyDialog from './components/modify/index.vue' // 修改应用名称弹窗
import DeleteDialog from './components/delete/index.vue' // 删除应用弹窗

const { getApplyList, onOpenCreateDialog, onOpenModifyDialog, onOpenDeleteDialog, goApplicationPage } = useHomeMethod()

function handleAppIconPath(index: string) {
  const url = new URL(`../../assets/img/app/${index}`, import.meta.url).href
  return url
}

onMounted(() => {
  getApplyList()
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('home') {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  min-height: calc(100vh - 50px);
  background-color: #f8fbff;
}
@include b('apply') {
  @include e('list') {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  @include e('item') {
    width: auto;
    padding: 16px;
    cursor: pointer;
    margin-right: 16px;
    margin-bottom: 40px;
    border-radius: 8px;
    box-sizing: border-box;
    transition: all 0.3s;
    &:nth-child(5n) {
      margin-right: 0;
    }
    &:hover {
      background-color: #fff;
      transform: translate(0, -5px);
      filter: drop-shadow(10px 10px 20px #ced3d9);
    }
    @include m('bg') {
      width: 227px;
      height: 220px;
      display: flex;
      border-radius: 8px;
      margin-bottom: 16px;
      align-items: center;
      justify-content: center;
      background-color: #eef4ff;
      i {
        width: 88px;
        height: 88px;
        background: url('@/assets/img/home/add-apply.png') no-repeat 0 0;
        background-size: 100%;
      }
    }
  }
  @include e('svg') {
    width: 88px;
    height: 88px;
  }
  @include e('handle') {
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      width: 180px;
      color: #1a2234;
      font-size: 14px;
      font-weight: 500;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
@include b('icon') {
  @include e('edit') {
    width: 20px;
    height: 20px;
    background: url('@/assets/img/home/icon-edit.png') no-repeat 0 0;
    background-size: 100%;
    &:hover {
      border-radius: 4px;
      background-color: #eef4ff;
    }
  }
  @include e('add') {
    width: 20px;
    height: 20px;
    background: url('@/assets/img/home/icon-add.png') no-repeat 0 0;
    background-size: 100%;
    &:hover {
      border-radius: 4px;
      background-color: #eef4ff;
    }
  }
  @include e('delete') {
    width: 18px;
    height: 18px;
    background: url('@/assets/img/home/icon-delete.png') no-repeat 0 0;
    background-size: 100%;
    &:hover {
      border-radius: 4px;
      background-color: #eef4ff;
    }
  }
}
</style>
