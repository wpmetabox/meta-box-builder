import React, { memo } from "react";
import Group from "./Group";
import FieldSelected from "./FieldSelected";
import GroupChildrenList from './GroupChildrenList'

const Node = (props) => {
  const { id, item, register, changeSelectedList } = props;

  const isGroupField = () => item.data.general.type === 'group';

  return isGroupField()
    ? <>
      <Group
        register={register}
        id={id}
        data={item.data}
        items={item.items}
        changeSelectedList={changeSelectedList} />
      <GroupChildrenList
        register={register}
        id={id}
        items={item.items}
        changeSelectedList={changeSelectedList} />
    </>
    : <FieldSelected
      register={register}
      data={item.data}
      id={id}
      changeSelectedList={changeSelectedList} />
}

export default memo(Node);
