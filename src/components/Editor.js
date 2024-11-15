import React, { useEffect, useRef, useState } from "react";
import Toolbar from "./Toolbar";
import MarkdownIt from "markdown-it";

import "../styles/editor.css";

const Editor = () => {
  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const mdParser = new MarkdownIt(); // Initialize MarkdownIt parser

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

  const copyCode = (content) => {
    const objectName = prompt("Enter the object name:");
    if (objectName) {
      const formattedCode = `${objectName} = \`${content}\`;`;
      navigator.clipboard.writeText(formattedCode).then(() => {
        alert("Code copied to clipboard!");
      });
    }
  };

  const saveContent = (content) => {
    localStorage.setItem("editorContent", content); // You can change this to an API call if needed
    setIsSaved(false); // Update save status to true
  };

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

  // Render Markdown content to HTML using MarkdownIt
  const renderedMarkdown = mdParser.render(editorContent);

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

      {/* Display the raw Markdown content (editable) */}
      <div className="code-display">
        <h2>Markdown</h2>
        <pre>
          <code>{editorContent}</code> {/* Raw Markdown content */}
        </pre>
      </div>

      {/* Rendered HTML preview of the Markdown */}
      <div className="code-display">
        <h2>Rendered HTML</h2>
        <div dangerouslySetInnerHTML={{ __html: renderedMarkdown }} />
      </div>

      {/* Copy Code Button - copy raw Markdown */}
      {editorContent && (
        <button className="copy-button" onClick={() => copyCode(editorContent)}>
          Copy Markdown
        </button>
      )}

      {/* Copy Code Button - copy rendered HTML */}
      {renderedMarkdown && (
        <button
          className="copy-button"
          onClick={() => copyCode(renderedMarkdown)} // Copy the rendered HTML
        >
          Copy HTML
        </button>
      )}
    </div>
  );
};

export default Editor;
