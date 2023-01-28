import { useRoute, useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import MenuApi from '@/api/menu'
import PageApi from '@/api/page'
import { appState } from '@/views/application/use-application-config'
import { headerState } from '@/views/common/header/header'
import { GroupList } from './interface'

/**
 * @returns
 */
export const useApplicationMethod = () => {
  const route = useRoute()
  const router = useRouter()

  /**
   * 获取菜单分组列表
   */
  const getGroupListInquiry = async () => {
    const param = {
      appId: <string>route.query?.appId
    }
    const res = await MenuApi.groupListInquiry(param)
    headerState.appName = res.body.appName
    headerState.iconUri = res.body.iconUri
    Cookies.set('adminChannel', res.body.appChannel)
    Cookies.set('adminEntityId', res.body.appEntity)
    appState.groupList = res.body.dataList?.map((item: GroupList) => {
      return {
        ...item,
        pageList: []
      }
    })
  }

  /**
   * 获取菜单页面列表
   */
  const getPageListInquiry = async (groupId: string) => {
    const param = {
      appId: <string>route.query?.appId,
      groupId: groupId
    }
    const res = await MenuApi.pageListInquiry(param)
    if (groupId === '0') {
      appState.pageList = res.body.dataList
    } else {
      const index = appState.groupList.findIndex((item) => item.id === groupId)
      appState.groupList[index].pageList = res.body.dataList
    }

    // 所有页面列表 去重数组
    appState.tabelPageList.push(...res.body.dataList)
    const nArr = appState.tabelPageList.filter((element, index, self) => {
      return self.findIndex((x) => x.id === element.id) === index
    })
    appState.tabelPageList = nArr
  }

  /**
   * 点击分组
   */
  const onClickGroup = async (groupId: string) => {
    await getPageListInquiry(groupId)
  }

  /**
   * 点击页面
   */
  const onClickPage = async (id: string) => {
    const res = await PageApi.pageInquiry({ id: id })
    if (res.body.content) {
      appState.tablePageConfig = JSON.parse(res.body.content)
    } else {
      appState.tablePageConfig = {}
    }
    appState.pageCurrentId = id
  }

  /**
   * 跳转设计页面
   */
  const goDesignPage = () => {
    router.push({
      path: '/design/basic',
      query: {
        id: appState.dialogData.id
      }
    })
  }

  return {
    getGroupListInquiry,
    getPageListInquiry,
    onClickGroup,
    onClickPage,
    goDesignPage
  }
}
