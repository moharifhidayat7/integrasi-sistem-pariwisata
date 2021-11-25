import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

import { useState } from 'react'
import 'react-quill/dist/quill.snow.css'

export default function MyComponent({ value, setValue }) {
  return (
    <ReactQuill
      theme='snow'
      value={value}
      onChange={setValue}
      style={{ height: '28rem' }}
    />
  )
}
