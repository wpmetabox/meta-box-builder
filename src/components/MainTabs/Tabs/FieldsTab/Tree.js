import React from "react";
import List from "./List";
import Store, { withStore } from "react-observable-store";

const traverse = (current, id, i, cb, parent) => {
  console.log("traverse", current.id);
  if (current.id === id) cb(current, parent, i);
  if (!current.items) return;
  current.items.map((item, i) => {
    if (item) traverse(item, id, i, cb, current);
  });
};

export const moveNode = (from, to, index) => {
  var nodeTo = null,
    nodeFrom = null;
  const tree = Store.get("state.tree");

  // Find node to receive
  traverse(tree, to, 0, item => {
    nodeTo = item;
  });

  // Validate node to
  if (!nodeTo) return;

  // Extract node to move
  traverse(tree, from, 0, (item, parent, i) => {
    parent = parent || tree;
    nodeFrom = item;
    parent.items.splice(i, 1);
  });

  // Validate node from
  if (!nodeFrom) return;

  // Insert node
  nodeTo.items.splice(index, 0, nodeFrom);
  Store.update("state", { tree });
};

class Tree extends React.Component {
  render() {
    const { tree } = this.props;
    return (
      <ul>
        <List id={tree.id} label={tree.label} items={tree.items} />
      </ul>
    );
  }
}

export default withStore("state", Tree);
