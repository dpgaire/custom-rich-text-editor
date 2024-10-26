// src/components/Toolbar.js
import React from "react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaHeading,
  FaListUl,
  FaListOl,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaLink,
  FaImage,
  FaCode,
  FaTable,
  FaUndo,
  FaRedo,
  FaVideo,
  FaPalette,
} from "react-icons/fa";
import "../styles/toolbar.css";

const Toolbar = ({ onCommand }) => {
  return (
    <div className="toolbar">
      {/* Text formatting */}
      <button onClick={() => onCommand("bold")}>
        <FaBold />
      </button>
      <button onClick={() => onCommand("italic")}>
        <FaItalic />
      </button>
      <button onClick={() => onCommand("underline")}>
        <FaUnderline />
      </button>

      {/* Headings */}
      <select onChange={(e) => onCommand("heading", e.target.value)}>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
        <option value="h4">Heading 4</option>
        <option value="h5">Heading 5</option>
        <option value="h6">Heading 6</option>
      </select>

      {/* Text Color */}
      <input
        type="color"
        onChange={(e) => onCommand("foreColor", e.target.value)}
        title="Text Color"
      />
      <FaPalette />

      {/* Lists */}
      <button onClick={() => onCommand("insertUnorderedList")}>
        <FaListUl />
      </button>
      <button onClick={() => onCommand("insertOrderedList")}>
        <FaListOl />
      </button>
      {/* Alignment */}
      <button onClick={() => onCommand("alignLeft")}>
        <FaAlignLeft />
      </button>
      <button onClick={() => onCommand("alignCenter")}>
        <FaAlignCenter />
      </button>
      <button onClick={() => onCommand("alignRight")}>
        <FaAlignRight />
      </button>

      {/* Links and Media */}
      <button onClick={() => onCommand("createLink")}>
        <FaLink />
      </button>
      <button onClick={() => onCommand("insertImage")}>
        <FaImage />
      </button>
      <button onClick={() => onCommand("insertVideo")}>
        <FaVideo />
      </button>

      {/* Code and Tables */}
      <button onClick={() => onCommand("insertCode")}>
        <FaCode />
      </button>
      <button onClick={() => onCommand("insertTable")}>
        <FaTable />
      </button>

      {/* Undo/Redo */}
      <button onClick={() => onCommand("undo")}>
        <FaUndo />
      </button>
      <button onClick={() => onCommand("redo")}>
        <FaRedo />
      </button>
    </div>
  );
};

export default Toolbar;
