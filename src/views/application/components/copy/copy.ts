import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import MenuApi from '@/api/menu'
import PageApi from '@/api/page'
import { appState } from '@/views/application/use-application-config'
import { useApplicationMethod } from '@/views/application/use-application-method'
import { CopyState } from './interface'

export const copyState: CopyState = reactive({
  copyDialog: {
    // 复制页面框
    isShow: false,
    pageName: '',
    groupId: ''
  }
})

export const useCopyMethod = () => {
  const route = useRoute()
  const { getPageListInquiry } = useApplicationMethod()

  /**
   * 打开复制页面
   */
  const onOpenCopyDialog = () => {
    copyState.copyDialog = {
      isShow: true,
      pageName: appState.dialogData.name + '_复制',
      groupId: ''
    }
  }

  /**
   * 复制页面
   */
  const onCopy = async () => {
    const name = copyState.copyDialog.pageName.replace(/ /g, '')
    if (name && name.length >= 2) {
      const res = await PageApi.pageInquiry({ id: appState.dialogData.id })
      await onAddPage(res.body.content)
    }
  }

  /**
   * 新建页面
   */
  const onAddPage = async (content: string) => {
    const param = {
      appId: <string>route.query?.appId,
      groupId: copyState.copyDialog.groupId || '0',
      name: copyState.copyDialog.pageName.replace(/ /g, ''),
      content: content
    }
    const res = await MenuApi.pageAddition(param)
    if (!copyState.copyDialog.groupId) {
      appState.pageList.push({
        id: res.body.id,
        name: copyState.copyDialog.pageName.replace(/ /g, ''),
        groupId: '0'
      })
    } else {
      await getPageListInquiry(copyState.copyDialog.groupId)
    }
    appState.defaultActive = res.body.id
    copyState.copyDialog.isShow = false
  }

  return {
    appState,
    onOpenCopyDialog,
    onCopy
  }
}
