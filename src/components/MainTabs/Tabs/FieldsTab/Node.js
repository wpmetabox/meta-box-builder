import React from "react";
import Leaf from "./Leaf";
import List from "./List";

class Node extends React.Component {
  render() {
    const { id, label, items, parent, index } = this.props;
    return items && items.length ? (
      <List id={id} items={items} label={label} parent={parent} index={index} />
    ) : (
      <Leaf parent={parent} label={label} id={id} index={index} />
    );
  }
}

export default Node;
