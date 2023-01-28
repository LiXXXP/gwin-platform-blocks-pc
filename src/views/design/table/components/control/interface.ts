export interface ControlState {
  list: List[]
}

interface List {
  name: string
  url: string
  key: string
  text: boolean
  type: string
  interactionType: string
}
