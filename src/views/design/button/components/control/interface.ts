export interface ControlState {
  list: List[]
}

interface List {
  name: string
  key: string
  url: string
  text: boolean
  type: string
  style?: Record<string, any>
}
