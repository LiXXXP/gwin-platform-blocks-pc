import { nextTick, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { FormItem, LabelType, FormItemType } from '@gwin/admin-ui'
import { designState } from '@/views/design/use-design-config'
import { attrState } from '@/views/design/form/components/attr/attr'
import { contentState, useContentMethod } from '@/views/design/form/components/content/content'
import { ControlState } from './interface'
import { generateUUID } from '@/utils/index'

const { adFormRef } = useContentMethod()

export const controlState = reactive<ControlState>({
  list: [
    {
      name: '输入框',
      type: FormItemType.INPUT,
      url: new URL(`../../../../../assets/img/form/icon-input.png`, import.meta.url).href,
      data: {},
      required: false
    },
    {
      name: '数字输入框',
      type: FormItemType.INPUTNUMBER,
      url: new URL(`../../../../../assets/img/form/icon-number.png`, import.meta.url).href,
      data: {},
      required: false
    },
    {
      name: '单选框',
      type: FormItemType.RADIO,
      url: new URL(`../../../../../assets/img/form/icon-radio.png`, import.meta.url).href,
      data: {},
      required: false
    },
    {
      name: '多选框',
      type: FormItemType.CHECKBOX,
      url: new URL(`../../../../../assets/img/form/icon-checkbox.png`, import.meta.url).href,
      data: {},
      required: false
    },
    {
      name: '选择器',
      type: FormItemType.SELECT,
      url: new URL(`../../../../../assets/img/form/icon-select.png`, import.meta.url).href,
      data: {},
      required: false
    },
    {
      name: '级联选择器',
      type: FormItemType.CASCADER,
      url: new URL(`../../../../../assets/img/form/icon-cascader.png`, import.meta.url).href,
      data: {},
      required: false
    },
    {
      name: '虚拟选择器',
      type: FormItemType.SELECTV2,
      url: new URL(`../../../../../assets/img/form/icon-virt-select.png`, import.meta.url).href,
      data: {
        options: []
      },
      required: false
    },
    {
      name: '日期选择器',
      type: FormItemType.DATEPICKER,
      url: new URL(`../../../../../assets/img/form/icon-date.png`, import.meta.url).href,
      data: {},
      required: false
    },
    {
      name: '时间选择器',
      type: FormItemType.TIMEPICKER,
      url: new URL(`../../../../../assets/img/form/icon-time-picker.png`, import.meta.url).href,
      data: {},
      required: false
    },
    {
      name: '时间选择',
      type: FormItemType.TIMESELECT,
      url: new URL(`../../../../../assets/img/form/icon-time-select.png`, import.meta.url).href,
      data: {},
      required: false
    },
    {
      name: '评分',
      type: FormItemType.RATE,
      url: new URL(`../../../../../assets/img/form/icon-rate.png`, import.meta.url).href,
      data: {},
      required: false
    },
    {
      name: '滑块',
      type: FormItemType.SLIDER,
      url: new URL(`../../../../../assets/img/form/icon-slider.png`, import.meta.url).href,
      data: {},
      required: false
    },
    {
      name: '开关',
      type: FormItemType.SWITCH,
      url: new URL(`../../../../../assets/img/form/icon-switch.png`, import.meta.url).href,
      data: {},
      required: false
    },
    {
      name: '上传器',
      type: FormItemType.UPLOAD,
      url: new URL(`../../../../../assets/img/form/icon-upload.png`, import.meta.url).href,
      data: {},
      required: false
    },
    {
      name: '穿梭框',
      type: FormItemType.TRANSFER,
      url: new URL(`../../../../../assets/img/form/icon-transfer.png`, import.meta.url).href,
      data: {},
      required: false
    },
    {
      name: '自定义渲染',
      type: FormItemType.RENDER,
      url: new URL(`../../../../../assets/img/form/icon-custom.png`, import.meta.url).href,
      data: {},
      required: false
    }
  ]
})

export const useControlMethod = () => {
  /**
   * 控件 拖拽结束
   */
  const onEnd = (evt: any) => {
    if (attrState.formRule.key) {
      designState.tablePageConfig.forms[attrState.formRule.key].push(<FormItem>{
        key: generateUUID(),
        label: '',
        labelType: LabelType.NORMAL,
        type: controlState.list[evt.oldIndex].type,
        data: controlState.list[evt.oldIndex].data,
        required: controlState.list[evt.oldIndex].required,
        subscribe: {},
        publish: {},
        getOptionsFromApi: {},
        getOptionsFromVariables: {},
        getOptionsFromParent: {}
      })
      nextTick(() => {
        attrState.currentIndex = 0
        const length = designState.tablePageConfig.forms[attrState.formRule.key].length
        contentState.currentIndex = length - 1
        adFormRef[attrState.formRule.key].contentState.currentIndex = length - 1
      })
    } else {
      ElMessage.error('请先选择一个表单，再进行拖拽')
    }
  }

  return {
    onEnd
  }
}
