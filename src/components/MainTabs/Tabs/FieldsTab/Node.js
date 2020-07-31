import React from "react";
import Leaf from "./Leaf";
import List from "./List";

const Node = (props) => {
  const { id, label, items, parent, index, changeSelectedList } = props;
  return items && items.length
    ? <List id={id} items={items} label={label} parent={parent} index={index} changeSelectedList={changeSelectedList} />
    : <Leaf parent={parent} label={label} id={id} index={index} changeSelectedList={changeSelectedList} />
}

export default Node;
