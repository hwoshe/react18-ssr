import useStyles from 'isomorphic-style-loader-react18/useStyles'
import React from 'react'

import styles from './index.module.css'

const Footer = () => {
  useStyles(styles)
  return (
    <div className={styles.footer}>
      <ul>
        <li>About</li>
        <li />
        <li />
        <li />
      </ul>
      <p className="">
        ©2022
        <a href="/"> Webestica </a>
        All rights reserved.
      </p>
    </div>
  )
}
export default Footer
