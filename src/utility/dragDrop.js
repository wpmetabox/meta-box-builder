import { updateSelectedList, getSelectedList } from '../utility/functions';

// const traverse = (current, id, i, cb, parent) => {
//     if (current.id === id) cb(current, parent, i);
//     let currentList = current
//     if (current.items) {
//         currentList = current.items
//     }
//     if (!currentList) return;
//     currentList.map((item, i) => {
//         if (item) traverse(item, id, i, cb, current);
//     });
// };

// export const moveNode = (from, to, index) => {
//     var nodeTo = null,
//         nodeFrom = null;
//     let tree = getSelectedList()
//     // Find node to receive
//     traverse(tree, to, 0, item => {
//         nodeTo = item;
//     });

//     // Validate node to
//     if (!nodeTo) return;

//     // Extract node to move
//     traverse(tree, from, 0, (item, parent, i) => {
//         parent = parent || tree;
//         nodeFrom = item;
//         const parentList = parent.items ? parent.items : parent
//         parentList.splice(i, 1);
//     });

//     // Validate node from
//     if (!nodeFrom) return;

//     // Insert node
//     nodeTo.items.splice(index, 0, nodeFrom);
//     updateSelectedList(tree)
//     return tree
// };

export const cardSource = {
    beginDrag(props) {
        console.log('aaa', props.parent)
        return { id: props.id, parent: props.parent };
    },
    endDrag(props, monitor) {
        console.log('hihi', monitor)
        if (!monitor.didDrop()) {
            return;
        }

        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();
        console.log('dddddaaa', dropResult)
        moveNode(item.id, dropResult.parent, dropResult.index);
        props.changeSelectedList()
    }
};

/**
 * Specifies which props to inject into your component.
 */
export const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

const traverse = (current, id, i, cb, parent) => {
    console.log("traverse", current.id);
    if (current.id === id) cb(current, parent, i);
    if (!current.items) return;
    current.items.map((item, i) => {
        if (item) traverse(item, id, i, cb, current);
    });
};

export const moveNode = (from, to, index) => {
    var nodeTo = null,
        nodeFrom = null;
    let tree = getSelectedList()

    // Find node to receive
    traverse(tree, to, 0, item => {
        nodeTo = item;
    });

    // Validate node to
    if (!nodeTo) return;

    // Extract node to move
    traverse(tree, from, 0, (item, parent, i) => {
        parent = parent || tree;
        nodeFrom = item;
        parent.items.splice(i, 1);
    });

    // Validate node from
    if (!nodeFrom) return;

    // Insert node
    nodeTo.items.splice(index, 0, nodeFrom);
    updateSelectedList(tree)
};