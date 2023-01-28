<template>
  <draggable
    v-if="designState.tablePageConfig.tableConfig[configState.list[configState.configIndex].key]?.length"
    :list="designState.tablePageConfig.tableConfig[configState.list[configState.configIndex].key]"
    :group="{ name: 'people', pull: 'clone', put: false }"
    item-key="key"
  >
    <template #item="{ element, index }">
      <div
        :class="['gwin-platform-content__item', { active: contentState.currentIndex === index }]"
        @click="getCurrent(index)"
      >
        <ad-search-button
          v-if="configState.list[configState.configIndex].key === 'actions'"
          :data="element"
          :size="element.size"
        ></ad-search-button>
        <div v-else>{{ element.label }}</div>
        <div class="gwin-platform-icons">
          <div @click="onCopy(element)">
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
    </template>
  </draggable>
  <div v-else class="gwin-platform-none">
    <i></i>
    <p>拖入或点击添加左侧控件设计表格</p>
  </div>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable'
import { contentState, useContentMethod } from './content'
import { designState } from '@/views/design/use-design-config'
import { configState } from '@/views/design/table/components/config/config'
const { getCurrent, onCopy, onDelete } = useContentMethod()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('content') {
  @include e('item') {
    width: 100%;
    padding: 20px;
    display: flex;
    cursor: pointer;
    font-size: 14px;
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
  color: #606a78;
  font-size: 14px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  i {
    width: 320px;
    height: 220px;
    margin: 130px 0 44px;
    background: url('@/assets/img/table/create.png') no-repeat 0 0;
    background-size: 100%;
  }
}
</style>
