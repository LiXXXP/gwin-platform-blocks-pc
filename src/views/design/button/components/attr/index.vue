<template>
  <el-form
    v-if="props.listItem"
    ref="ruleFormRef"
    :model="props.listItem"
    :rules="{
      key: [
        {
          required: true,
          message: '请填写key',
          trigger: 'blur'
        }
      ]
    }"
    label-position="top"
    size="default"
    class="gwin-platform-form"
  >
    <Input v-model:modelValue="buttonAttrState.listItem.key" prop="key" :label="'key'" :placeholder="'name'"></Input>
    <Input v-model:modelValue="buttonAttrState.listItem.label" :label="'label'" :placeholder="'label'"></Input>
    <Select
      v-model:modelValue="buttonAttrState.listItem.icon"
      :label="'icon'"
      :placeholder="'选择icon'"
      :options="[
        { label: 'AddLocation', value: 'AddLocation' },
        { label: 'Aim', value: 'Aim' },
        { label: 'AlarmClock', value: 'AlarmClock' },
        { label: 'Apple', value: 'Apple' },
        { label: 'ArrowDownBold', value: 'ArrowDownBold' }
      ]"
    ></Select>
    <Select
      v-model:modelValue="buttonAttrState.listItem.type"
      :label="'类型'"
      :placeholder="'选择类型'"
      :options="[
        { label: 'primary', value: 'primary' },
        { label: 'success', value: 'success' },
        { label: 'warning', value: 'warning' },
        { label: 'danger', value: 'danger' },
        { label: 'info', value: 'info' }
      ]"
    ></Select>
    <Radio
      v-model:modelValue="buttonAttrState.listItem.text"
      :label="'是否为text'"
      :options="[
        { label: true, value: '是' },
        { label: false, value: '否' }
      ]"
    ></Radio>
    <Select
      v-model:modelValue="buttonAttrState.listItem.size"
      :label="'size'"
      :placeholder="'选择size'"
      :options="[
        { label: 'default', value: 'default' },
        { label: 'large', value: 'large' },
        { label: 'small', value: 'small' }
      ]"
    ></Select>
    <CodeMirror
      v-model:modelValue="buttonAttrState.listItem.style"
      :label="'样式'"
      :language="'json'"
      :placeholder="`符合css规范的json`"
      @on-blur="onBlur($event, 'json', 'style')"
      @on-open-code-dialog="onOpenCodeDialog('style')"
    ></CodeMirror>
    <CodeMirror
      v-model:modelValue="buttonAttrState.listItem.beforeAction"
      :label="'发送前执行'"
      :language="'typescript'"
      :placeholder="`请输入函数体代码，例如：return true`"
      :content="'点击按钮，执行该函数，根据返回结果true和false判断是否继续执行后续接口。'"
      @on-blur="onBlur($event, 'typescript', 'beforeAction')"
      @on-open-code-dialog="onOpenCodeDialog('beforeAction')"
    ></CodeMirror>
    <CodeMirror
      v-model:modelValue="buttonAttrState.listItem.onClick"
      :label="'点击执行'"
      :language="'typescript'"
      :placeholder="`请输入函数体代码，例如：return true`"
      :content="'点击按钮，执行该函数，即按钮点击事件。'"
      @on-blur="onBlur($event, 'typescript', 'onClick')"
      @on-open-code-dialog="onOpenCodeDialog('onClick')"
    ></CodeMirror>
    <Select
      v-model:modelValue="buttonAttrState.listItem.interactionType"
      :label="'交互类型'"
      :placeholder="'选择交互类型'"
      :content="'点击按钮时的交互形式'"
      :options="[
        { label: '无', value: 'submit' },
        { label: '调用接口', value: 'api' },
        { label: '弹窗表单', value: 'popup' },
        { label: '二次确认', value: 'confirm' },
        { label: '自定义', value: 'custom' }
      ]"
    ></Select>
    <Select
      v-if="props.listItem.interactionType === 'api'"
      v-model:modelValue="buttonAttrState.listItem.apiKey"
      :label="'接口key'"
      :placeholder="'请选择'"
      :options="designState.apis"
    ></Select>
    <!-- 弹窗 -->
    <div v-if="props.listItem.interactionType === 'popup'">
      <Input v-model:modelValue="buttonAttrState.listItem.title" :label="'弹窗标题'" :placeholder="'弹窗标题'"></Input>
      <Input
        v-model:modelValue="buttonAttrState.listItem.modalWidth"
        :label="'弹窗宽度'"
        :placeholder="'500px'"
        :content="'暂时不支持自适应弹窗宽度，需要自己调整。格式如：300px || 30%'"
      ></Input>
      <Select
        v-model:modelValue="buttonAttrState.listItem.formKey"
        :label="'表单key'"
        :placeholder="'请选择'"
        :options="designState.forms"
      ></Select>
      <Radio
        v-model:modelValue="buttonAttrState.listItem.applyRowData"
        :label="'使用Table的值'"
        :content="`点击表单或者表格中的按钮显示弹窗时，是否使用当前行的数据给表单赋值，默认：'否'`"
        :options="[
          { label: true, value: '是' },
          { label: false, value: '否' }
        ]"
      ></Radio>
      <Radio
        v-model:modelValue="buttonAttrState.listItem.fullscreen"
        :label="'从接口获取值'"
        :content="`点击表格中的按钮显示弹窗时，是否使用从接口获取的数据给表单赋值`"
        :options="[
          { label: true, value: '是' },
          { label: false, value: '否' }
        ]"
      ></Radio>
      <Select
        v-model:modelValue="buttonAttrState.listItem.dataSourceApiKey"
        :label="'获取数据接口'"
        :placeholder="'请选择'"
        :options="designState.apis"
      ></Select>
      <Select
        v-model:modelValue="buttonAttrState.listItem.apiKey"
        :label="'api key'"
        :placeholder="'请选择'"
        :options="designState.apis"
      ></Select>
      <CodeMirror
        v-model:modelValue="buttonAttrState.listItem.onCommonFormShow"
        :label="'显示弹窗后回调函数'"
        :language="'typescript'"
        :placeholder="`请输入函数体代码，例如：ctx.$message.success('执行成功')`"
        :content="`点击按钮，显示弹窗后，要执行的回调函数。参数：'ctx' 指 tablePage 对象。`"
        @on-blur="onBlur($event, 'typescript', 'onCommonFormShow')"
        @on-open-code-dialog="onOpenCodeDialog('onCommonFormShow')"
      ></CodeMirror>
    </div>
    <!-- 二次确认弹窗 -->
    <div v-if="props.listItem.interactionType === 'confirm'">
      <Input v-model:modelValue="buttonAttrState.listItem.title" :label="'弹窗标题'" :placeholder="'弹窗标题'"></Input>
      <Input
        v-model:modelValue="buttonAttrState.listItem.content"
        :label="'提示内容'"
        :placeholder="'提示内容'"
      ></Input>
      <Input
        v-model:modelValue="buttonAttrState.listItem.modalWidth"
        :label="'弹窗宽度'"
        :placeholder="'500px'"
        :content="'暂时不支持自适应弹窗宽度，需要自己调整。格式如：300px || 30%'"
      ></Input>
      <Select
        v-model:modelValue="buttonAttrState.listItem.apiKey"
        :label="'api key'"
        :placeholder="'请选择'"
        :options="designState.apis"
      ></Select>
      <CodeMirror
        v-model:modelValue="buttonAttrState.listItem.onCommonFormShow"
        :label="'显示弹窗后回调函数'"
        :language="'typescript'"
        :placeholder="`请输入函数体代码，例如：ctx.$message.success('执行成功')`"
        :content="`点击按钮，显示弹窗后，要执行的回调函数。参数：'ctx' 指 tablePage 对象。`"
        @on-blur="onBlur($event, 'typescript', 'onCommonFormShow')"
        @on-open-code-dialog="onOpenCodeDialog('onCommonFormShow')"
      ></CodeMirror>
    </div>
    <div
      v-if="
        props.listItem.interactionType === 'api' ||
        props.listItem.interactionType === 'popup' ||
        props.listItem.interactionType == 'confirm'
      "
    >
      <Select
        v-model:modelValue="buttonAttrState.listItem.onCallback"
        :label="'操作成功后执行动作'"
        :placeholder="'请选择'"
        :multiple="true"
        :content="`操作成功时执行的动作，上面的表单为内置的一些动作：'刷新表格'-重新请求搜索接口，刷新表格数据；'显示成功提示'-提示内容为 '按钮名称 + 成功'；下面的文本输入框为自定义执行内容。两者会合并，一起执行。参数：'ctx' 指 tablePage 对象。`"
        :options="[
          { label: '刷新表格', value: 'search' },
          { label: '显示成功提示', value: 'message' }
        ]"
      ></Select>
      <CodeMirror
        v-model:modelValue="buttonAttrState.onCallback"
        :label="''"
        :language="'typescript'"
        :placeholder="`请输入函数体代码，例如：return true`"
        @on-blur="onBlurCallback"
      ></CodeMirror>
    </div>
    <CodeMirror
      v-if="props.listItem.interactionType === 'custom'"
      v-model:modelValue="buttonAttrState.listItem.render"
      :label="'自定义'"
      :language="'typescript'"
      :placeholder="`请输入函数体代码，例如：return true`"
      :content="`点击按钮时直接执行的函数。参数：'ctx' 指 tablePage 对象；如果按钮在表格操作列时有额外参数 'params' 指当前行的数据`"
      @on-blur="onBlur($event, 'typescript', 'render')"
      @on-open-code-dialog="onOpenCodeDialog('render')"
    ></CodeMirror>
    <slot></slot>
    <CodeMirror
      v-model:modelValue="buttonAttrState.customLabel"
      :label="'自定义渲染'"
      :language="'typescript'"
      :placeholder="`请输入函数体代码，例如：return true`"
      :content="`点击按钮时直接执行的函数。参数：'ctx' 指 tablePage 对象；如果按钮在表格操作列时有额外参数 'params' 指当前行的数据`"
      @on-blur="onBlurCustomLabel"
      @on-open-code-dialog="onOpenCodeDialog('customLabel')"
    ></CodeMirror>
  </el-form>
  <!-- 代码编辑弹窗 -->
  <CodeDialog @on-confirm="onConfirm"></CodeDialog>
</template>

<script lang="ts" setup>
// 公共组件
import Input from '@/components/Input/index.vue'
import Select from '@/components/Select/index.vue'
import Radio from '@/components/Radio/index.vue'
import CodeMirror from '@/components/CodeMirror/index.vue'
import CodeDialog from '@/views/design/components/dialog/index.vue'

import { reactive, watchEffect } from 'vue'
import { designState } from '@/views/design/use-design-config'
import { dialogState } from '@/views/design/components/dialog/dialog'

interface Props {
  listItem: any
}

const props = withDefaults(defineProps<Props>(), {
  listItem: () => ({})
})

const buttonAttrState = reactive({
  listItem: props.listItem,
  onCallback: '',
  customLabel: ''
})

watchEffect(() => {
  buttonAttrState.listItem = props.listItem
})

const onBlur = (val: string, lang: string, key: string) => {
  if (val) {
    if (lang === 'json') {
      try {
        buttonAttrState.listItem[key] = JSON.parse(val)
      } catch (error) {
        buttonAttrState.listItem[key] = val
      }
    } else {
      if (val.includes(')()')) {
        buttonAttrState.listItem[key] = val
      } else {
        buttonAttrState.listItem[key] = `(${val})()`
      }
    }
  } else {
    delete buttonAttrState.listItem[key]
  }
}

const onBlurCallback = (val: string) => {
  const arr: string[] = []
  if (buttonAttrState.listItem.onCallback?.length) {
    for (const item of buttonAttrState.listItem.onCallback) {
      if (item.includes('search') || item.includes('message')) {
        arr.push(item)
      }
    }
    buttonAttrState.listItem.onCallback = arr
  }
  if (val) {
    if (val.includes(')()')) {
      buttonAttrState.listItem.onCallback.push(val)
    } else {
      buttonAttrState.listItem.onCallback.push(`(${val})()`)
    }
  }
}

const onBlurCustomLabel = (val: string) => {
  if (val) {
    if (val.includes(')()')) {
      buttonAttrState.customLabel = val
    } else {
      buttonAttrState.customLabel = `(${val})()`
    }
  }
  if (!buttonAttrState.listItem.label) {
    buttonAttrState.listItem.label = buttonAttrState.customLabel
  }
}

const onOpenCodeDialog = (key: string) => {
  dialogState.key = key
}

const onConfirm = (val: any, key: string) => {
  if (key === 'customLabel') {
    buttonAttrState.customLabel = val
    if (!buttonAttrState.listItem.label) {
      buttonAttrState.listItem.label = buttonAttrState.customLabel
    }
  } else {
    buttonAttrState.listItem[key] = val
  }
}
</script>

<style lang="scss" scoped></style>
