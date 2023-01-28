import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import MenuApi from '@/api/menu'
import { getUserId } from '@/utils/auth'
import { appState } from '@/views/application/use-application-config'
import { AddState } from './interface'

export const addState = reactive<AddState>({
  addDialog: {
    isShow: false,
    type: '',
    name: '', // 新建页面名称
    groupId: '' // 选择的分组id
  }
})

export const useAddMethod = () => {
  const route = useRoute()

  /**
   * 打开新建菜单页面弹窗
   */
  const onOpenAddDialog = (type: string) => {
    addState.addDialog = {
      isShow: true,
      type: type,
      name: '',
      groupId: ''
    }
  }

  /**
   * 新建
   */
  const onAdd = async () => {
    if (addState.addDialog.name) {
      if (addState.addDialog.type === 'group') {
        await onAddGroup()
      } else {
        await onAddPage()
      }
    }
  }

  /**
   * 新建分组
   */
  const onAddGroup = async () => {
    const name = addState.addDialog.name.replace(/ /g, '')
    if (name && name.length >= 2) {
      const param = {
        userId: getUserId(),
        appId: <string>route.query?.appId,
        name: addState.addDialog.name.replace(/ /g, '')
      }
      const res = await MenuApi.groupAddition(param)
      appState.groupList.push({
        id: res.body.id,
        name: addState.addDialog.name,
        pageCount: 0,
        pageList: []
      })
      addState.addDialog.isShow = false
    }
  }

  /**
   * 新建页面
   */
  const onAddPage = async () => {
    const name = addState.addDialog.name.replace(/ /g, '')
    if (name && name.length >= 2) {
      const param = {
        appId: <string>route.query?.appId,
        groupId: addState.addDialog.groupId || '0',
        name: addState.addDialog.name.replace(/ /g, '')
      }
      const res = await MenuApi.pageAddition(param)
      const page = {
        id: res.body.id,
        name: addState.addDialog.name,
        groupId: addState.addDialog.groupId || '0'
      }
      if (addState.addDialog.groupId) {
        const index = appState.groupList.findIndex((item) => item.id === addState.addDialog.groupId)
        appState.groupList[index].pageList?.push(page)
      } else {
        appState.pageList.push(page)
      }
      appState.defaultActive = res.body.id
      addState.addDialog.isShow = false
    }
  }

  return {
    appState,
    onOpenAddDialog,
    onAdd
  }
}
