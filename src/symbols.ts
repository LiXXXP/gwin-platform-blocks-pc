import { InjectionKey, inject } from 'vue'

export declare type FormItemLabelComputedFunc = () => void
export declare type FormItemGetOptionFromApiFunc = (key: string, params?: Record<string, any>) => void

export const FormItemLabelComputedKey: InjectionKey<FormItemLabelComputedFunc> = Symbol('formItemLabelComputed')
export const FormItemGetOptionFromApiKey: InjectionKey<FormItemGetOptionFromApiFunc> =
  Symbol('formItemGetOptionFromApi')

export function injectStrict<T>(key: InjectionKey<T>, fallback?: T) {
  const resolved = inject(key, fallback)
  if (!resolved) {
    throw new Error(`Could not resolve ${key.description}`)
  }
  return resolved
}
