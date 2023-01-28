export interface ConfigState {
  list: List[]
  configIndex: number
}

interface List {
  name: string
  key: string
  className: string
}
