import React, { memo } from 'react';
import Node from './Node';
import Insert from './Insert';

const SelectedList = (props) => {
  const {
    id,
    item,
    register,
    changeSelectedList,
    index
  } = props;

  return <div key={item.id}>
    <Insert index={index} parent={id} />
    <Node
      parent={id}
      id={item.id}
      item={item}
      register={register}
      changeSelectedList={changeSelectedList}
    />
  </div>
};

export default memo(SelectedList);
