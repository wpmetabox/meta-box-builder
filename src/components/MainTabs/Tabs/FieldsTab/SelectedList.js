import React, { memo } from 'react';
import Node from './Node';
import Insert from './Insert';

const SelectedList = (props) => {
  const {
    id,
    items,
    changeSelectedList,
    register
  } = props;

  return <>
    {
      items && items.length ? (
        <ul>
          {items.map((item, index) => (
            <div key={item.id}>
              <Insert index={index} parent={id} />
              <Node
                key={item.id}
                parent={item.id}
                id={item.id}
                item={item}
                items={item.items}
                register={register}
              />
            </div>
          ))}
        </ul>
      ) : null
    }
  </>
};

export default SelectedList;
