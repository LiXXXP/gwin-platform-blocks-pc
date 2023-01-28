<template>
  <div class="gwin-platform-attr-data">
    <el-form
      v-if="designState.tablePageConfig.tableConfig?.columns[contentState.currentIndex]"
      ref="ruleFormRef"
      :model="designState.tablePageConfig.tableConfig?.columns[contentState.currentIndex]"
      :rules="{
        prop: [
          {
            required: true,
            message: '请填写',
            trigger: 'blur'
          }
        ],
        label: [
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
        v-model:modelValue="designState.tablePageConfig.tableConfig.columns[contentState.currentIndex].prop"
        prop="prop"
        :label="'prop'"
        :placeholder="'prop'"
        :content="'对应列内容的字段名'"
      ></Input>
      <Input
        v-model:modelValue="designState.tablePageConfig.tableConfig.columns[contentState.currentIndex].label"
        prop="label"
        :label="'表头标题'"
        :placeholder="'表头标题'"
      ></Input>
      <Input
        v-model:modelValue="designState.tablePageConfig.tableConfig.columns[contentState.currentIndex].width"
        :label="'宽度'"
        :placeholder="'100px'"
      ></Input>
      <Radio
        v-model:modelValue="
          designState.tablePageConfig.tableConfig.columns[contentState.currentIndex].showOverflowTooltip
        "
        :label="'文字提示'"
        :content="'超出部分隐藏，鼠标放上去使用el-tooltip提示'"
        :options="[
          { label: true, value: '是' },
          { label: false, value: '否' }
        ]"
      ></Radio>
      <Input
        v-model:modelValue="designState.tablePageConfig.tableConfig.columns[contentState.currentIndex].maxWidth"
        :label="'指示最大宽度'"
        :placeholder="'100px'"
      ></Input>
      <Select
        v-model:modelValue="designState.tablePageConfig.tableConfig.columns[contentState.currentIndex].handleType"
        :label="'特殊处理'"
        :placeholder="'请选择'"
        :content="'当前列会做特殊处理：链接、标签、时间。当prop为status时，备选项增加status'"
        :options="[
          { label: '超链接', value: 'href' },
          { label: '标签', value: 'tags' },
          { label: '日期时间', value: 'time' },
          { label: '状态', value: 'status' }
        ]"
      ></Select>
      <Input
        v-if="designState.tablePageConfig.tableConfig.columns[contentState.currentIndex].handleType === 'href'"
        v-model:modelValue="designState.tablePageConfig.tableConfig.columns[contentState.currentIndex].maxWidth"
        :label="'跳转链接'"
        :placeholder="'/link'"
        :content="'如果链接中有变量可以用下面格式 /page/${assetId}/${id}，其中 assetId 和 id 将会被解析成当前行对应的值'"
      ></Input>
      <div v-if="designState.tablePageConfig.tableConfig.columns[contentState.currentIndex].handleType === 'tags'">
        <Select
          v-model:modelValue="designState.tablePageConfig.tableConfig.columns[contentState.currentIndex].tagsVariables"
          :label="'变量key'"
          :placeholder="'请选择'"
          :content="`标签的映射变量，变量格式要求[{ 'label': '标签中展示的字段', 'value': '接口返回的对应值', style: {'color': '标签的文字颜色，默认白色', 'background-color': '标签的背景颜色', 'border-color': '标签的边框颜色'} }]`"
          :options="designState.variables"
        ></Select>
        <CodeMirror
          v-model:modelValue="designState.tablePageConfig.tableConfig.columns[contentState.currentIndex].tags"
          :label="'标签处理'"
          :language="'typescript'"
          :placeholder="'请输入函数体代码，例如：return params'"
          :content="`如果需要自行处理标签的值，可以自定义函数，可用变量：'ctx' 指向 tablePage 对象；'params' 指当前应该渲染的数据；'r' 是数组类型，第一项是当前行的数据。返回数据格式要求[{ 'label': '标签中展示的字段', 'value': '接口返回的对应值', style: {'color': '标签的文字颜色，默认白色', 'background-color': '标签的背景颜色', 'border-color': '标签的边框颜色'} }]`"
          @on-blur="onBlur($event, 'typescript', 'tags')"
          @on-open-code-dialog="onOpenCodeDialog('tags')"
        ></CodeMirror>
      </div>
      <Input
        v-if="designState.tablePageConfig.tableConfig.columns[contentState.currentIndex].handleType === 'time'"
        v-model:modelValue="designState.tablePageConfig.tableConfig.columns[contentState.currentIndex].dateTimeFormate"
        :label="'格式化'"
        :placeholder="'YYYY-MM-DD HH:mm'"
        :content="'时间戳格式化的方式，默认为：YYYY-MM-DD HH:mm'"
      ></Input>
      <Radio
        v-if="designState.tablePageConfig.tableConfig.columns[contentState.currentIndex].handleType === 'status'"
        v-model:modelValue="designState.tablePageConfig.tableConfig.columns[contentState.currentIndex].auto"
        :label="'状态切换'"
        :content="'特殊处理选择为：状态时显示，即使用switch组件，运行行内编辑更新状态，调用接口顺序 statusUpdateApi || updateApi'"
        :options="[
          { label: true, value: '是' },
          { label: false, value: '否' }
        ]"
      ></Radio>
      <Radio
        v-model:modelValue="designState.tablePageConfig.tableConfig.columns[contentState.currentIndex].sortable"
        :label="'可排序'"
        :options="[
          { label: true, value: '是' },
          { label: false, value: '否' }
        ]"
      ></Radio>
      <Radio
        v-model:modelValue="designState.tablePageConfig.tableConfig.columns[contentState.currentIndex].isVariableMap"
        :label="'映射处理'"
        :options="[
          { label: true, value: '是' },
          { label: false, value: '否' }
        ]"
      ></Radio>
      <Radio
        v-model:modelValue="tableAttrState.variableType"
        :label="'映射获取'"
        :options="[
          { label: 'var', value: '变量' },
          { label: 'custom', value: '自定义' }
        ]"
        @update:model-value="
          designState.tablePageConfig.tableConfig.columns[contentState.currentIndex].variableMap = {}
        "
      ></Radio>
      <div v-if="tableAttrState.variableType === 'var'">
        <Select
          v-model:modelValue="
            designState.tablePageConfig.tableConfig.columns[contentState.currentIndex].variableMap.variableKey
          "
          :label="'变量key'"
          :placeholder="'请选择'"
          :options="designState.variables"
        ></Select>
        <Input
          v-model:modelValue="
            designState.tablePageConfig.tableConfig.columns[contentState.currentIndex].variableMap.valueKey
          "
          :label="'value key'"
          :placeholder="'value'"
        ></Input>
        <Input
          v-model:modelValue="
            designState.tablePageConfig.tableConfig.columns[contentState.currentIndex].variableMap.labelKey
          "
          :label="'label key'"
          :placeholder="'label'"
        ></Input>
      </div>
      <CodeMirror
        v-if="tableAttrState.variableType === 'custom'"
        v-model:modelValue="designState.tablePageConfig.tableConfig.columns[contentState.currentIndex].map"
        :label="'映射值'"
        :language="'json'"
        :placeholder="'请输入JSON数组'"
        @on-blur="onBlur($event, 'json', 'map')"
        @on-open-code-dialog="onOpenCodeDialog('map')"
      ></CodeMirror>
      <CodeMirror
        v-model:modelValue="designState.tablePageConfig.tableConfig.columns[contentState.currentIndex].render"
        :label="'自定义内容'"
        :language="'typescript'"
        :placeholder="'请输入函数体代码，例如：return params'"
        :content="`将原本展示的内容用该函数的返回值替换，可用变量：'ctx' 指向 tablePage 对象；'params' 指当前应该渲染的数据；'r' 是数组类型，第一项是当前行的数据`"
        @on-blur="onBlur($event, 'typescript', 'render')"
        @on-open-code-dialog="onOpenCodeDialog('render')"
      ></CodeMirror>
      <CodeMirror
        v-model:modelValue="designState.tablePageConfig.tableConfig.columns[contentState.currentIndex].tsx"
        :label="'自定义渲染'"
        :language="'typescript'"
        :placeholder="'请输入函数体代码，例如： return params;'"
        :content="'tsx'"
        @on-blur="onBlur($event, 'typescript', 'tsx')"
        @on-open-code-dialog="onOpenCodeDialog('tsx')"
      ></CodeMirror>
      <CodeMirror
        v-model:modelValue="tableAttrState.otherConfig[contentState.currentIndex]"
        :label="'其他配置'"
        :language="'json'"
        :placeholder="`请输入JSON，例如： { 'fixed': true }`"
        @on-blur="onBlurConfig"
        @on-open-code-dialog="onOpenCodeDialog('otherConfig')"
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

import { tableAttrState, useAttrMethod } from './attr'
import { designState } from '@/views/design/use-design-config'
import { contentState } from '@/views/design/table/components/content/content'
import { dialogState } from '@/views/design/components/dialog/dialog'

const { onBlur, onBlurConfig } = useAttrMethod()

const onOpenCodeDialog = (key: string) => {
  dialogState.key = key
}

const onConfirm = (val: any, key: string) => {
  if (key === 'otherConfig') {
    tableAttrState.otherConfig[contentState.currentIndex] = val
    onBlurConfig(val)
  } else {
    designState.tablePageConfig.tableConfig.columns[contentState.currentIndex][key] = val
  }
}
</script>

<style lang="scss" scoped></style>
