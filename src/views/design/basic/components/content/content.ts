import { reactive } from 'vue'
import { designState } from '@/views/design/use-design-config'
import { configState } from '@/views/design/basic/components/config/config'
import { ContentState } from './interface'
import { deepClone } from '@/utils'

export const contentState = reactive<ContentState>({
  currentIndex: '',
  copyKey: ''
})

export const useContentMethod = () => {
  /**
   * 复制
   */
  const onCopy = (item: any) => {
    contentState.copyKey = `${item.key}${new Date().getTime()}`
    designState.tablePageConfig[configState.config][contentState.copyKey] = deepClone(item)
    setTimeout(() => {
      contentState.currentIndex = contentState.copyKey
    }, 0)
  }

  /**
   * 删除
   */
  const onDelete = (index: any) => {
    delete designState.tablePageConfig[configState.config][index]
  }

  return {
    onDelete,
    onCopy
  }
}
