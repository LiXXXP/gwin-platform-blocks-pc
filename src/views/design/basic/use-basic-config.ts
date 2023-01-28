import { reactive } from 'vue'
import { VarType } from './interface'

export const varType = reactive<VarType>({
  type: 'api'
})
