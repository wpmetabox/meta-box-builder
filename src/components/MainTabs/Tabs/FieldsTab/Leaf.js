import React, { Component } from "react";
import { DragSource } from "react-dnd";
import Types from "./Types";
import Insert from "./Insert";
import { cardSource, collect } from "../../../../utility/dragDrop";

const Leaf = (props) => {

  const { label, parent, index, isDragging, connectDragSource } = props;
  return connectDragSource(
    <li className="d" id="leaf">
      <div>
        {label} {isDragging && " (and I am being dragged now)"}
      </div>
      <Insert index={index + 1} parent={parent} />
    </li>
  );
}

// Export the wrapped version
export default DragSource(Types.CARD, cardSource, collect)(Leaf);
