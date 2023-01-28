import { nextTick, reactive } from 'vue'
import { FormItem } from '@gwin/admin-ui'
import { designState } from '@/views/design/use-design-config'
import { attrState } from '@/views/design/form/components/attr/attr'

export const contentState = reactive({
  currentIndex: 0
})

export const adFormRef = reactive<HTMLInputElement | any>({})

export const useContentMethod = () => {
  /**
   * 拖动结束
   */
  const onEnd = (refIndex: string) => {
    nextTick(() => {
      contentState.currentIndex = -1
      adFormRef[refIndex].contentState.currentIndex = -1
    })
  }

  /**
   * 获取当前index
   * @param index
   */
  const getCurrent = (index: number) => {
    contentState.currentIndex = index
    nextTick(() => {
      attrState.currentIndex = 0
    })
  }

  /**
   * 复制
   */
  const onCopy = (element: FormItem, refIndex: string) => {
    designState.tablePageConfig.forms[attrState.formRule.key]?.push({ ...element })
    const length = designState.tablePageConfig.forms[attrState.formRule.key]?.length
    setTimeout(() => {
      adFormRef[refIndex].contentState.currentIndex = length - 1
      contentState.currentIndex = length - 1
    }, 0)
  }

  /**
   * 删除
   */
  const onDelete = (index: number, refIndex: string) => {
    designState.tablePageConfig.forms[attrState.formRule.key]?.splice(index, 1)
    nextTick(() => {
      contentState.currentIndex = -1
      adFormRef[refIndex].contentState.currentIndex = -1
    })
    if (!designState.tablePageConfig.forms[attrState.formRule.key]?.length) {
      attrState.currentIndex = 1
    }
  }
  return {
    adFormRef,
    onEnd,
    onDelete,
    onCopy,
    getCurrent
  }
}
