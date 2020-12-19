const { Dashicon } = wp.components;
const { __ } = wp.i18n;

const Header = ( { id, type, name, toggleSettings, removeField, duplicateField } ) => (
	<div className="og-item__header og-collapsible__header">
		<div className="og-item__title" id={ `og-item__title__${ id }` }>{ name }</div>
		<div className="og-item__actions">
			<span className="og-item__type">{ type }</span>
			<span className="og-item__action og-item__action--remove" title={ __( 'Remove', 'meta-box-builder' ) } onClick={ () => removeField( id ) }><Dashicon icon="trash" /></span>
			<span className="og-item__action og-item__action--duplicate" title={ __( 'Duplicate', 'meta-box-builder' ) } onClick={ () => duplicateField( id ) }><Dashicon icon="admin-page" /></span>
			<span className="og-item__action og-item__action--toggle" title={ __( 'Toggle settings', 'meta-box-builder' ) } onClick={ toggleSettings }><Dashicon icon="arrow-down-alt2" /></span>
		</div>
	</div>
);
export default Header;