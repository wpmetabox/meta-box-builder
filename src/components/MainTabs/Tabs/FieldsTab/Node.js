import React, { memo } from "react";
import Group from "./Group";
import FieldSelected from "./FieldSelected";
import GroupChildrenList from './GroupChildrenList'

const Node = (props) => {
  const { id, item, changeSelectedList, parent, index } = props;
  const isGroupField = () => item.data.general.type === 'group';

  return isGroupField()
    ? <>
      <Group
        id={id}
        data={item.data}
        items={item.items}
        parent={parent}
        indexVal={index}
        changeSelectedList={changeSelectedList}
      />
      <GroupChildrenList
        id={id}
        items={item.items}
        parent={parent}
        changeSelectedList={changeSelectedList}
      />
    </>
    : <FieldSelected
      data={item.data}
      id={id}
      parent={parent}
      indexVal={index}
      changeSelectedList={changeSelectedList}
    />
}

export default memo(Node, (prevProps, nextProps) => nextProps.item.type !== 'group' && prevProps.id === nextProps.id);
