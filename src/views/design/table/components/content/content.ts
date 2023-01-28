import { reactive } from 'vue'
import { designState } from '@/views/design/use-design-config'
import { configState } from '@/views/design/table/components/config/config'

export const contentState = reactive({
  currentIndex: 0
})

export const useContentMethod = () => {
  const getCurrent = (index: number) => {
    contentState.currentIndex = index
  }
  /**
   * 复制
   */
  const onCopy = (element: any) => {
    const key = configState.list[configState.configIndex].key
    designState.tablePageConfig.tableConfig[key].push({ ...element })
    const length = designState.tablePageConfig.tableConfig[key].length
    setTimeout(() => {
      contentState.currentIndex = length - 1
    }, 0)
  }

  /**
   * 删除
   */
  const onDelete = (index: number) => {
    const key = configState.list[configState.configIndex].key
    designState.tablePageConfig.tableConfig[key].splice(index, 1)
    setTimeout(() => {
      contentState.currentIndex = -1
    }, 0)
  }

  return {
    getCurrent,
    onDelete,
    onCopy
  }
}
