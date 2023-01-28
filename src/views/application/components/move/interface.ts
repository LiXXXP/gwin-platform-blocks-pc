export interface MoveState {
  moveDialog: MoveDialog
  groupList: GroupList[]
}

interface MoveDialog {
  isShow: boolean
  appId: string
  groupId: string
}

interface GroupList {
  appId?: string
  id: string
  name: string
  pageCount: number
  parentId?: string
  sortNo?: number
}
