import FieldMenu from './FieldsTab/FieldMenu';
import { updateSelectedList, request, uniqid } from '../../utility/functions';
import SearchResultList from './FieldsTab/SearchResultList';
import SelectedItem from './FieldsTab/SelectedItem';

const { useState, useEffect, useCallback, memo } = wp.element;
const { __ } = wp.i18n;

const FieldsTab = ( props ) => {
	const initialFields = props.fields || [];
	const [ fields, setFields ] = useState( [] );
	const [ selectedList, setSelectedList ] = useState( { id: 'root', items: initialFields } );
	const [ searchParam, setSearchParam ] = useState( '' );
	const [ isInserterOpen, setInserterOpen ] = useState( false );

	useEffect( () => {
		request( 'fields' ).then( data => setFields( data ) );
	}, [] );

	const toggleInserter = () => setInserterOpen( !isInserterOpen );

	const addItem = ( type ) => {
		const id = `${ type }_${ uniqid() }`;
		const data = {
			...fields[ type ],
			general: {
				...fields[ type ].general,
				id: {
					...fields[ type ].general.id,
					default: id
				}
			},
		};
		const newList = {
			...selectedList,
			items: [ ...selectedList.items, { id, type, data, items: [] } ],
		};
		setSelectedList( newList );
		updateSelectedList( newList );
	};

	const changeSelectedList = useCallback( params => setSelectedList( params ), [] );

	return (
		<>
			<div className={ `og-sidebar${ isInserterOpen ? ' og-sidebar--open' : '' }` }>
				<header className="og-sidebar__header">
					<div className="og-sidebar__title">{ __( 'Add a field', 'meta-box-builder' ) }</div>
					<button className="og-sidebar__close" onClick={ toggleInserter }>×</button>
				</header>
				<div className="og-sidebar__search">
					<input type="search" placeholder={ __( 'Enter field type here', 'meta-box-builder' ) } onChange={ e => setSearchParam( e.target.value ) } />
				</div>
				{
					searchParam
						? <SearchResultList onSelectField={ addItem } searchParam={ searchParam } />
						: <FieldMenu onSelectField={ addItem } />
				}
			</div>
			{ selectedList.items.length === 0 && <p className="og-none">{ __( 'There are no fields here. Click the Add Button above to add a new field.', 'meta-box-builder' ) }</p> }
			<div className="og-fields">
				{
					selectedList.items.map( ( item, index ) => (
						<SelectedItem
							key={ item.id + index }
							id={ "root" }
							item={ item }
							index={ index }
							changeSelectedList={ changeSelectedList }
						/>
					) )
				}
			</div>
			<button className="button og-add" onClick={ toggleInserter }>{ __( 'Add Field', 'meta-box-builder' ) }</button>
		</>
	);
};

export default memo( FieldsTab );
