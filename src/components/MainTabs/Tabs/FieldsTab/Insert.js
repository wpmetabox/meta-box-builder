import React, {memo} from "react";
import { DropTarget } from "react-dnd";
import Types from "./Types";

const spec = {
  drop: (props, monitor, component) => {
    return { parent: props.parent, index: props.index };
  },
  canDrop: (props, monitor) => {
    const item = monitor.getItem();
    const result = monitor.isOver({ shallow: true });
    return result && [props.id, props.parent].indexOf(item.id) === -1;
  },
  hover: (props, monitor, component) => {
    const item = monitor.getItem();
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
  };
}

const Insert = (props) => {
  const { isOverCurrent, connectDropTarget, parent, index } = props;
  return connectDropTarget(
    <div
      dataparent={parent}
      className="dndi"
      style={isOverCurrent ? { border: "2px dashed gray" } : {}}
    />
  );
}

export default memo(DropTarget(Types.CARD, spec, collect)(Insert));
