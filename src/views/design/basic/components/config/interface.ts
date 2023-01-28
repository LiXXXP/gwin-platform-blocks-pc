export interface ConfigState {
  config: string
  list: List[]
}

interface List {
  name: string
  key: string
  className: string
}
