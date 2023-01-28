export interface ControlState {
  list: List[]
}

interface List {
  name: string
  url: string
  type: string
  data: Record<string, any>
  required: boolean
}
