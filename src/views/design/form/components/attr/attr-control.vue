<template>
  <div class="gwin-platform-attr-control">
    <el-form
      v-if="
        designState.tablePageConfig.forms[attrState.formRule.key] &&
        designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex]
      "
      ref="ruleFormRef"
      :model="designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex]"
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
      <Input
        v-model:modelValue="designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].key"
        prop="key"
        :label="'key'"
        :placeholder="'name'"
        :content="'与后台交互时的键名，在同一个表单中有唯一性'"
      ></Input>
      <Input
        v-model:modelValue="designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].label"
        :label="'label'"
        :placeholder="'label'"
        :content="'表单项的标识。如果不填则该表单项不占用描述的位置，如果填空字符串则会用空白占用位置'"
      ></Input>
      <Select
        v-model:modelValue="
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].labelType
        "
        :label="'风格'"
        :placeholder="'居左对齐'"
        :content="'label的样式风格，居左对齐，居右对齐，上下结构'"
        :options="[
          { label: '居左对齐', value: 'Normal' },
          { label: '上下结构', value: 'Vertical' },
          { label: '居右对齐', value: 'AliginRight' }
        ]"
      ></Select>
      <Input
        v-model:modelValue="designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].tip"
        :label="'提示'"
        :placeholder="'提示语'"
        :content="'如同当前看到的提示信息'"
      ></Input>
      <Select
        v-model:modelValue="designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].type"
        :label="'类型'"
        :placeholder="'类型选择'"
        :options="[
          { label: '输入框', value: 'Input' },
          { label: '数字输入框', value: 'InputNumber' },
          { label: '单选框', value: 'Radio' },
          { label: '多选框', value: 'Checkbox' },
          { label: '选择器', value: 'Select' },
          { label: '级连选择器', value: 'Cascader' },
          { label: '虚拟选择器', value: 'SelectV2' },
          { label: '日期选择器', value: 'DatePicker' },
          { label: '时间选择器', value: 'TimePicker' },
          { label: '时间选择', value: 'TimeSelect' },
          { label: '评分', value: 'Rate' },
          { label: '滑块', value: 'Slider' },
          { label: '开关', value: 'Switch' },
          { label: '上传器', value: 'Upload' },
          { label: '穿梭框', value: 'Transfer' },
          { label: '自定义渲染', value: 'Render' }
        ]"
      ></Select>
      <CodeMirror
        v-model:modelValue="designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].data"
        :label="'data'"
        :language="'json'"
        :placeholder="'参考element plus属性，配置为json'"
        :content="`可传参数包含所有 Element 该类型表单项的 Attributes，会将值通过 v-bind 绑定至该表单组件。例如 { 'placeholder': '请输入', 'disabled': true}`"
        @on-blur="onBlur($event, 'json', 'data')"
        @on-open-code-dialog="onOpenCodeDialog('data')"
      ></CodeMirror>
      <Radio
        v-model:modelValue="
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].required
        "
        :label="'必填'"
        :content="'选择是时会在提交时校验，并且在label中增加 * 标'"
        :options="[
          { label: true, value: '是' },
          { label: false, value: '否' }
        ]"
      ></Radio>
      <Radio
        v-model:modelValue="designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].status"
        :label="'状态'"
        :content="'表单项默认显示或者隐藏，隐藏状态可以通过关联其他表单项触发改变状态动作，或者主动将 status 设置为 true 来显示'"
        :options="[
          { label: true, value: '显示' },
          { label: false, value: '隐藏' }
        ]"
      ></Radio>
      <Radio
        v-model:modelValue="
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].isIgnore
        "
        :label="'忽略'"
        :content="'提交表单时，是否忽略该字段'"
        :options="[
          { label: true, value: '是' },
          { label: false, value: '否' }
        ]"
      ></Radio>
      <Radio
        v-model:modelValue="
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].isGetOptionsFromApi
        "
        :label="'从接口获取备选项'"
        :options="[
          { label: true, value: '是' },
          { label: false, value: '否' }
        ]"
        @update:model-value="onChangeOptionsFrom"
      ></Radio>
      <div
        v-if="
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].isGetOptionsFromApi &&
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].getOptionsFromApi
        "
      >
        <Radio
          v-model:modelValue="
            designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].getOptionsFromApi
              .isMountedGet
          "
          :label="'挂载时请求接口'"
          :content="`是：表单加载完毕直接请求接口，获取备选项。否：需要主动通过form的getOptionsFromApi(key)方法触发，或者关联其他表单项触发获取备选项动作。`"
          :options="[
            { label: true, value: '是' },
            { label: false, value: '否' }
          ]"
        ></Radio>
        <Select
          v-model:modelValue="
            designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].getOptionsFromApi
              .apiKey
          "
          :label="'接口key'"
          :placeholder="'接口key'"
          :options="designState.apis"
          :is-title-right-button="true"
          right-button-title="获取数据"
          @update:model-value="updateFormItemOptionApi"
          @title-right-button-click="
            formItemGetOptionFromApi(
              designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].key
            )
          "
        ></Select>
        <Input
          v-model:modelValue="
            designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].getOptionsFromApi
              .valueKey
          "
          :label="'value key'"
          :placeholder="'value key'"
          :content="'将返回结果的该属性用作备选项的value'"
        ></Input>
        <Input
          v-model:modelValue="
            designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].getOptionsFromApi
              .labelKey
          "
          :label="'label key'"
          :placeholder="'label key'"
          :content="'将返回结果的该属性用作备选项的label'"
        ></Input>
      </div>
      <Radio
        v-if="!designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].isGetOptionsFromApi"
        v-model:modelValue="
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].isGetOptionsFromVariable
        "
        :label="'从变量获取备选项'"
        :content="`不应该与 '是否从接口获取备选项' 同时存在`"
        :options="[
          { label: true, value: '是' },
          { label: false, value: '否' }
        ]"
        @update:model-value="onChangeOptionsFrom"
      ></Radio>
      <div
        v-if="
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex]
            .isGetOptionsFromVariable &&
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].getOptionsFromVariables
        "
      >
        <Select
          v-model:modelValue="
            designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].getOptionsFromVariables
              .variableKey
          "
          :label="'变量key'"
          :placeholder="'变量key'"
          :options="designState.variables"
          @change="onGetOptionFromVariablesChange"
        ></Select>
        <Input
          v-model:modelValue="
            designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].getOptionsFromVariables
              .valueKey
          "
          :label="'value key'"
          :placeholder="'value key'"
          @blur="onGetOptionFromVariablesBlur"
        ></Input>
        <Input
          v-model:modelValue="
            designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].getOptionsFromVariables
              .labelKey
          "
          :label="'label key'"
          :placeholder="'label key'"
          @blur="onGetOptionFromVariablesBlur"
        ></Input>
      </div>
      <Radio
        v-if="!designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].isGetOptionsFromApi"
        v-model:modelValue="
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].isGetOptionsFromParent
        "
        :label="'从页面获取备选项'"
        :content="`不应该与 '是否从接口获取备选项' 同时存在`"
        :options="[
          { label: true, value: '是' },
          { label: false, value: '否' }
        ]"
        @update:model-value="onChangeOptionsFrom"
      ></Radio>
      <div
        v-if="
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].isGetOptionsFromParent &&
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].getOptionsFromParent
        "
      >
        <Input
          v-model:modelValue="
            designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].getOptionsFromParent
              .key
          "
          :label="'变量key'"
          :placeholder="'key'"
        ></Input>
        <Radio
          v-model:modelValue="
            designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].getOptionsFromParent
              .isHandle
          "
          :label="'使用默认方法处理变量'"
          :options="[
            { label: true, value: '是' },
            { label: false, value: '否' }
          ]"
        ></Radio>
        <Input
          v-model:modelValue="
            designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].getOptionsFromParent
              .valueKey
          "
          :label="'value key'"
          :placeholder="'value key'"
        ></Input>
        <Input
          v-model:modelValue="
            designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].getOptionsFromParent
              .labelKey
          "
          :label="'label key'"
          :placeholder="'label key'"
        ></Input>
      </div>
      <Radio
        v-model:modelValue="
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].isRelation
        "
        :label="'关联其他表单项'"
        :options="[
          { label: true, value: '是' },
          { label: false, value: '否' }
        ]"
      ></Radio>
      <Radio
        v-model:modelValue="attrState.relationType"
        :label="'关联方式'"
        :content="'发布模式：当前项改变时，同时改变关联项；订阅模式：关联项改变时，同时改变当前项。'"
        :options="[
          { label: 'publish', value: '发布模式' },
          { label: 'subscribe', value: '订阅模式' }
        ]"
        @update:model-value="onChangeRelationType"
      ></Radio>
      <Input
        v-model:modelValue="
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex][attrState.relationType]
            .key
        "
        :label="'关联项的key'"
        :placeholder="'如果有多项，用英文逗号分割'"
      ></Input>
      <Select
        v-model:modelValue="attrState.relationActionType"
        :label="'关联动作方式'"
        :placeholder="'匹配方式'"
        :content="'两种不同的判断关联方式，匹配方式：如果 match 方法返回 true，则执行 success 和 finally 动作，如果 match 返回 false，则执行 error 和 finally 动作；回调方式：直接执行 onCallback 方法'"
        :options="[
          { label: '匹配方式', value: 'match' },
          { label: '回调方式', value: 'callback' }
        ]"
      ></Select>
      <CodeMirror
        v-if="attrState.relationActionType === 'match'"
        v-model:modelValue="
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex][attrState.relationType]
            .match
        "
        :label="'匹配方法'"
        :language="'typescript'"
        :placeholder="'请输入函数体代码'"
        :content="`可用变量：'ctx'-指向 form 表单对象；'self'-指向订阅者对象；'value'-指的是发布者改变的值。（需要重新写一下描述）`"
        @on-blur="onBlur($event, 'typescript', 'match')"
        @on-open-code-dialog="onOpenCodeDialog('match')"
      ></CodeMirror>
      <CodeMirror
        v-if="attrState.relationActionType === 'callback'"
        v-model:modelValue="
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex][attrState.relationType]
            .onCallback
        "
        :label="'回调动作'"
        :language="'typescript'"
        :placeholder="'请输入函数体代码'"
        :content="`可用变量：'ctx'-指向 form 表单对象；'self'-指向订阅者对象；'value'-指的是发布者改变的值。（需要重新写一下描述）`"
        @on-blur="onBlur($event, 'typescript', 'onCallback')"
        @on-open-code-dialog="onOpenCodeDialog('onCallback')"
      ></CodeMirror>
      <Select
        v-model:modelValue="
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex][attrState.relationType]
            .success
        "
        :label="'匹配成功执行'"
        :placeholder="'请选择'"
        :multiple="true"
        :options="[
          { label: '清空', value: 'clear' },
          { label: '隐藏', value: 'hide' },
          { label: '显示', value: 'show' },
          { label: '获取参数', value: 'getOptions' }
        ]"
      ></Select>
      <CodeMirror
        v-model:modelValue="
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex][attrState.relationType]
            .success
        "
        :label="'成功执行函数'"
        :language="'typescript'"
        :placeholder="'请输入函数体代码'"
        @on-blur="onBlur($event, 'typescript', 'success')"
        @on-open-code-dialog="onOpenCodeDialog('success')"
      ></CodeMirror>
      <Select
        v-model:modelValue="
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex][attrState.relationType]
            .error
        "
        :label="'匹配失败执行'"
        :placeholder="'请选择'"
        :multiple="true"
        :options="[
          { label: '清空', value: 'clear' },
          { label: '隐藏', value: 'hide' },
          { label: '显示', value: 'show' },
          { label: '获取参数', value: 'getOptions' }
        ]"
      ></Select>
      <CodeMirror
        v-model:modelValue="
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex][attrState.relationType]
            .error
        "
        :label="'失败执行函数'"
        :language="'typescript'"
        :placeholder="'请输入函数体代码'"
        @on-blur="onBlur($event, 'typescript', 'error')"
        @on-open-code-dialog="onOpenCodeDialog('error')"
      ></CodeMirror>
      <Select
        v-model:modelValue="
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex][attrState.relationType]
            .finally
        "
        :label="'匹配总是执行'"
        :placeholder="'请选择'"
        :multiple="true"
        :options="[
          { label: '清空', value: 'clear' },
          { label: '隐藏', value: 'hide' },
          { label: '显示', value: 'show' },
          { label: '获取参数', value: 'getOptions' }
        ]"
      ></Select>
      <CodeMirror
        v-model:modelValue="
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex][attrState.relationType]
            .finally
        "
        :label="'执行函数'"
        :language="'typescript'"
        :placeholder="'请输入函数体代码'"
        @on-blur="onBlur($event, 'typescript', 'finally')"
        @on-open-code-dialog="onOpenCodeDialog('finally')"
      ></CodeMirror>
      <Select
        v-model:modelValue="
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].handleKey
        "
        :label="'获取值处理'"
        :placeholder="'请选择'"
        :options="[
          { label: 'datetime', value: 'datetime' },
          { label: 'date', value: 'date' },
          { label: 'time', value: 'time' }
        ]"
      ></Select>
      <CodeMirror
        v-model:modelValue="
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].handleValue
        "
        :label="'获取值处理参数'"
        :language="'json'"
        :placeholder="`请输入json`"
        :content="`对时间的处理`"
        @on-blur="onBlur($event, 'json', 'handleValue')"
        @on-open-code-dialog="onOpenCodeDialog('handleValue')"
      ></CodeMirror>
      <CodeMirror
        v-model:modelValue="
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].handleItemValue
        "
        :label="'获取值时处理函数'"
        :language="'typescript'"
        :placeholder="`请输入函数体代码`"
        :content="`可用变量：'ctx'-指向table-page对象；'params'-指当前操作的key；'r'-数组类型，包含两项分别是'当前的值'和'要设置的对象'。`"
        @on-blur="onBlur($event, 'typescript', 'handleItemValue')"
        @on-open-code-dialog="onOpenCodeDialog('handleItemValue')"
      ></CodeMirror>
      <CodeMirror
        v-model:modelValue="
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].handleItemSetValue
        "
        :label="'设置值时处理函数'"
        :language="'typescript'"
        :placeholder="`请输入函数体代码，例如：return r[0]`"
        :content="`可用变量：'ctx'-指向 tablePage 对象；'params'-指当前操作的key；'r'-原来的值，包含三项分别是'当前的值'、'所有数据'和'当前的表单对象'。`"
        @on-blur="onBlur($event, 'typescript', 'handleItemSetValue')"
        @on-open-code-dialog="onOpenCodeDialog('handleItemSetValue')"
      ></CodeMirror>
      <CodeMirror
        v-model:modelValue="designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].style"
        :label="'样式'"
        :language="'json'"
        :placeholder="'符合css规范的json'"
        @on-blur="onBlur($event, 'json', 'style')"
        @on-open-code-dialog="onOpenCodeDialog('style')"
      ></CodeMirror>
      <CodeMirror
        v-model:modelValue="
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].labelStyle
        "
        :label="'label 样式'"
        :language="'json'"
        :placeholder="'符合css规范的json'"
        @on-blur="onBlur($event, 'json', 'labelStyle')"
        @on-open-code-dialog="onOpenCodeDialog('labelStyle')"
      ></CodeMirror>
      <CodeMirror
        v-model:modelValue="designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].rules"
        :label="'校验规则'"
        :language="'json'"
        :placeholder="'符合validate的rule数组'"
        @on-blur="onBlur($event, 'json', 'rules')"
        @on-open-code-dialog="onOpenCodeDialog('rules')"
      ></CodeMirror>
      <CodeMirror
        v-model:modelValue="designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].render"
        :label="'自定义'"
        :language="'typescript'"
        :placeholder="`请输入函数体代码，例如：return r[0]`"
        @on-blur="onBlur($event, 'typescript', 'render')"
        @on-open-code-dialog="onOpenCodeDialog('render')"
      ></CodeMirror>
    </el-form>
  </div>
  <!-- 代码编辑弹窗 -->
  <CodeDialog @on-confirm="onConfirm"></CodeDialog>
</template>

<script lang="ts" setup>
import { watchEffect } from 'vue'
import { designState } from '@/views/design/use-design-config'
import { contentState } from '@/views/design/form/components/content/content'
import { attrState, useAttrMethod } from './attr'
import { injectStrict, FormItemGetOptionFromApiKey } from '@/symbols'

// 公共组件
import Input from '@/components/Input/index.vue'
import Select from '@/components/Select/index.vue'
import Radio from '@/components/Radio/index.vue'
import CodeMirror from '@/components/CodeMirror/index.vue'
import CodeDialog from '@/views/design/components/dialog/index.vue'

watchEffect(() => {
  const item = designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex]
  if (item?.subscribe.match || item?.publish.match) {
    attrState.relationActionType = 'match'
  } else if (item?.subscribe.callback || item?.publish.callback) {
    attrState.relationActionType = 'callback'
  } else {
    attrState.relationActionType = ''
  }
})

const formItemGetOptionFromApi = injectStrict(FormItemGetOptionFromApiKey)
const {
  onBlur,
  onOpenCodeDialog,
  onConfirm,
  updateFormItemOptionApi,
  onGetOptionFromVariablesChange,
  onGetOptionFromVariablesBlur,
  onChangeRelationType,
  onChangeOptionsFrom
} = useAttrMethod()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('attr-control') {
  padding: 20px;
  padding-bottom: 0;
  span {
    font-size: 14px;
    color: #1a2234;
    font-weight: 500;
  }
}
</style>
