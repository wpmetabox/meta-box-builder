import React, { memo } from "react";
import Group from "./Group";
import FieldSelected from "./FieldSelected";
import { actions } from '../../../../context/UpdateSelected/UpdateSelectedContext'

const Node = (props) => {
  console.log('ppppp', props)
  const { id, parent, item, register, changeSelectedList } = props;
  return item.data.general.type === 'group'
    ? <Group
      register={register}
      id={id}
      data={item.data}
      items={item.items}
      parent={parent}
      changeSelectedList={changeSelectedList} />
    : <FieldSelected
      register={register}
      data={item.data}
      parent={parent}
      id={id}
      changeSelectedList={changeSelectedList} />
}

export default memo(Node);
