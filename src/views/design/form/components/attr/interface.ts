export interface AttrState {
  attrs: Attrs[]
  currentIndex: number
  formRule: FormRule
  relationType: string
  relationActionType: string
}

interface Attrs {
  name: string
}

interface FormRule {
  key: string
  page: string
  group: string
}
