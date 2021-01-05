import { request } from '../../functions';

const { useState, useEffect } = wp.element;
const { Dropdown } = wp.components;
const { __ } = wp.i18n;

export const Inserter = ( { addField, type } ) => {
	const [ fieldTypes, setFieldTypes ] = useState( {} );
	const [ searchParam, setSearchParam ] = useState( '' );
	const [ closeCallback, setCloseCallback ] = useState( () => { } );

	useEffect( () => {
		request( 'field-types' ).then( setFieldTypes );
	}, [] );

	const search = e => setSearchParam( e.target.value );
	const open = ( toggle, close ) => {
		toggle();
		setCloseCallback( prevCallback => close );
	};
	const insert = e => {
		addField( e.target.dataset.type );
		closeCallback();
	};

	return (
		<Dropdown
			className="og-inserter"
			onClose={ () => setSearchParam( '' ) }
			renderToggle={ ( { onToggle, onClose } ) => (
				<button type="button" id={ `og-inserter${ type }` } className="button button-primary" onClick={ () => open( onToggle, onClose ) }>
					{ __( '+ Add Field', 'meta-box-builder' ) }
				</button>
			) }
			renderContent={ () => (
				<>
					<div className="og-inserter__search">
						<input type="search" placeholder={ __( 'Search for a field type', 'meta-box-builder' ) } onChange={ search } />
					</div>
					{
						Object.keys( fieldTypes ).length
							? Object.entries( fieldTypes ).map( ( [ title, items ] ) =>
								<Category key={ title } title={ title } items={ items } insert={ insert } searchParam={ searchParam } />
							)
							: <p>{ __( 'Fetching field types, please wait...', 'meta-box-builder' ) }</p>
					}
				</>
			) }
		/>
	);
};

const Category = ( { title, items, insert, searchParam } ) => {
	let result = [];
	Object.entries( items ).forEach( ( [ type, label ] ) => {
		if ( label.toLowerCase().includes( searchParam.toLowerCase() ) ) {
			result.push( { type, label } );
		}
	} );

	if ( !result.length ) {
		return null;
	}

	return (
		<>
			<div className="og-inserter__title">{ title }</div>
			<div className="og-inserter__content">
				{
					result.map( ( { type, label } ) =>
						<div className="og-inserter__item" key={ type } data-type={ type } onClick={ insert }>{ label }</div>
					)
				}
			</div>
		</>
	);
};