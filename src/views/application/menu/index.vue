<template>
  <div class="gwin-platform-menu">
    <Add></Add>
    <el-menu
      class="gwin-platform-menu__list"
      :text-color="'#1A2234'"
      :active-text-color="'#2F51FF'"
      :background-color="'#ffffff'"
      :default-active="appState.defaultActive"
    >
      <!-- 分组 -->
      <el-sub-menu
        v-for="(item, index) in appState.groupList"
        :key="item.id"
        :index="item.id"
        @click="onClickGroup(item.id)"
      >
        <template #title>
          <i class="gwin-platform-icon__group"></i>
          <span>{{ item.name }}</span>
          <More :id="item.id" :type="'group'" :index="index" :name="item.name"></More>
        </template>
        <!-- 分组-页面 -->
        <el-menu-item v-for="(page, i) in item.pageList" :key="page.id" :index="page.id" @click="onClickPage(page.id)">
          <span>{{ page.name }}</span>
          <More :id="page.id" :type="'page'" :index="index" :i="i" :name="page.name"></More>
        </el-menu-item>
      </el-sub-menu>
      <!-- 页面 -->
      <el-menu-item
        v-for="(item, index) in appState.pageList"
        :key="item.id"
        :index="item.id"
        @click="onClickPage(item.id)"
      >
        <i class="gwin-platform-icon__page"></i>
        <span>{{ item.name }}</span>
        <More :id="item.id" :type="'page'" :index="index" :name="item.name"></More>
      </el-menu-item>
    </el-menu>
  </div>
  <Ren></Ren>
  <Delete></Delete>
  <MovePage></MovePage>
  <CopyPage></CopyPage>
  <AddDialog></AddDialog>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
// 子组件
import Add from '@/views/application/components/add/index.vue' // 新建
import AddDialog from '@/views/application/components/add/dialog.vue' // 新建菜单页面
import More from '@/views/application/components/more/index.vue' // 更多
// 菜单选项组件
import Ren from '@/views/application/components/ren/index.vue' // 重命名
import Delete from '@/views/application/components/delete/index.vue' // 删除
import MovePage from '@/views/application/components/move/index.vue' // 移动
import CopyPage from '@/views/application/components/copy/index.vue' // 复制
// data method
import { appState } from '@/views/application/use-application-config'
import { useApplicationMethod } from '@/views/application/use-application-method'
const { getGroupListInquiry, getPageListInquiry, onClickGroup, onClickPage } = useApplicationMethod()
// mounted
onMounted(() => {
  Promise.all([getGroupListInquiry(), getPageListInquiry('0')])
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('menu') {
  width: 240px;
  overflow-x: hidden;
  overflow-y: overlay;
  border-radius: 8px;
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
  @include e('list') {
    border: 0;
    padding: 0 8px;
    margin-top: 22px;
    box-sizing: border-box;
    li {
      margin-bottom: 8px;
    }
    .el-menu-item {
      height: 32px;
      line-height: 32px;
      border-radius: 4px;
      box-sizing: border-box;
      padding: 0 8px 0 32px !important;
      span {
        width: 180px;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &:hover,
      &.is-active {
        color: #2f51ff;
        font-weight: 500;
        background-color: #f7faff;
        .gwin-platform-icon__page {
          background-image: url('@/assets/img/application/icon-page-active.png');
        }
      }
    }
  }
}
@include b('icon') {
  @include e('page') {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    background: url('@/assets/img/application/icon-page.png') no-repeat 0 0;
    background-size: 100%;
  }
  @include e('group') {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    background: url('@/assets/img/application/icon-group.png') no-repeat 0 0;
    background-size: 100%;
  }
}
</style>
