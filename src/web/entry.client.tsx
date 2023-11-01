import App from '@web/pages/App'
import StyleContext from 'isomorphic-style-loader-react18/StyleContext'
import React, { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import { createWebStore } from '@/web/store/index'

const persistor = persistStore(createWebStore)

const insertCss = (...styles) => {
  // eslint-disable-next-line no-underscore-dangle
  const removeCss = styles.map((style) => style._insertCss())
  return () => removeCss.forEach((dispose) => dispose())
}

const EntryClient = (
  <StrictMode>
    <BrowserRouter>
      <StyleContext.Provider value={{ insertCss }}>
        <Provider store={createWebStore}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </StyleContext.Provider>
    </BrowserRouter>
  </StrictMode>
)

const container = document.getElementById('root') as HTMLElement

if (IsSSRMode) {
  hydrateRoot(container, EntryClient)
} else {
  const root = createRoot(container)
  root.render(EntryClient)
}
