<template>
  <el-popover
    placement="bottom-start"
    :width="160"
    trigger="hover"
    :show-arrow="false"
    popper-class="gwin-platform-popper"
    @show="onShowPopper"
  >
    <template #reference>
      <i class="gwin-platform-icon__more"></i>
    </template>
    <template #default>
      <div class="gwin-platform-select">
        <p v-if="props.type !== 'group'" @click="goDesignPage">设计页面</p>
        <p @click="onOpenRenDialog">重命名</p>
        <p v-if="props.type !== 'group'" @click="onOpenCopyDialog">复制页面</p>
        <p v-if="props.type !== 'group'" @click="onOpenMoveDialog">移动页面</p>
        <p @click="onOpenDeleteDialog">删除</p>
      </div>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import { appState } from '@/views/application/use-application-config'
// use api
import { useApplicationMethod } from '@/views/application/use-application-method'
import { useRenMethod } from '@/views/application/components/ren/ren'
import { useDeleteMethod } from '@/views/application/components/delete/delete'
import { useMoveMethod } from '@/views/application/components/move/move'
import { useCopyMethod } from '@/views/application/components/copy/copy'

const { goDesignPage } = useApplicationMethod() // 设计页面
const { onOpenRenDialog } = useRenMethod() // 重命名
const { onOpenDeleteDialog } = useDeleteMethod() // 删除
const { onOpenMoveDialog } = useMoveMethod() // 移动
const { onOpenCopyDialog } = useCopyMethod() // 复制

interface Props {
  id: string
  type: string
  index?: number
  i?: number
  name: string
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  type: 'page',
  index: -1,
  i: -1,
  name: ''
})

/**
 * popper 显示时触发
 */
const onShowPopper = () => {
  ;({ ...appState.dialogData } = {
    id: props.id,
    type: props.type,
    index: props.index,
    i: props.i,
    name: props.name
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('icon') {
  @include e('more') {
    width: 16px;
    height: 16px;
    background: url('@/assets/img/application/icon-more.png') no-repeat 0 0;
    background-size: 100%;
    &:hover {
      background-image: url('@/assets/img/application/icon-more-active.png');
    }
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
