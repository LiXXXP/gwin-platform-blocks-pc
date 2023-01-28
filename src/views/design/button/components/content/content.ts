import { reactive } from 'vue'
import { designState } from '@/views/design/use-design-config'

export const contentState = reactive({
  currentIndex: 0
})

export const useContentMethod = () => {
  /**
   * 获取当前选择的 index
   * @param index
   */
  const getCurrent = (index: number) => {
    contentState.currentIndex = index
  }

  /**
   * 复制
   */
  const onCopy = (element: any) => {
    designState.tablePageConfig.buttonGroup.push({ ...element })
    const length = designState.tablePageConfig.buttonGroup.length
    setTimeout(() => {
      contentState.currentIndex = length - 1
    }, 0)
  }

  /**
   * 删除
   */
  const onDelete = (index: number) => {
    designState.tablePageConfig.buttonGroup.splice(index, 1)
    setTimeout(() => {
      contentState.currentIndex = -1
    }, 0)
  }
  return {
    onDelete,
    onCopy,
    getCurrent
  }
}
