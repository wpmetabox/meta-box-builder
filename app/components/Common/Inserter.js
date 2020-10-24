import { request } from '../../utility/functions';

const { useState, useEffect, Fragment } = wp.element;
const { Dropdown } = wp.components;
const { __ } = wp.i18n;

export const Inserter = ( { addItem } ) => {
	const [ fieldTypes, setFieldTypes ] = useState( {} );
	const [ searchParam, setSearchParam ] = useState( '' );
	const [ closeCallback, setCloseCallback ] = useState( () => { } );

	useEffect( () => {
		request( 'field-types' ).then( data => setFieldTypes( data ) );
	}, [] );

	const search = e => setSearchParam( e.target.value );
	const open = ( toggle, close ) => {
		toggle();
		setCloseCallback( () => close );
	};
	const insert = e => {
		addItem( e.target.dataset.type );
		closeCallback();
		setSearchParam( '' );
	};

	const Category = ( { title, items } ) => {
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
				{ title && <div className="og-inserter__title">{ title }</div> }
				<div className="og-inserter__content">
					{
						result.map( ( { type, label } ) =>
							<button type="button" className="button" key={ type } data-type={ type } onClick={ insert }>{ label }</button>
						)
					}
				</div>
			</>
		);
	};

	return (
		<Dropdown
			className="og-inserter"
			renderToggle={ ( { onToggle, onClose } ) => (
				<button type="button" className="button button-primary" onClick={ () => open( onToggle, onClose ) }>{ __( '+ Add Field', 'meta-box-builder' ) }</button>
			) }
			renderContent={ () => (
				<>
					<div className="og-inserter__search">
						<input type="search" placeholder={ __( 'Search for a field type', 'meta-box-builder' ) } onChange={ search } />
					</div>
					{
						Object.keys( fieldTypes ).length
							? Object.entries( fieldTypes ).map( ( [ title, items ] ) =>
								<Fragment key={ title }>
									<Category title={ title } items={ items } />
								</Fragment>
							)
							: <p>{ __( 'Fetching field types, please wait...', 'meta-box-builder' ) }</p>
					}
				</>
			) }
		/>
	);
};