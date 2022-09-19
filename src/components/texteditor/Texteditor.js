import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import CKEditor from "@ckeditor/ckeditor5-react"
import parse from "html-react-parser"
import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import { auth } from "../../firebase";



function Texteditor() {
  const location = useLocation();
  const {form} = location.state;
  const [text, setText] = useState("")
  return (
    <div className="App">
      <p>{form}</p>
     
    </div>
  )
}

export default Texteditor;