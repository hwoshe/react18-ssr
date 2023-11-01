import something from '@web/assets/images/404.png'
import useStyles from 'isomorphic-style-loader-react18/useStyles'
import React, { FC, ReactElement } from 'react'

import styles from './index.module.css'

const NotFound: FC = (): ReactElement => {
  useStyles(styles)
  return (
    <div className={styles['not-found']}>
      <img src={something} alt="404.png" />
      <h1>Oops, looks like the page is lost.</h1>
      <p className="sub-header text-block-narrow">
        This is not a fault, just an accident that was not intentional.
      </p>
    </div>
  )
}
export default NotFound
