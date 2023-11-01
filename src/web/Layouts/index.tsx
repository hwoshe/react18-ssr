import useStyles from 'isomorphic-style-loader-react18/useStyles'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import Footer from './Footer'
import Header from './Header'
import styles from './index.module.css'

const Layouts: FC = () => {
  useStyles(styles)
  return (
    <>
      <Header />
      <div className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Layouts
