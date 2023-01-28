<template>
  <div class="gwin-platform-attr-var">
    <el-form
      v-if="designState.tablePageConfig.variables[contentState.currentIndex]"
      ref="ruleFormRef"
      :model="designState.tablePageConfig.variables[contentState.currentIndex]"
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
        v-model:modelValue="designState.tablePageConfig.variables[contentState.currentIndex].key"
        prop="key"
        :label="'key'"
        :placeholder="'key'"
        @on-change="onChange"
      ></Input>
      <Radio
        v-model:modelValue="varType.type"
        :label="'变量类型'"
        :content="'选择是时会在提交时校验，并且在label中增加 * 标'"
        :options="[
          { label: 'api', value: '从接口获取' },
          { label: 'custom', value: '自定义数据' }
        ]"
      ></Radio>
      <div v-if="varType.type === 'api'">
        <Select
          v-model:modelValue="designState.tablePageConfig.variables[contentState.currentIndex].apiKey"
          :label="'接口key'"
          :placeholder="'请选择'"
          :options="designState.apis"
        ></Select>
        <CodeMirror
          v-model:modelValue="designState.tablePageConfig.variables[contentState.currentIndex].handleResult"
          :label="'结果处理函数'"
          :language="'typescript'"
          :placeholder="`请输入函数体代码`"
          :content="`可用变量：'ctx' 指向 tablePage 对象；'params' 指向接口返回结果。`"
          @on-blur="onBlur($event, 'typescript', 'variables', 'handleResult')"
          @on-open-code-dialog="onOpenCodeDialog('handleResult')"
        ></CodeMirror>
      </div>
      <CodeMirror
        v-if="varType.type === 'custom'"
        v-model:modelValue="designState.tablePageConfig.variables[contentState.currentIndex].value"
        :label="'自定义'"
        :language="'json'"
        :placeholder="`请输入json`"
        :content="`如果是数组或对象请输入JSON格式`"
        @on-blur="onBlur($event, 'json', 'variables', 'value')"
        @on-open-code-dialog="onOpenCodeDialog('value')"
      ></CodeMirror>
    </el-form>
  </div>
  <!-- 代码编辑弹窗 -->
  <CodeDialog @on-confirm="onConfirm"></CodeDialog>
</template>

<script lang="ts" setup>
import { watchEffect } from 'vue'
// 公共组件
import Input from '@/components/Input/index.vue'
import Radio from '@/components/Radio/index.vue'
import Select from '@/components/Select/index.vue'
import CodeMirror from '@/components/CodeMirror/index.vue'
import CodeDialog from '@/views/design/components/dialog/index.vue'
// data
import { varType, useAttrMethod } from './attr'
import { designState } from '@/views/design/use-design-config'
import { contentState } from '@/views/design/basic/components/content/content'
import { dialogState } from '@/views/design/components/dialog/dialog'

watchEffect(() => {
  const item = designState.tablePageConfig.variables[contentState.currentIndex]
  if ((!item?.apiKey && !item?.value) || item?.apiKey) {
    varType.type = 'api'
  } else {
    varType.type = 'custom'
  }
})

const { onBlur, onChange } = useAttrMethod()

const onOpenCodeDialog = (key: string) => {
  dialogState.key = key
}

const onConfirm = (val: any, key: string) => {
  designState.tablePageConfig.variables[contentState.currentIndex][key] = val
}
</script>

<style lang="scss" scoped></style>
