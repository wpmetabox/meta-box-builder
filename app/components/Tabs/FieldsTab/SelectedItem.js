import React, { memo } from 'react';
import Node from './Node';
import Insert from './Insert';

const SelectedItem = (props) => {
  const {
    parent,
    item,
    changeSelectedList,
    index
  } = props;

  return <div key={item.id}>
    <Node
      id={item.id}
      item={item}
      parent={parent}
      index={index}
      changeSelectedList={changeSelectedList}
    />
    <Insert index={index} parent={parent} />
  </div>
};

export default memo(SelectedItem);
