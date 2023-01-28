<template>
  <div class="gwin-platform-content">
    <div v-if="Object.keys(designState.tablePageConfig[configState.config])?.length">
      <div
        v-for="(item, index) in designState.tablePageConfig[configState.config]"
        :key="item.key"
        :class="['gwin-platform-content__item', { active: index === contentState.currentIndex }]"
        @click="contentState.currentIndex = index"
      >
        <p>{{ item.key }}</p>
        <div class="gwin-platform-icons">
          <div @click="onCopy(item)">
            <i class="gwin-platform-icons__copy"></i>
            <p>复制</p>
          </div>
          <el-popconfirm title="Are you sure to delete this?" @confirm="onDelete(index)">
            <template #reference>
              <div>
                <i class="gwin-platform-icons__delete"></i>
                <p>删除</p>
              </div>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </div>
    <div v-else class="gwin-platform-none">
      <i></i>
      <p>添加配置</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { contentState, useContentMethod } from './content'
import { designState } from '@/views/design/use-design-config'
import { configState } from '@/views/design/basic/components/config/config'
const { onCopy, onDelete } = useContentMethod()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('content') {
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  overflow: auto;
  overflow-x: overlay;
  overflow-y: overlay;
  box-sizing: border-box;
  width: calc(100% - 292px);
  box-shadow: 0px 10px 20px 0px rgba(195, 200, 222, 0.1);
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(144, 147, 153, 0.5);
  }
  @include e('item') {
    width: 100%;
    padding: 20px;
    display: flex;
    cursor: pointer;
    border-radius: 5px;
    margin-bottom: 24px;
    align-items: center;
    box-sizing: border-box;
    border: 1px dashed #7b61ff;
    justify-content: space-between;
    &.active {
      border: 1px solid #2f51ff;
    }
  }
}
@include b('icons') {
  display: flex;
  align-items: center;
  div {
    margin-left: 24px;
    &:hover {
      p {
        color: #2f51ff;
      }
      .gwin-platform-icons__copy {
        background-image: url('@/assets/img/item/icon-copy-active.png');
      }
      .gwin-platform-icons__delete {
        background-image: url('@/assets/img/item/icon-delete-active.png');
      }
    }
    p {
      font-size: 12px;
      color: #b1b6bb;
      margin-top: 5px;
    }
    i {
      width: 24px;
      height: 24px;
      display: block;
    }
  }
  @include e('copy') {
    background: url('@/assets/img/item/icon-copy.png') no-repeat 0 0;
    background-size: 100%;
  }
  @include e('delete') {
    background: url('@/assets/img/item/icon-delete.png') no-repeat 0 0;
    background-size: 100%;
  }
}
@include b('none') {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  i {
    width: 320px;
    height: 220px;
    margin: 130px 0 44px;
    background: url('@/assets/img/form/create.png') no-repeat 0 0;
    background-size: 100%;
  }
  p {
    color: #606a78;
    font-size: 14px;
  }
}
</style>
