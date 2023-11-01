import { combineReducers } from '@reduxjs/toolkit'

import { themeReducer } from './themeSlice'

export const rootReducer = {
  theme: themeReducer
}

export const createReducer = () => {
  return combineReducers(rootReducer)
}
