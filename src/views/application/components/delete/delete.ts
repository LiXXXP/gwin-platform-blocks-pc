import { reactive } from 'vue'
import MenuApi from '@/api/menu'
import { appState } from '@/views/application/use-application-config'
import { useApplicationMethod } from '@/views/application/use-application-method'
import { DeleteState } from './interface'

export const deleteState: DeleteState = reactive({
  deleteDialog: {
    // 删除框
    isShow: false,
    isChecked: false
  }
})

export const useDeleteMethod = () => {
  /**
   * 页面列表
   */
  const { getPageListInquiry } = useApplicationMethod()

  /**
   * 打开删除弹窗
   */
  const onOpenDeleteDialog = () => {
    deleteState.deleteDialog = {
      isShow: true,
      isChecked: false
    }
  }

  /**
   * 删除
   */
  const onDelete = async () => {
    if (deleteState.deleteDialog.isChecked) {
      if (appState.dialogData.type === 'group') {
        await groupDeleting()
      } else {
        await pageDeleting()
      }
      deleteState.deleteDialog.isShow = false
    }
  }

  /**
   * 分组删除
   */
  const groupDeleting = async () => {
    const param = {
      id: appState.dialogData.id
    }
    await MenuApi.groupDeleting(param)
    appState.groupList.splice(appState.dialogData.index, 1)
    await getPageListInquiry('0')
  }

  /**
   * 页面删除
   */
  const pageDeleting = async () => {
    // 第一级页面 index
    const index: number = appState.dialogData.index

    // 分组下页面的 index，默认-1 有值情况下 大于 -1
    const i = appState.dialogData.i

    const param = {
      id: appState.dialogData.id
    }
    await MenuApi.pageDeleting(param)
    if (i < 0) {
      appState.pageList.splice(index, 1)
    } else {
      appState.groupList[index].pageList.splice(i, 1)
    }
    appState.tablePageConfig = {}
  }

  return {
    appState,
    onOpenDeleteDialog,
    onDelete
  }
}
