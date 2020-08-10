import React, { memo } from "react";
import Insert from './Insert'
import Node from './Node'

const GroupChildrenList = (props) => {
    const {
        id,
        items,
        register,
        changeSelectedList
    } = props;

    return <>
        <ul>
            {
                items.map((item, i) => <div key={item.id}>
                    <Insert parent={id} index={i} />
                    <Node
                        key={item.id}
                        id={item.id}
                        item={item}
                        register={register}
                        changeSelectedList={changeSelectedList}
                    />
                </div>)
            }
            <Insert index={items.length} parent={id} />
        </ul>
        {
            items.length === 0 && <div className="drop_area">Drag and drop child fields here.</div>
        }
    </>
}

export default GroupChildrenList;