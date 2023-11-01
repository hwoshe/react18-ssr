import './index.css'

import React from 'react'

type PropsTypes = {
  text?: string
  color?: string
}

const Tag = ({ text = '', color = 'default' }: PropsTypes) => {
  return <span className={`tag tag-${color}`}>{text}</span>
}

Tag.defaultProps = {
  color: '',
  text: ''
}

export default Tag
