import { reactive } from 'vue'

export const headerState = reactive(<HeaderState>{
  appId: '',
  iconUri: '',
  appName: '',
  pageName: ''
})

interface HeaderState {
  appId: string
  iconUri: string
  appName: string
  pageName: string
}
