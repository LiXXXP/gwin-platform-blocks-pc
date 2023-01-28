import { reactive } from 'vue'
import { designState } from '@/views/design/use-design-config'
import { contentState } from '@/views/design/table/components/content/content'
import { navState } from '@/views/common/nav/nav'
import { AttrState } from './interface'

export const tableAttrState = reactive<AttrState>({
  variableType: 'var',
  otherConfig: [{}]
})

export const useAttrMethod = () => {
  /**
   * blur
   * @param val
   * @param lang
   * @param key
   */
  const onBlur = (val: string, lang: string, key: string) => {
    const index = contentState.currentIndex
    if (val) {
      if (lang === 'json') {
        try {
          designState.tablePageConfig.tableConfig.columns[index][key] = JSON.parse(val)
        } catch (error) {
          designState.tablePageConfig.tableConfig.columns[index][key] = val
        }
      } else {
        if (val.includes(')()')) {
          designState.tablePageConfig.tableConfig.columns[index][key] = val
        } else {
          designState.tablePageConfig.tableConfig.columns[index][key] = `(${val})()`
        }
      }
    } else {
      delete designState.tablePageConfig.tableConfig.columns[index][key]
    }
  }

  /**
   * 其他配置
   * @param val
   */
  const onBlurConfig = (val: any) => {
    clearOtherConfigKey()
    if (val) {
      try {
        designState.tablePageConfig.tableConfig.columns[contentState.currentIndex] = Object.assign(
          designState.tablePageConfig.tableConfig.columns[contentState.currentIndex],
          JSON.parse(val)
        )
      } catch (error) {
        designState.tablePageConfig.tableConfig.columns[contentState.currentIndex] = Object.assign(
          designState.tablePageConfig.tableConfig.columns[contentState.currentIndex],
          val
        )
      }
    }
  }

  /**
   * 先清除其他配置的参数
   */
  const clearOtherConfigKey = () => {
    const columns = designState.tablePageConfig.tableConfig?.columns
    for (const i in columns) {
      for (const k in columns[i]) {
        if (!navState.columnItemkeys.hasOwnProperty(k)) {
          delete columns[i][k]
        }
      }
    }
  }
  return {
    onBlur,
    onBlurConfig
  }
}
