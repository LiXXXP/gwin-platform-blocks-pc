<template>
  <div class="gwin-platform-attr-handle">
    <Attr
      v-if="designState.tablePageConfig.tableConfig?.actions[contentState.currentIndex]"
      :list-item="designState.tablePageConfig.tableConfig?.actions[contentState.currentIndex]"
    >
      <template #default>
        <CodeMirror
          v-model:modelValue="designState.tablePageConfig.tableConfig.actions[contentState.currentIndex].if"
          :label="'能否显示'"
          :language="'typescript'"
          :placeholder="'请输入函数体代码，例如：return true'"
          @on-blur="onBlur($event, 'typescript', 'if')"
          @on-open-code-dialog="onOpenCodeDialog('if')"
        ></CodeMirror>
        <CodeMirror
          v-model:modelValue="designState.tablePageConfig.tableConfig.actions[contentState.currentIndex].disabled"
          :label="'是否禁用'"
          :language="'typescript'"
          :placeholder="'请输入函数体代码，例如：return true'"
          @on-blur="onBlur($event, 'typescript', 'disabled')"
          @on-open-code-dialog="onOpenCodeDialog('disabled')"
        ></CodeMirror>
      </template>
    </Attr>
  </div>
  <!-- 代码编辑弹窗 -->
  <CodeDialog @on-confirm="onConfirm"></CodeDialog>
</template>

<script lang="ts" setup>
import { designState } from '@/views/design/use-design-config'
import { contentState } from '@/views/design/table/components/content/content'
import { dialogState } from '@/views/design/components/dialog/dialog'
// 公共组件
import Attr from '@/views/design/button/components/attr/index.vue'
import CodeMirror from '@/components/CodeMirror/index.vue'
import CodeDialog from '@/views/design/components/dialog/index.vue'

const onBlur = (val: string, lang: string, key: string) => {
  const index = contentState.currentIndex
  if (val) {
    if (lang === 'json') {
      try {
        designState.tablePageConfig.tableConfig.actions[index][key] = JSON.parse(val)
      } catch (error) {
        designState.tablePageConfig.tableConfig.actions[index][key] = val
      }
    } else {
      if (val.includes(')()')) {
        designState.tablePageConfig.tableConfig.actions[index][key] = val
      } else {
        designState.tablePageConfig.tableConfig.actions[index][key] = `(${val})()`
      }
    }
  } else {
    delete designState.tablePageConfig.tableConfig.actions[index][key]
  }
}

const onOpenCodeDialog = (key: string) => {
  dialogState.key = key
}

const onConfirm = (val: any, key: string) => {
  designState.tablePageConfig.tableConfig.actions[contentState.currentIndex][key] = val
}
</script>

<style lang="scss" scoped></style>
