<template>
  <div class="gwin-platform-attr-api">
    <el-form
      v-if="designState.tablePageConfig.apis[contentState.currentIndex]"
      ref="ruleFormRef"
      :model="designState.tablePageConfig.apis[contentState.currentIndex]"
      :rules="{
        key: [
          {
            required: true,
            message: '请填写',
            trigger: 'blur'
          }
        ]
      }"
      label-position="top"
      size="default"
      class="gwin-platform-form"
    >
      <Input
        v-model:modelValue="designState.tablePageConfig.apis[contentState.currentIndex].key"
        prop="key"
        :label="'key'"
        :placeholder="'key'"
        @on-change="onChange"
      ></Input>
      <Input
        v-model:modelValue="designState.tablePageConfig.apis[contentState.currentIndex].path"
        prop="key"
        :label="'path'"
        :placeholder="'path'"
      ></Input>
      <Select
        v-model:modelValue="designState.tablePageConfig.apis[contentState.currentIndex].method"
        :label="'method'"
        :placeholder="'选择method'"
        :options="[
          { label: 'post', value: 'post' },
          { label: 'get', value: 'get' }
        ]"
      ></Select>
      <Radio
        v-model:modelValue="designState.tablePageConfig.apis[contentState.currentIndex].isLoading"
        :label="'加载显示 Loading'"
        :options="[
          { label: true, value: '是' },
          { label: false, value: '否' }
        ]"
      ></Radio>
      <Radio
        v-model:modelValue="designState.tablePageConfig.apis[contentState.currentIndex].isMessage"
        :label="'加载显示 Message'"
        :options="[
          { label: true, value: '是' },
          { label: false, value: '否' }
        ]"
      ></Radio>
      <CodeMirror
        v-model:modelValue="designState.tablePageConfig.apis[contentState.currentIndex].config"
        :label="'config'"
        :language="'json'"
        :placeholder="`请输入json`"
        :content="`输入JSON格式的数据, {'type': 'admin'}`"
        @on-blur="onBlur($event, 'json', 'apis', 'config')"
        @on-open-code-dialog="onOpenCodeDialog('config')"
      ></CodeMirror>
      <CodeMirror
        v-model:modelValue="designState.tablePageConfig.apis[contentState.currentIndex].handleParams"
        :label="'参数处理函数'"
        :language="'typescript'"
        :placeholder="`请输入函数体代码，例如：return params`"
        :content="`可用变量：'ctx' 指向 tablePage 对象；'params' 有两种情况：1. 如果接口从搜索按钮调用时，指向搜索表单数据。2. 如果接口从表格按钮调用时，指向当前行数据。`"
        @on-blur="onBlur($event, 'typescript', 'apis', 'handleParams')"
        @on-open-code-dialog="onOpenCodeDialog('handleParams')"
      ></CodeMirror>
      <CodeMirror
        v-model:modelValue="designState.tablePageConfig.apis[contentState.currentIndex].handleResult"
        :label="'结果处理函数'"
        :language="'typescript'"
        :placeholder="`请输入函数体代码，例如：return params`"
        :content="`可用变量：'ctx' 指向 tablePage 对象；'params' 指向接口返回结果。`"
        @on-blur="onBlur($event, 'typescript', 'apis', 'handleResult')"
        @on-open-code-dialog="onOpenCodeDialog('handleResult')"
      ></CodeMirror>
      <CodeMirror
        v-model:modelValue="designState.tablePageConfig.apis[contentState.currentIndex].success"
        :label="'成功处理函数'"
        :language="'typescript'"
        :placeholder="`请输入函数体代码，例如：return params`"
        :content="`可用变量：'ctx' 指向 tablePage 对象；'params' 指向经过 handleResult 函数处理过的 result。`"
        @on-blur="onBlur($event, 'typescript', 'apis', 'success')"
        @on-open-code-dialog="onOpenCodeDialog('success')"
      ></CodeMirror>
      <CodeMirror
        v-model:modelValue="designState.tablePageConfig.apis[contentState.currentIndex].error"
        :label="'错误处理函数'"
        :language="'typescript'"
        :placeholder="`请输入函数体代码，例如：return params`"
        :content="`可用变量：'ctx' 指向 tablePage 对象；'params' 指 error 对象。`"
        @on-blur="onBlur($event, 'typescript', 'apis', 'error')"
        @on-open-code-dialog="onOpenCodeDialog('error')"
      ></CodeMirror>
      <CodeMirror
        v-model:modelValue="designState.tablePageConfig.apis[contentState.currentIndex].mock"
        :label="'mock数据'"
        :language="'json'"
        :placeholder="`请输入json`"
        :content="`输入JSON格式的数据。如果启用mock接口将会使用该数据。如果数据格式为数组需要给每项增加 id 字段，且保证唯一。`"
        @on-blur="onBlur($event, 'json', 'apis', 'mock')"
        @on-open-code-dialog="onOpenCodeDialog('mock')"
      ></CodeMirror>
    </el-form>
  </div>
  <!-- 代码编辑弹窗 -->
  <CodeDialog @on-confirm="onConfirm"></CodeDialog>
</template>

<script lang="ts" setup>
// 公共组件
import Input from '@/components/Input/index.vue'
import Radio from '@/components/Radio/index.vue'
import Select from '@/components/Select/index.vue'
import CodeMirror from '@/components/CodeMirror/index.vue'
import CodeDialog from '@/views/design/components/dialog/index.vue'

import { useAttrMethod } from './attr'
import { designState } from '@/views/design/use-design-config'
import { contentState } from '@/views/design/basic/components/content/content'
import { dialogState } from '@/views/design/components/dialog/dialog'

const { onChange, onBlur } = useAttrMethod()

const onOpenCodeDialog = (key: string) => {
  dialogState.key = key
}

const onConfirm = (val: any, key: string) => {
  designState.tablePageConfig.apis[contentState.currentIndex][key] = val
}
</script>

<style lang="scss" scoped></style>
