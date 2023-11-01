import App from '@web/pages/App'
import React, { FC, StrictMode } from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom/server'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import { createSvrStore } from '@/web/store'

const persistor = persistStore(createSvrStore)

type PropsTypes = {
  location: string
}

const EntryServer: FC<PropsTypes> = ({ location }) => {
  return (
    <StrictMode>
      <StaticRouter location={location}>
        <Provider store={createSvrStore}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
        <App />
      </StaticRouter>
    </StrictMode>
  )
}
export default EntryServer
