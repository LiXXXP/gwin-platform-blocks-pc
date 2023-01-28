<template>
  <div class="gwin-platform-bar">
    <div v-if="props.isAdd" class="gwin-platform-bar__add" @click="onAdd">
      <i></i>
      <p>新增</p>
    </div>
    <slot name="cancel"></slot>
    <div class="gwin-platform-bar__save" @click="onSave">
      <p>保存</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDesignMethod } from '@/views/design/use-design-method'
const { onSave } = useDesignMethod()

interface Props {
  isAdd?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isAdd: true
})

const emit = defineEmits(['onAdd'])

/**
 * 新增
 */
const onAdd = () => {
  emit('onAdd')
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('bar') {
  height: 56px;
  display: flex;
  padding: 0 20px;
  border-radius: 8px;
  background: #fff;
  align-items: center;
  margin-bottom: 20px;
  box-sizing: border-box;
  justify-content: flex-end;
  box-shadow: 0px 10px 20px 0px rgba(195, 200, 222, 0.1);
  @include e('add') {
    width: 92px;
    height: 32px;
    display: flex;
    cursor: pointer;
    margin-right: 16px;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    border: 1px solid #d4d6d9;
    &:hover {
      border-color: #2f51ff;
      i {
        background-image: url('@/assets/img/form/icon-add-active.png');
      }
      p {
        color: #2f51ff;
      }
    }
    i {
      width: 16px;
      height: 16px;
      margin-right: 4px;
      background: url('@/assets/img/form/icon-add.png') no-repeat 0 0;
      background-size: 100%;
    }
    p {
      color: #31373d;
      font-size: 14px;
    }
  }
  @include e('save') {
    width: 92px;
    height: 32px;
    display: flex;
    cursor: pointer;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    background-color: #2f51ff;
    &:hover {
      background-color: #506dff;
    }
    p {
      color: #fff;
      font-size: 14px;
    }
  }
}
</style>
