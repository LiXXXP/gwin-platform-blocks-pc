import { TablePageConfig } from '@gwin/admin-ui'
export interface AppState {
  defaultActive: string
  groupList: GroupList[]
  pageList: PageList[]
  dialogData: DialogData
  tablePageConfig: TablePageConfig
  tabelPageList: PageList[]
  pageCurrentId: string
}

export interface GroupList {
  appId?: string
  id: string
  name: string
  pageCount: number
  parentId?: string
  sortNo?: number
  pageList?: PageList[] | any
}

interface PageList {
  appId?: string
  groupId: string
  id: string
  name: string
  parentId?: string
  sortNo?: number
}

interface DialogData {
  id: string
  type: string
  index: number
  i: number
  name: string
}
