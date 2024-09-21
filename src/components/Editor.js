// src/components/Editor.js
import React, { useRef } from "react";
import Toolbar from "./Toolbar";
import "../styles/editor.css";
import { useState } from "react";

const Editor = () => {
  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState("");

  const handleCommand = (command, value = null) => {
    switch (command) {
      case "heading":
        document.execCommand("formatBlock", false, value);
        break;
      case "alignLeft":
        document.execCommand("justifyLeft");
        break;
      case "alignCenter":
        document.execCommand("justifyCenter");
        break;
      case "alignRight":
        document.execCommand("justifyRight");
        break;
      case "createLink":
        const url = prompt("Enter the link URL");
        if (url) {
          document.execCommand("createLink", false, url);
        }
        break;
      case "insertImage":
        const imageUrl = prompt("Enter the image URL");
        if (imageUrl) {
          document.execCommand("insertImage", false, imageUrl);
        }
        break;
      case "insertVideo":
        const videoUrl = prompt("Enter the video URL");
        if (videoUrl) {
          const videoEmbed = `<iframe width="560" height="315" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`;
          document.execCommand("insertHTML", false, videoEmbed);
        }
        break;
      case "insertTable":
        insertTable(3, 3); // Example: insert 3x3 table
        break;
      case "insertCode":
        insertCodeBlock();
        break;
      case "undo":
        document.execCommand("undo");
        break;
      case "redo":
        document.execCommand("redo");
        break;
      case "foreColor":
        document.execCommand("foreColor", false, value);
        break;
      default:
        document.execCommand(command, false, null);
    }
    updateEditorContent();
  };

  // Insert table with given rows and columns
  const insertTable = (rows, cols) => {
    let table = "<table border='1'>";
    for (let i = 0; i < rows; i++) {
      table += "<tr>";
      for (let j = 0; j < cols; j++) {
        table += "<td>&nbsp;</td>";
      }
      table += "</tr>";
    }
    table += "</table>";
    document.execCommand("insertHTML", false, table);
  };

  const insertCodeBlock = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    const pre = document.createElement("pre");
    const code = document.createElement("code");
    code.textContent = selection.toString();
    pre.appendChild(code);
    range.deleteContents();
    range.insertNode(pre);
  };

  const updateEditorContent = () => {
    const content = editorRef.current.innerHTML;
    setEditorContent(content);
    // if (onContentChange) {
    //   onContentChange(content); // Callback to pass the content back to parent component
    // }
  };

  return (
    <div className="editor-container">
      <Toolbar onCommand={handleCommand} />
      <div
        ref={editorRef}
        className="editor"
        contentEditable
        onInput={updateEditorContent}
        suppressContentEditableWarning={true}
      ></div>
    </div>
  );
};

export default Editor;
