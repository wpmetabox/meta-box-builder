import React, { memo } from 'react';
import Node from './Node';
import Insert from './Insert';

const SelectedItem = (props) => {
  const {
    id,
    item,
    changeSelectedList,
    index
  } = props;

  return <div key={item.id}>
    <Insert index={index} parent={id} />
    <Node
      id={item.id}
      item={item}
      parent={id}
      index={index}
      changeSelectedList={changeSelectedList}
    />
  </div>
};

export default memo(SelectedItem);
