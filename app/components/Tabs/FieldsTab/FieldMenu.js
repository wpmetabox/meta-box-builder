import { request } from '../../../utility/functions';
const { Dashicon } = wp.components;
const { useState, useEffect } = wp.element;
const { __ } = wp.i18n;

const FieldMenu = ( { onSelectField } ) => {
	const [ active, setActive ] = useState( 0 );
	const [ fieldTypes, setFieldTypes ] = useState( {} );

	useEffect( () => {
		request( 'field-types' ).then( data => setFieldTypes( data ) );
	}, [] );

	return (
		<>
			{
				Object.keys( fieldTypes ).length
				? Object.keys( fieldTypes ).map( ( panelTitle, panelIndex ) =>
					<div className={ `og-panel og-collapsible${ panelIndex === active ? ' og-collapsible--expanded' : '' }` } key={ panelIndex }>
						<h4 className="og-collapsible__header" onClick={ () => setActive( panelIndex ) }>
							{ panelTitle }
							<Dashicon icon="arrow-down-alt2" />
						</h4>
						<div className="og-panel__body og-collapsible__body">
							{
								Object.keys( fieldTypes[ panelTitle ] ).map( ( key, index ) =>
									<button type="button" className="button" key={ index } onClick={ () => onSelectField( key ) }>{ fieldTypes[ panelTitle ][ key ] }</button>
								)
							}
						</div>
					</div>
				)
				: <p className="og-sidebar__item">{ __( 'Fetching field types, please wait...', 'meta-box-builder' ) }</p>
			}
		</>
	);
};

export default FieldMenu;