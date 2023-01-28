import { useRouter } from 'vue-router'
import AppApi from '../../api/app'
import { getEntityId, getUserId } from '@/utils/auth'
import { homeState } from './use-home-config'
import { appState } from '@/views/application/use-application-config'

export const useHomeMethod = () => {
  const router = useRouter()
  /**
   * 已创建应用列表
   */
  const getApplyList = async () => {
    const param = {
      teamId: getEntityId() || '0'
    }
    const res = await AppApi.appListInquiry(param)
    homeState.applyList = res.body.dataList
  }

  /**
   * 打开新建应用弹窗
   */
  const onOpenCreateDialog = () => {
    homeState.createDialog = {
      appName: '',
      isShow: true,
      channel: '',
      entityId: ''
    }
  }

  /**
   * 新建应用
   */
  const onCreateApply = async (index: number) => {
    const name = homeState.createDialog.appName.replace(/ /g, '')
    if (name && name.length >= 2) {
      const param = {
        appName: homeState.createDialog.appName.replace(/ /g, ''),
        iconUri: `${index}.png`,
        teamId: getEntityId() || '0',
        userId: getUserId(),
        appChannel: homeState.createDialog.channel,
        appEntity: homeState.createDialog.entityId
      }
      const res = await AppApi.appAddition(param)
      homeState.applyList.push({
        id: res.body.id,
        iconUri: `${index}.png`,
        appName: homeState.createDialog.appName
      })
      homeState.createDialog.isShow = false
    }
  }

  /**
   * 打开修改应用名称弹窗
   */
  const onOpenModifyDialog = (appName: string, index: number) => {
    homeState.modifyDialog = {
      appName: appName,
      index: index,
      isShow: true,
      channel: '',
      entityId: ''
    }
  }

  /**
   * 修改应用名称
   */
  const onModifyName = async () => {
    const name = homeState.modifyDialog.appName.replace(/ /g, '')
    if (name && name.length >= 2) {
      const index: number = homeState.modifyDialog.index
      const param = {
        appName: homeState.modifyDialog.appName.replace(/ /g, ''),
        id: homeState.applyList[index].id,
        appChannel: homeState.modifyDialog.channel,
        appEntity: homeState.modifyDialog.entityId
      }
      await AppApi.appMaintenance(param)
      homeState.applyList[index].appName = homeState.modifyDialog.appName
      homeState.modifyDialog.isShow = false
    }
  }

  /**
   * 打开删除应用弹窗
   */
  const onOpenDeleteDialog = (appName: string, index: number) => {
    homeState.deleteDialog = {
      appName: appName,
      index: index,
      isShow: true,
      isChecked: false
    }
  }

  /**
   * 删除应用
   */
  const onDelete = async () => {
    if (homeState.deleteDialog.isChecked) {
      const index: number = homeState.deleteDialog.index
      const param = {
        id: homeState.applyList[index].id
      }
      await AppApi.appDeleting(param)
      homeState.applyList.splice(index, 1)
      homeState.deleteDialog.isShow = false
    }
  }

  /**
   * 跳转应用页面
   */
  const goApplicationPage = (id: string) => {
    appState.tablePageConfig = {}
    router.push({
      path: '/application',
      query: {
        appId: id
      }
    })
  }

  return {
    getApplyList,
    onOpenCreateDialog,
    onCreateApply,
    onOpenModifyDialog,
    onModifyName,
    onOpenDeleteDialog,
    onDelete,
    goApplicationPage
  }
}
