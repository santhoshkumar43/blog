import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";

const Test = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  // Jodit configuration
  const config = {
    readonly: false, // Make the editor editable
    toolbar: true, // Show the toolbar
    buttons: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "fontsize",
      "font",
      "|",
      "align",
      "ul",
      "ol",
      "|",
      "link",
      "image",
      "|",
      "undo",
      "redo",
    ],
    height: 500, // Set editor height
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Word-Like Text Editor</h1>
      <div style={{ border: "1px solid #ccc", borderRadius: "4px" }}>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onBlur={(newContent) => setContent(newContent)}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <h2>Preview:</h2>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "4px",
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default Test;