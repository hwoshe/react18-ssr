import React, { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const Portal: FC<{ children?: ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const isBrowser = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )

  const [state] = useState<Document>((isBrowser && window.document) as Document)

  if (!containerRef.current) {
    containerRef.current = state.createElement('div')
    state.body.appendChild(containerRef.current)
  }

  useEffect(() => {
    return function cleanup() {
      if (containerRef.current) {
        state.body.removeChild(containerRef.current)
      }
    }
  }, [])

  const jsx = <div>{children}</div>

  return createPortal(jsx, containerRef.current)
}
export default Portal
