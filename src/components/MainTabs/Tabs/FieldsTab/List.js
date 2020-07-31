import React from "react";
import Node from "./Node";
import { DragSource } from "react-dnd";
import Types from "./Types";
import Insert from "./Insert";
import { cardSource, collect } from "../../../../utility/dragDrop";
import "./style.css";

const List = (props) => {
  const { id, label, items, parent, index, connectDragSource, changeSelectedList } = props;
  console.log('pppp',props)
  return connectDragSource(
    <li className="d" id="list">
      <div>{label}</div>
      <Insert index={index} parent={parent} />
      {items && items.length ? (
        <ul>
          {items.map((item, i) => {
            return (
              <Node
                key={item.id}
                parent={id}
                id={item.id}
                // label={item.data.general.name}
                label={item.id}
                items={item.items}
                changeSelectedList={changeSelectedList}
                index={i}
              />
            );
          })}
          <Insert index={items.length} parent={id} />
        </ul>
      ) : null}
    </li>
  );
}

export default DragSource(Types.CARD, cardSource, collect)(List);
