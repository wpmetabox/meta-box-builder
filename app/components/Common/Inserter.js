import { request } from '../../utility/functions';
import { FieldMenu } from './FieldMenu';
import { SearchResultList } from './SearchResultList';

const { useState, useEffect } = wp.element;
const { Button, Dropdown } = wp.components;
const { __ } = wp.i18n;

export const Inserter = ( props ) => {
    const [ searchParam, setSearchParam ] = useState( '' );
	const [ fieldTypes, setFieldTypes ] = useState( {} );

	useEffect( () => {
		request( 'field-types' ).then( data => setFieldTypes( data ) );
	}, [] );

    return (
        <Dropdown
            className="og-inserter"
            position="top left"
            renderToggle={ ( { isOpen, onToggle } ) => (
                <Button isPrimary onClick={ onToggle } aria-expanded={ isOpen }>{ __( 'Add Field', 'meta-box-builder' ) }</Button>
            ) }
            renderContent={ () => (
                <>
                    <div className="og-inserter__search">
                        <input type="search" placeholder={ __( 'Search for a field type', 'meta-box-builder' ) } onChange={ e => setSearchParam( e.target.value ) } />
                    </div>
                    {
                        searchParam
                            ? <SearchResultList fieldTypes={ fieldTypes } onSelectField={ props.addItem } searchParam={ searchParam } />
                            : <FieldMenu fieldTypes={ fieldTypes } onSelectField={ props.addItem } />
                    }
                </>
            ) }
        />
    );
};
