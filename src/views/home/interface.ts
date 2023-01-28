export interface HomeState {
  applyList: ApplyList[]
  createDialog: CreateDialog
  modifyDialog: ModifyDialog
  deleteDialog: DeleteDialog
}

export interface ApplyList {
  id: string
  appName: string
  iconUri: string
}

interface CreateDialog {
  isShow: boolean
  appName: string
  entityId: string
  channel: string
}

interface ModifyDialog {
  isShow: boolean
  appName: string
  index: number
  entityId: string
  channel: string
}

interface DeleteDialog {
  isShow: boolean
  isChecked: boolean
  appName: string
  index: number
}
