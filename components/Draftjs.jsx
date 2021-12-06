import { useState, useRef } from 'react'
import { Editor, EditorState } from 'draft-js'
import 'draft-js/dist/Draft.css'

export default function MyEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )

  const editor = useRef(null)
  function focusEditor() {
    editor.current.focus()
  }

  return (
    <div
      id='editor'
      style={{ border: '1px solid black', minHeight: '6em', cursor: 'text' }}
      onClick={focusEditor}
    >
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={setEditorState}
        placeholder='Detail Paket Wisata!'
      />
    </div>
  )
}
