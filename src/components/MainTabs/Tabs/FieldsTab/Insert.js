import React from "react";
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
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

class Insert extends React.Component {
  render() {
    const { isOverCurrent, connectDropTarget, parent, index } = this.props;
    return connectDropTarget(
      <div
        dataparent={parent}
        dataindex={index}
        className="dndi"
        style={isOverCurrent ? { border: "2px dashed gray" } : {}}
      />
    );
  }
}

export default DropTarget(Types.CARD, spec, collect)(Insert);
