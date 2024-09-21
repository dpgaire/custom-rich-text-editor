// src/index.js
import React from "react";
import ReactDOM from "react-dom/client"; // Note the change here
import Editor from "./components/Editor";
import "./styles/editor.css";

const App = () => (
  <div>
    <h1>Custom Rich Text Editor</h1>
    <Editor />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root")); // Create root
root.render(<App />); // Use the new render method
