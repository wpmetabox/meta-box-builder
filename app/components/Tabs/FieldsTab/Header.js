const { Dashicon } = wp.components;
const { __ } = wp.i18n;
import { DragSource } from 'react-dnd';
import { actions as ConditionalActions } from '../../../context/ConditionalList/ConditionalContext';
import { ucwords } from '../../../utility/functions';
import { cardSource, collect, copyItem, deleteItem } from '../../../utility/updateSelectedList';
import Types from './Types';

const Header = props => {
	const { connectDragSource } = props;

	const duplicate = e => {
		e.stopPropagation();
		const newSelectedList = copyItem( props.id, props.parent, props.index );
		props.changeSelectedList( newSelectedList );
	};

	const remove = e => {
		e.stopPropagation();
		const newSelectedList = deleteItem( props.id, props.parent, props.index );
		ConditionalActions.updateConditionalList( 'remove', { id: props.id } );
		props.changeSelectedList( newSelectedList );
	};

	return connectDragSource(
		<div className="og-item__header og-collapsible__header" onClick={ props.toggleSettings }>
			<div className="og-item__title" id={ `og-item__title__${ props.id }` }>{ ucwords( props.type ) }</div>
			<div className="og-item__actions">
				<span className="og-item__type">{ props.type }</span>
				<span className="og-item__action og-item__action--remove" title="Remove" onClick={ remove }><Dashicon icon="trash" /></span>
				<span className="og-item__action og-item__action--duplicate" title="Duplicate" onClick={ duplicate }><Dashicon icon="admin-page" /></span>
				<span className="og-item__action og-item__action--toggle" title="Toggle Settings"><Dashicon icon="arrow-down-alt2" /></span>
			</div>
		</div>
	);
};
export default DragSource( Types.CARD, cardSource, collect, { captureDraggingState: true } )( Header );