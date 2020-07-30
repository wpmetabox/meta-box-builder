import React from "react";
import Node from "./Node";
import { DragSource } from "react-dnd";
import Types from "./Types";
import Insert from "./Insert";
import { moveNode } from "./Tree";
import "./style.css";

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

class List extends React.Component {
  render() {
    const { id, label, items, parent, index } = this.props;
    const { isDragging, connectDragSource } = this.props;
    return connectDragSource(
      <li className="d">
        <div>{label}</div>
        <Insert index={index} parent={parent} />
        {items && items.length ? (
          <ul>
            {items.map((item, i) => {
              return (
                <Node
                  key={i}
                  parent={id}
                  id={item.id}
                  label={item.label}
                  items={item.items}
                  index={i}
                />
              );
            })}
            <Insert index={items.length} parent={id} />
          </ul>
        ) : null}
      </li>
    );
  }
}

export default DragSource(Types.CARD, cardSource, collect)(List);
