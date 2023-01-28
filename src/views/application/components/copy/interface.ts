export interface CopyState {
  copyDialog: CopyDialog
}

interface CopyDialog {
  isShow: boolean
  pageName: string
  groupId: string
}
