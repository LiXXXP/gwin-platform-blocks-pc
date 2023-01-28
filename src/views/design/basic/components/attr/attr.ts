import { reactive } from 'vue'
import { designState } from '@/views/design/use-design-config'
import { configState } from '@/views/design/basic/components/config/config'
import { contentState } from '@/views/design/basic/components/content/content'
import { VarType } from './interface'

export const varType = reactive<VarType>({
  type: 'api'
})

export const useAttrMethod = () => {
  /**
   * key 变化
   * @param val
   */
  const onChange = (val: string | number) => {
    if (contentState.copyKey) {
      const value = designState.tablePageConfig[configState.config][contentState.copyKey]
      designState.tablePageConfig[configState.config][val] = value
      delete designState.tablePageConfig[configState.config][contentState.copyKey]
    } else {
      const value = designState.tablePageConfig[configState.config][contentState.currentIndex]
      designState.tablePageConfig[configState.config][val] = value
      delete designState.tablePageConfig[configState.config][contentState.currentIndex]
    }
    contentState.currentIndex = val
  }

  /**
   * 代码编辑器 blur 事件改变
   */
  const onBlur = (val: string, lang: string, obj: string, key: string) => {
    const index = contentState.currentIndex
    if (val) {
      if (lang === 'json') {
        try {
          designState.tablePageConfig[obj][index][key] = JSON.parse(val)
        } catch (error) {
          designState.tablePageConfig[obj][index][key] = val
        }
      } else {
        if (val.includes(')()')) {
          designState.tablePageConfig[obj][index][key] = val
        } else {
          designState.tablePageConfig[obj][index][key] = `(${val})()`
        }
      }
    } else {
      delete designState.tablePageConfig[obj][index][key]
    }
  }
  return { onChange, onBlur }
}
