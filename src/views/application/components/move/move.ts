import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import MenuApi from '@/api/menu'
import { homeState } from '@/views/home/use-home-config'
import { useHomeMethod } from '@/views/home/use-home-method'
import { useApplicationMethod } from '@/views/application/use-application-method'
import { appState } from '@/views/application/use-application-config'
import { MoveState } from './interface'

export const moveState: MoveState = reactive({
  moveDialog: {
    // 移动页面框
    isShow: false,
    appId: '',
    groupId: ''
  },
  groupList: []
})

export const useMoveMethod = () => {
  const route = useRoute()
  /**
   * 页面列表
   */
  const { getPageListInquiry } = useApplicationMethod()
  /**
   * 应用列表
   */
  const { getApplyList } = useHomeMethod()

  /**
   * 打开移动页面
   */
  const onOpenMoveDialog = async () => {
    moveState.moveDialog = {
      isShow: true,
      appId: <string>route.query?.appId,
      groupId: ''
    }
    await Promise.all([getApplyList(), onChangeApp(moveState.moveDialog.appId)])
  }

  /**
   * 移动页面
   */
  const onMove = async () => {
    // 第一级页面 index
    const index: number = appState.dialogData.index

    // 分组下页面的 index，默认-1 有值情况下 大于 -1
    const i = appState.dialogData.i

    if (moveState.moveDialog.appId) {
      const param = {
        id: appState.dialogData.id,
        appId: moveState.moveDialog.appId,
        groupId: moveState.moveDialog.groupId || '0',
        parentId: '0',
        sortNo: 0
      }
      await MenuApi.pageMoveMaintenance(param)
      if (i < 0) {
        appState.pageList.splice(index, 1)
      } else {
        if (appState.groupList[index].pageList[i].groupId !== moveState.moveDialog.groupId) {
          appState.groupList[index].pageList.splice(i, 1)
        }
      }
      await getPageListInquiry(moveState.moveDialog.groupId || '0')
      appState.defaultActive = appState.dialogData.id
      moveState.moveDialog.isShow = false
    }
  }

  /**
   * 选择应用后，获取此应用下的分组
   */
  const onChangeApp = async (val: string) => {
    const param = {
      appId: val
    }
    const res = await MenuApi.groupListInquiry(param)
    moveState.groupList = res.body.dataList
  }

  return {
    homeState,
    appState,
    onOpenMoveDialog,
    onMove,
    onChangeApp
  }
}
