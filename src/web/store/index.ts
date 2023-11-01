// import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  Action,
  configureStore,
  StateFromReducersMapObject
} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineReducers } from 'redux'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { ThunkAction } from 'redux-thunk'

import { rootReducer } from './reducer'
import { ThemeName } from './reducer/themeSlice'

const persistConfig = {
  // blacklist: ['counter'], // 黑名单，不持久化指定reducer的状态
  key: 'root', // 标识存储在本地存储中的数据
  storage // 持久化存储引擎，默认是localStorage
  // transforms: [myTransform], // 转换器，可以自定义转换函数来改变持久化存储的数据格式
  // whitelist: ['auth'] // 白名单，只持久化指定reducer的状态
}

// combineReducers合并reducer
const reducers = combineReducers(rootReducer)

const persistedReducer = persistReducer(persistConfig, reducers)

const initStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      }),
    // getDefaultMiddleware().concat(pokemonApi?.middleware),
    preloadedState,
    reducer: persistedReducer
  })

export type Store = ReturnType<typeof initStore>
export type RootState = StateFromReducersMapObject<typeof rootReducer>
export type AppDispatch = Store['dispatch']
export type AppThunk = ThunkAction<void, RootState, unknown, Action>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const initState = { theme: { theme: ThemeName.LIGHT } }

export const preloadState: Partial<RootState> = initState

const REDUX_STORE =
  (!(typeof window === 'undefined') && window?.REDUX_STORE) || {}

export const createWebStore = initStore(REDUX_STORE)
export const createSvrStore = initStore(preloadState)
