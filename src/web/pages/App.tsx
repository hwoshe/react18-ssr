import useStyles from 'isomorphic-style-loader-react18/useStyles'
import React from 'react'

import BaseRouter from '../router'
import styles from './App.css'

const App = () => {
  useStyles(styles)
  return <BaseRouter />
}

export default App
