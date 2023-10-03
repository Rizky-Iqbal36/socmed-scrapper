import { EFlag } from '@root/interfaces/enum'

/* ---------------------------- Typescript Helper --------------------------- */
export type Await<T> = T extends PromiseLike<infer U> ? U : T
export interface IObject {
  [key: string]: any
}
export type TUnionToObjConverter<T extends string> = {
  [key in T]: key
}
export type TObjToUnionConverter<T> = T[keyof T]
export type IObjMerger<T> = IObject & T
export type RequiredFieldsOnly<T> = {
  [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K]
}
export type PickPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type PartialExcept<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>
/* ------------------------ END of Typescript Helper ------------------------ */

/* ----------------------------- Message Related ---------------------------- */
export interface ILocalizeMessage {
  key: string
  vars?: object
  lang?: string
}
export interface IMessageOption {
  localeMessage?: ILocalizeMessage
  message?: string
}
/* ------------------------- END of Message Related ------------------------- */

export interface IDetailException extends IObject {
  flag: EFlag
}