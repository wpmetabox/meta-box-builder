import memoizeOne from 'memoize-one';
import { getDataCopiedItem, getSelectedList, uniqid, updateSelectedList } from './functions';


export const cardSource =
{
  beginDrag( props ) {
    const dropAreas = document.getElementsByClassName( `og-drop-area-${ props.parent }` );
    Object.values( dropAreas ).map( item => item.style.height = '50px' );

    return { id: props.id, parent: props.parent };
  },
  endDrag( props, monitor ) {
    const dropAreas = document.getElementsByClassName( `og-drop-area-${ props.parent }` );
    Object.values( dropAreas ).map( item => item.style.height = '0px' );
    if ( !monitor.didDrop() ) {
      return;
    }

    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    const selectedList = getSelectedList();
    const tree = moveNode( item.id, dropResult.parent, dropResult.index );
    selectedList !== tree && props.changeSelectedList( tree );
  },
};

/**
 * Specifies which props to inject into your component.
 */
export const collect = ( connect, monitor ) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
};



const traverse = ( current, id, i, cb, parent ) => {
  if ( current.id === id ) cb( current, parent, i );
  if ( !current.items ) return;
  current.items.map( ( item, i ) => {
    if ( item ) traverse( item, id, i, cb, current );
  } );
};

const memTraverse = memoizeOne( traverse );

export const moveNode = ( from, to, index, typeChange ) => {
  var nodeTo = null,
    nodeFrom = null;
  let tree = getSelectedList();
  // Find node to receive
  memTraverse( tree, to, 0, ( item ) => {
    nodeTo = item;
  } );

  // Validate node to
  if ( !nodeTo ) return;

  // Extract node to move
  memTraverse( tree, from, 0, ( item, parent, i ) => {
    parent = parent || tree;
    nodeFrom = item;
    nodeFrom = keepValueNodeFrom( nodeFrom );

    if ( isCopying( typeChange ) ) {
      const itemCopy = createCopyItem( { ...nodeFrom } );
      parent.items.splice( i + 1, 0, itemCopy );
    }
    if ( isNotDeleting( typeChange ) ) {
      parent.items.splice( i, 1 );
    } else {
      if ( isExactlyParent( parent.id, to ) ) {
        parent.items.splice( i, 1 );
      }
    }

  } );
  // Validate node from
  if ( !nodeFrom ) return;
  // Insert node
  if ( isNotDeleting( typeChange ) ) {
    nodeTo.items.splice( index, 0, nodeFrom );
  }

  updateSelectedList( tree );
  return tree;
};

export const keepValueNodeFrom = ( nodeItem ) => {
  let result = { ...nodeItem };
  const childrens = nodeItem.items;

  result.data = getDataCopiedItem( nodeItem.type, nodeItem.id );
  if ( childrens ) {
    result.items = [];
    childrens.map( children => {
      if ( isNotGroupField ) {
        result.items.push( { ...children, data: getDataCopiedItem( children.type, children.id ) } );
      } else {
        result.items.push( keepValueNodeFrom( children ) );
      }
    } );
  }

  return result;
};

export const copyItem = ( id, parent, index ) => {
  return moveNode( id, parent, index, 'copy' );
};

export const deleteItem = ( id, parent, index ) => {
  return moveNode( id, parent, index, 'delete' );
};

const createCopyItem = ( item ) => {
  let result = { ...item };
  result.id = `${ item.type }_${ uniqid() }`;
  if ( result.items.length > 0 ) {
    result.data.general.name.default += ' Copy';
    result.items = result.items.map( item => item = createCopyItem( item ) );
  }


  return result;
};

const isNotGroupField = type => type !== 'group';

const isCopying = typeChange => typeChange === 'copy';

const isExactlyParent = ( parentId, toId ) => parentId === toId;

const isNotDeleting = typeChange => typeChange !== 'delete';