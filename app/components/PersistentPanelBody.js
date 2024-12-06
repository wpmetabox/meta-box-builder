import { Icon, chevronDown, chevronUp } from '@wordpress/icons';

const PersistentPanelBody = ( { title, open, onClick, children } ) => {
	return (
		<>
			<button type="button" className={ `og-panel__header ${ open ? 'og-panel__header--open' : '' }` } onClick={ onClick }>
				{ title }
				<Icon icon={ open ? chevronDown : chevronUp } />
			</button>
			<div className={ `og-panel__body ${ open ? 'og-panel__body--open' : '' }` }>{ children }</div>
		</>
	);
};

export default PersistentPanelBody;