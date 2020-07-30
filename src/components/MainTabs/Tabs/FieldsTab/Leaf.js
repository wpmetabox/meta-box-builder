import React from "react";
import { DragSource } from "react-dnd";
import Types from "./Types";
import Insert from "./Insert";
import { moveNode } from "./Tree";

/**
 * Specifies the drag source contract.
 */
const cardSource = {
  beginDrag(props) {
    return { id: props.id, parent: props.parent };
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    moveNode(item.id, dropResult.parent, dropResult.index);
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Leaf extends React.Component {
  render() {
    const { id, label, parent, index } = this.props;
    const { isDragging, connectDragSource } = this.props;
    return connectDragSource(
      <li className="d">
        <div>
          {label} {isDragging && " (and I am being dragged now)"}
        </div>
        <Insert index={index + 1} parent={parent} />
      </li>
    );
  }
}

// Export the wrapped version
export default DragSource(Types.CARD, cardSource, collect)(Leaf);
