const { Dashicon } = wp.components;
const { __ } = wp.i18n;

const Header = props => {
	const duplicate = e => {
		e.stopPropagation();
		const newSelectedList = copyItem( props.index, props.parent, props.indexVal );
		props.changeSelectedList( newSelectedList );
	};
	const remove = e => {
		e.stopPropagation();
		const newSelectedList = deleteItem( props.index, props.parent, props.indexVal );
		props.changeSelectedList( newSelectedList );
	};

	return (
		<div className="og-item__header og-collapsible__header" onClick={ props.toggleSettings }>
			<div className="og-item__title" id={ `og-item__title__${ props.index }` }>{ __( '(No label)', 'meta-box-builder' ) }</div>
			<div className="og-item__actions">
				<span className="og-item__type">{ props.type }</span>
				<span className="og-item__action og-item__action--remove" title="Remove" onClick={ remove }><Dashicon icon="trash" /></span>
				<span className="og-item__action og-item__action--duplicate" title="Duplicate" onClick={ duplicate }><Dashicon icon="admin-page" /></span>
				<span className="og-item__action og-item__action--toggle" title="Toggle Settings"><Dashicon icon="arrow-down-alt2" /></span>
			</div>
		</div>
	);
};
export default Header;