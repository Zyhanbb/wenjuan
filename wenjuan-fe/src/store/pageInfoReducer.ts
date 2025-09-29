import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'

export type PageInfoType = {
  title: string
  desc?: string
  js?: string
  css?: string
  isPublished?: boolean
  enterFrom?: 'confirm' | 'skip' // 新增字段
  llm?: string
}

const INIT_STATE: PageInfoType = {
  title: '',
  desc: '',
  js: '',
  css: '',
}

const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    resetPageInfo: (state: PageInfoType, action: PayloadAction<PageInfoType>) => {
      return action.payload // 只覆盖传入的字段
    },

    // 修改标题
    changePageTitle: produce((draft: PageInfoType, action: PayloadAction<string>) => {
      draft.title = action.payload
    }),

    changeEnterFrom: produce((draft: PageInfoType, action: PayloadAction<'confirm' | 'skip'>) => {
      draft.enterFrom = action.payload
    }),

    changeLLM: produce((draft: PageInfoType, action: PayloadAction<string>) => {
      draft.llm = action.payload
    }),
  },
})

export const { resetPageInfo, changePageTitle, changeEnterFrom, changeLLM } = pageInfoSlice.actions

export default pageInfoSlice.reducer
