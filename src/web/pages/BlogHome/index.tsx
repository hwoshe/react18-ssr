import picture from '@web/assets/images/picture.jpg'
import { Tag } from '@web/components/index'
import useStyles from 'isomorphic-style-loader-react18/useStyles'
import React, { FC, ReactElement } from 'react'
import { Link } from 'react-router-dom'

import styles from './index.module.css'

const BlogHome: FC = (): ReactElement => {
  useStyles(styles)

  return (
    <div className={styles['blog-home']}>
      <div className={styles['blog-home_left']}>
        <h1 className={styles['h4 mb-4]']}>Latest 1212</h1>
        <ul>
          <li>
            <Link to="./details">
              <img className={styles.rounded} src={picture} alt="" />
              <div className={styles['note-box']}>
                <Tag text="Lifestyle" color="error" />
                <h5 className={styles.title}>
                  Social guides the way in 2022 app performance report
                </h5>
                <p className={styles.description}>
                  Speedily say has suitable disposal add boy. On forth doubt
                  miles of child. Exercise joy man children rejoiced.
                </p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles['blog-home_right']}>
        <h5 className={styles['card-title mb-0']}>Recent post</h5>
      </div>
    </div>
  )
}
export default BlogHome
