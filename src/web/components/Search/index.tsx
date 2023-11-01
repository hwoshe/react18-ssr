import useStyles from 'isomorphic-style-loader-react18/useStyles'
import React from 'react'

import styles from './index.module.css'

const Search = () => {
  useStyles(styles)
  return (
    <div className={styles.search}>
      <button type="button" className={styles['search-button']}>
        <svg width="20" height="20" viewBox="0 0 20 20">
          <path
            d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
            stroke="currentColor"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={styles['search-placeholder']}>Search</span>
        <span>
          <kbd>
            <svg width="15" height="15">
              <path
                d="M4.505 4.496h2M5.505 5.496v5M8.216 4.496l.055 5.993M10 7.5c.333.333.5.667.5 1v2M12.326 4.5v5.996M8.384 4.496c1.674 0 2.116 0 2.116 1.5s-.442 1.5-2.116 1.5M3.205 9.303c-.09.448-.277 1.21-1.241 1.203C1 10.5.5 9.513.5 8V7c0-1.57.5-2.5 1.464-2.494.964.006 1.134.598 1.24 1.342M12.553 10.5h1.953"
                strokeWidth="1.2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="square"
              />
            </svg>
          </kbd>
          <kbd>K</kbd>
        </span>
      </button>
    </div>
  )
}

export default Search
