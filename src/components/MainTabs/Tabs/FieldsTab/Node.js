import React, { memo } from "react";
import Group from "./Group";
import FieldSelected from "./FieldSelected";
import { actions } from '../../../../context/UpdateSelected/UpdateSelectedContext'

const Node = (props) => {
  const { id, label, items, parent, item, register } = props;
  return item.data.general.type === 'group'
    ? <Group
      register={register}
      id={id}
      data={item.data}
      items={items}
      label={label}
      parent={parent}
      changeSelectedList={actions.updateSelectedList} />
    : <FieldSelected
      register={register}
      data={item.data}
      parent={parent}
      label={label}
      id={id}
      changeSelectedList={actions.updateSelectedList} />
}

export default memo(Node);
