import React, { memo } from "react";
import Group from "./Group";
import FieldSelected from "./FieldSelected";
import { actions } from '../../../../context/UpdateSelected/UpdateSelectedContext'

const Node = (props) => {
  const { id, items, parent, item, register } = props;
  console.log(props)
  return  item.data.general.type === 'group'
    ? <Group
      register={register}
      id={id}
      data={item.data}
      items={items}
      parent={parent}
      changeSelectedList={actions.updateSelectedList} />
    : <FieldSelected
      register={register}
      data={item.data}
      parent={parent}
      id={id}
      changeSelectedList={actions.updateSelectedList} />
}

export default memo(Node);
