<template>
  <div class="gwin-platform-content">
    <div v-if="designState.tablePageConfig.forms[attrState.formRule.key]?.length">
      <div v-for="item in Object.keys(designState.tablePageConfig.forms)" :key="item">
        <ad-form
          v-if="item === attrState.formRule.key"
          :ref="
            (el) => {
              if (el) adFormRef[item] = el
            }
          "
          :items="designState.tablePageConfig.forms[attrState.formRule.key]"
          :is-design="true"
          mode="vertical"
          @on-copy="onCopy($event, item)"
          @on-delete="onDelete($event, item)"
          @on-end="onEnd(item)"
          @on-item-click="getCurrent"
        ></ad-form>
      </div>
    </div>
    <div v-else class="gwin-platform-none">
      <i></i>
      <p>请创建表单，然后对表单进行设计</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { designState } from '@/views/design/use-design-config'
import { attrState } from '@/views/design/form/components/attr/attr'
import { useContentMethod } from './content'

const { adFormRef, onEnd, onDelete, onCopy, getCurrent } = useContentMethod()

function handleFormItemWidth() {
  adFormRef[attrState.formRule.key].handleLabelWidth()
}

function handleFormItemGetOptionFromApi(key: string, params?: Record<string, any>) {
  adFormRef[attrState.formRule.key].getOptionsFromApi(key, params)
}
defineExpose({
  handleFormItemWidth,
  handleFormItemGetOptionFromApi
})
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
