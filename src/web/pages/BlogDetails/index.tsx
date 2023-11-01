import picture from '@web/assets/images/picture.jpg'
import { Tag } from '@web/components/index'
import useStyles from 'isomorphic-style-loader-react18/useStyles'
import React, { FC, ReactElement } from 'react'

import styles from './index.module.css'

const BlogDetails: FC = (): ReactElement => {
  useStyles(styles)
  return (
    <div className={styles['blog-details']}>
      <img className={styles.rounded} src={picture} alt="" />
      <div className={styles['note-box']}>
        <a href="/">
          <Tag text="Lifestyle" color="error" />
        </a>
        <h1 className={styles.title}>
          New comment moderation and support features, including live chat.
        </h1>
        <p className={styles.description}>
          Speedily say has suitable disposal add boy. On forth doubt miles of
          child. Exercise joy man children rejoiced.
        </p>
      </div>
    </div>
  )
}

export default BlogDetails
