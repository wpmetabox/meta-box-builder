import { Icon, chevronDown, chevronUp } from '@wordpress/icons';
import { useReducer } from '@wordpress/element';

const PersistentPanelBody = ( { title, className = '', children } ) => {
	const [ open, toggleOpen ] = useReducer( on => !on, true );

	return (
		<>
			<button type="button" className={ `og-panel__header ${ open ? 'og-panel__header--open' : '' }` } onClick={ toggleOpen }>
				{ title }
				<Icon icon={ open ? chevronDown : chevronUp } />
			</button>
			<div className={ `og-panel__body ${ open ? 'og-panel__body--open' : '' } ${ className }` }>{ children }</div>
		</>
	);
};

export default PersistentPanelBody;