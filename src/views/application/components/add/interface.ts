export interface AddState {
  addDialog: AddDialog
}

interface AddDialog {
  isShow: boolean
  type: string
  name: string
  groupId: string
}
