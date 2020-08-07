import memoizeOne from 'memoize-one';
import { updateSelectedList, getSelectedList } from '../utility/functions';


export const cardSource = {
  beginDrag(props) {
    return { id: props.id, parent: props.parent };
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      return;
    }

    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    const selectedList = getSelectedList();
    const tree = moveNode(item.id, dropResult.parent, dropResult.index);
    selectedList !== tree && props.changeSelectedList(tree);
  },
};

/**
 * Specifies which props to inject into your component.
 */
export const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
};



const traverse = (current, id, i, cb, parent) => {
  if (current.id === id) cb(current, parent, i);
  if (!current.items) return;
  current.items.map((item, i) => {
    if (item) traverse(item, id, i, cb, current);
  });
};

const memTraverse = memoizeOne(traverse);

export const moveNode = (from, to, index) => {
  var nodeTo = null,
    nodeFrom = null;
  let tree = getSelectedList();

  // Find node to receive
  memTraverse(tree, to, 0, (item) => {
    nodeTo = item;
  });

  // Validate node to
  if (!nodeTo) return;

  // Extract node to move
  memTraverse(tree, from, 0, (item, parent, i) => {
    parent = parent || tree;
    nodeFrom = item;
    parent.items.splice(i, 1);
  });

  // Validate node from
  if (!nodeFrom) return;
  // Insert node
  nodeTo.items.splice(index, 0, nodeFrom);
  updateSelectedList(tree)
  return tree
};
