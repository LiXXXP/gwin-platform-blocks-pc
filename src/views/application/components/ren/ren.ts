import { reactive } from 'vue'
import MenuApi from '@/api/menu'
import { appState } from '@/views/application/use-application-config'
import { RenState } from './interface'

export const renState = reactive<RenState>({
  renDialog: {
    // 重命名框
    isShow: false
  }
})

export const useRenMethod = () => {
  /**
   * 打开修改名称
   */
  const onOpenRenDialog = () => {
    renState.renDialog.isShow = true
  }

  /**
   * 重命名
   */
  const onRen = async () => {
    const name = appState.dialogData.name.replace(/ /g, '')
    if (name && name.length >= 2) {
      if (appState.dialogData.type === 'group') {
        await groupMaintenance()
      } else {
        await pageNameMaintenance()
      }
      renState.renDialog.isShow = false
    }
  }

  /**
   * 分组重命名
   */
  const groupMaintenance = async () => {
    const index = appState.dialogData.index
    const param = {
      id: appState.dialogData.id,
      name: appState.dialogData.name.replace(/ /g, '')
    }
    await MenuApi.groupMaintenance(param)
    appState.groupList[index].name = appState.dialogData.name.replace(/ /g, '')
  }

  /**
   * 页面重命名
   */
  const pageNameMaintenance = async () => {
    // 第一级页面 index
    const index: number = appState.dialogData.index

    // 分组下页面的 index，默认-1 有值情况下 大于 -1
    const i = appState.dialogData.i

    const param = {
      id: appState.dialogData.id,
      name: appState.dialogData.name.replace(/ /g, '')
    }
    await MenuApi.pageNameMaintenance(param)
    if (i < 0) {
      appState.pageList[index].name = appState.dialogData.name.replace(/ /g, '')
    } else {
      appState.groupList[index].pageList[i].name = appState.dialogData.name.replace(/ /g, '')
    }
  }

  return {
    appState,
    onOpenRenDialog,
    onRen
  }
}
