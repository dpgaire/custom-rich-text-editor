import React, { useRef, useState } from "react";
import Toolbar from "./Toolbar";
import "../styles/editor.css";

const Editor = ({ onContentChange }) => {
  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState("");

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
      case "insertShape":
        insertShape(value); // Insert selected shape
        break;
      case "insertConnector":
        startConnector(); // Start connector tool
        break;
      case "insertCode":
        insertCodeBlock();
        break;
      default:
        document.execCommand(command, false, value);
    }
    updateEditorContent();
  };

  const insertShape = (shapeType) => {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");

    let shape;
    switch (shapeType) {
      case "circle":
        shape = document.createElementNS(svgNS, "circle");
        shape.setAttribute("cx", "50");
        shape.setAttribute("cy", "50");
        shape.setAttribute("r", "40");
        shape.setAttribute("stroke", "black");
        shape.setAttribute("stroke-width", "3");
        shape.setAttribute("fill", "red");
        break;
      case "rectangle":
        shape = document.createElementNS(svgNS, "rect");
        shape.setAttribute("width", "100");
        shape.setAttribute("height", "50");
        shape.setAttribute("stroke", "black");
        shape.setAttribute("stroke-width", "3");
        shape.setAttribute("fill", "blue");
        break;
      case "line":
        shape = document.createElementNS(svgNS, "line");
        shape.setAttribute("x1", "0");
        shape.setAttribute("y1", "0");
        shape.setAttribute("x2", "100");
        shape.setAttribute("y2", "50");
        shape.setAttribute("stroke", "green");
        shape.setAttribute("stroke-width", "2");
        break;
      default:
        return;
    }
    svg.appendChild(shape);
    editorRef.current.appendChild(svg);
  };

  const startConnector = () => {
    // Start a line connector interaction between shapes (you can add mouse event listeners for drag and draw)
    alert("Connector tool activated! Click on a shape to start connecting.");
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
    if (onContentChange) {
      onContentChange(content); // Callback to pass the content back to parent component
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(editorContent).then(() => {
      alert("Code copied to clipboard!");
    });
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
      <div className="code-display">
        <pre>
          <code>{editorContent}</code>
        </pre>
      </div>
      <button className="copy-button" onClick={copyCode}>
        Copy Code
      </button>
    </div>
  );
};

export default Editor;
