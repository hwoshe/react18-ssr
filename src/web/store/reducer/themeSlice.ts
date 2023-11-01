import { createSlice } from '@reduxjs/toolkit'

export enum ThemeName {
  LIGHT = 'Light',
  DARK = 'Dark'
}

export type ThemeState = {
  theme: ThemeName
}

const initialState: ThemeState = {
  theme: ThemeName.LIGHT
}

export const themeSlice = createSlice({
  initialState,
  name: 'theme',
  reducers: {
    switchToDark(state) {
      state.theme = ThemeName.DARK
    },
    switchToLight(state) {
      state.theme = ThemeName.LIGHT
    }
  }
})

export const { switchToLight, switchToDark } = themeSlice.actions

export const themeReducer = themeSlice.reducer
