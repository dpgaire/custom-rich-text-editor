import React, { useEffect, useRef, useState } from "react";
import Toolbar from "./Toolbar";
import "../styles/editor.css";

const Editor = () => {
  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleCommand = (command, value = null) => {
    switch (command) {
      case "heading":
        document.execCommand("formatBlock", false, "h3");
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
      case "insertCode":
        insertCodeBlock();
        break;
      default:
        document.execCommand(command, false, value);
    }
    updateEditorContent();
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

    if (content) {
      setIsSaved(true); // Callback to pass the content back to parent component
    }
  };

  const copyCode = () => {
    const objectName = prompt("Enter the object name:");
    if (objectName) {
      const formattedCode = `${objectName} = \`${editorContent}\`;`;
      navigator.clipboard.writeText(formattedCode).then(() => {
        alert("Code copied to clipboard!");
      });
    }
  };

  // Function to save content to local storage or an API
  const saveContent = (content) => {
    localStorage.setItem("editorContent", content); // You can change this to an API call if needed
    setIsSaved(false); // Update save status to true
  };

  // Function to auto-save content at regular intervals
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (editorContent && !isSaved) {
        saveContent(editorContent);
      }
    }, 5000); // Auto-save every 5 seconds

    return () => clearInterval(intervalId);
  }, [editorContent, isSaved]);

  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      setEditorContent(savedContent);
      editorRef.current.innerHTML = savedContent;
    }
  }, []);

  const handleSave = () => {
    saveContent(editorContent); // Save content and update status
  };

  return (
    <div className="editor-container">
      <Toolbar
        onCommand={handleCommand}
        onSave={handleSave}
        isSaved={isSaved}
      />
      <div
        ref={editorRef}
        className="editor"
        contentEditable
        onInput={updateEditorContent}
        suppressContentEditableWarning={true}
      ></div>
      <div className="code-display">
        <pre>
          <code>{editorContent}</code>
        </pre>
      </div>
      {editorContent && (
        <button className="copy-button" onClick={copyCode}>
          Copy Code
        </button>
      )}
    </div>
  );
};

export default Editor;
