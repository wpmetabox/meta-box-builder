import React, { memo } from "react";
import { DropTarget, useDrop } from "react-dnd";
import Types from "./Types";

const spec = {
  drop: ( props ) => {
    return { parent: props.parent, index: props.index };
  },
  canDrop: ( props, monitor ) => {
    const item = monitor.getItem();
    const result = monitor.isOver( { shallow: true } );
    return result && [ props.id, props.parent ].indexOf( item.id ) === -1;
  },
};

/**
 * Specifies which props to inject into your component.
 */
function collect( connect, monitor ) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver( { shallow: true } ),
  };
}

const Insert = ( props ) => {
  const [ dropProps, drop ] = useDrop( {
    accept: 'tool',
    canDrop: ( item, monitor ) => item,
    drop: ( item, monitor ) => dropItem( item, afterIndex ),
    collect: monitor => ( {
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      item: monitor.getItem(),
    } ),
  } );

  const { isOverCurrent, connectDropTarget } = props;
  return connectDropTarget(
    <div className={ `og-drop-area-${ props.parent } og-drop-area${ isOverCurrent ? ' og-drop-area--active' : '' }` } />
  );
};

export default memo( DropTarget( Types.CARD, spec, collect )( Insert ) );
