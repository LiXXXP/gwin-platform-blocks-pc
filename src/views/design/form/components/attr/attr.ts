import { reactive } from 'vue'
import { FormItem } from '@gwin/admin-ui'
import { designState } from '@/views/design/use-design-config'
import { contentState } from '@/views/design/form/components/content/content'
import { dialogState } from '@/views/design/components/dialog/dialog'
import { AttrState } from './interface'

export const attrState = reactive<AttrState>({
  attrs: [
    {
      name: '控件属性'
    },
    {
      name: '表单属性'
    }
  ],
  currentIndex: 1,
  formRule: {
    // 表单属性
    key: '',
    page: '',
    group: ''
  },
  relationType: 'subscribe',
  relationActionType: ''
})

export const useAttrMethod = () => {
  /**
   * 切换属性
   */
  const onSwitchAttr = (index: number) => {
    if (!designState.tablePageConfig.forms[attrState.formRule.key]?.length && index === 0) {
      return
    }
    attrState.currentIndex = index
  }

  /**
   * 删除表单
   */
  const onDelete = () => {
    delete designState.tablePageConfig.forms[attrState.formRule.key]
    attrState.formRule.key = ''
  }

  /**
   * 代码编辑器 blur 赋值
   * @param val
   * @param lang
   * @param key
   */
  const onBlur = (val: string, lang: string, key: string) => {
    if (val) {
      if (lang === 'json') {
        try {
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex][key] = JSON.parse(val)
        } catch (error) {
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex][key] = val
        }
      } else {
        if (val.includes(')()')) {
          if (key === 'match' || key === 'onCallback' || key === 'success' || key === 'error' || key === 'finally') {
            designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex][
              attrState.relationType
            ][key] = val
          } else {
            designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex][key] = val
          }
        } else {
          if (key === 'match' || key === 'onCallback' || key === 'success' || key === 'error' || key === 'finally') {
            designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex][
              attrState.relationType
            ][key] = `(${val})()`
          } else {
            designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex][key] = `(${val})()`
          }
        }
      }
    } else {
      if (key === 'success' || key === 'error' || key === 'finally') {
        designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex][attrState.relationType][
          key
        ] = []
      } else {
        if (key === 'data') {
          designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex][key] = {}
        } else {
          delete designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex][key]
        }
      }
    }
  }

  /**
   * 打开 代码编辑器弹窗
   * @param key
   */
  const onOpenCodeDialog = (key: string) => {
    dialogState.key = key
  }

  /**
   * 代码编辑器弹窗 确认
   * @param val
   * @param key
   */
  const onConfirm = (val: any, key: string) => {
    if (key === 'match' || key === 'onCallback' || key === 'success' || key === 'error' || key === 'finally') {
      designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex][attrState.relationType][
        key
      ] = val
    } else {
      designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex][key] = val
    }
  }

  /**
   * 接口更新数据
   * @param value
   */
  function updateFormItemOptionApi(value: string) {
    const getOptionsFromApi =
      designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].getOptionsFromApi
    const api = designState.tablePageConfig.apis[value]
    designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].getOptionsFromApi =
      Object.assign(getOptionsFromApi, api)
  }

  /**
   * 获取变量
   */
  const onGetOptionFromVariablesChange = (val: string) => {
    const item: FormItem = designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex]
    const variableConfig = designState.tablePageConfig.variables[val]
    if (variableConfig && item.getOptionsFromVariables) {
      const variable = variableConfig.value
      const { valueKey = 'value', labelKey = 'label' } = item.getOptionsFromVariables
      item.data.options = variable.map((i: any) => ({ ...i, value: i[valueKey], label: i[labelKey] }))
    }
  }

  /**
   * value key
   * label key
   */
  const onGetOptionFromVariablesBlur = () => {
    const item: FormItem = designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex]
    if (item.getOptionsFromVariables) {
      const variableKey = item.getOptionsFromVariables?.variableKey
      if (variableKey) {
        const variableConfig = designState.tablePageConfig.variables[variableKey]
        if (variableConfig) {
          const variable = variableConfig.value
          const { valueKey = 'value', labelKey = 'label' } = item.getOptionsFromVariables
          item.data.options = variable?.map((i: any) => ({ ...i, value: i[valueKey], label: i[labelKey] }))
        }
      }
    }
  }

  /**
   * 关联方式 发生改变
   */
  const onChangeRelationType = (val: string) => {
    if (val === 'publish') {
      designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].subscribe = {}
    } else {
      designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].publish = {}
    }
  }

  /**
   *
   */
  const onChangeOptionsFrom = () => {
    designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].getOptionsFromApi = {}
    designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].getOptionsFromVariables = {}
    designState.tablePageConfig.forms[attrState.formRule.key][contentState.currentIndex].getOptionsFromParent = {}
  }

  return {
    onSwitchAttr,
    onDelete,
    onBlur,
    onOpenCodeDialog,
    onConfirm,
    updateFormItemOptionApi,
    onGetOptionFromVariablesChange,
    onGetOptionFromVariablesBlur,
    onChangeRelationType,
    onChangeOptionsFrom
  }
}
