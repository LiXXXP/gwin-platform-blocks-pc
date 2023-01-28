export interface AddState {
  addDialog: AddDialog
}

interface AddDialog {
  isShow: boolean
  name: string
  prop: string
}
