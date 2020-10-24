
import FieldMenu from './FieldMenu';
import SearchResultList from './SearchResultList';

const { useState } = wp.element;
const { Button, Dropdown } = wp.components;

const { __ } = wp.i18n;

export const SideMenu = ( props ) => {
    const [ searchParam, setSearchParam ] = useState( '' );

    return (
        <Dropdown
            style={ { backgroundColor: 'red' } }
            className="my-container-class-name"
            contentClassName="my-popover-content-classname"
            position="bottom right"
            renderToggle={ ( { isOpen, onToggle } ) => (
                <Button isPrimary onClick={ onToggle } aria-expanded={ isOpen }>
                    Add Field
                </Button>
            ) }
            renderContent={ () => (
                <div>
                    <header className="og-sidebar__header">
                        <div className="og-sidebar__title">{ __( 'Add a field', 'meta-box-builder' ) }</div>
                    </header>
                    <div className="og-sidebar__search">
                        <input type="search" placeholder={ __( 'Enter field type here', 'meta-box-builder' ) } onChange={ e => setSearchParam( e.target.value ) } />
                    </div>
                    {
                        searchParam
                            ? <SearchResultList onSelectField={ props.addItem } searchParam={ searchParam } />
                            : <FieldMenu onSelectField={ props.addItem } />
                    }
                </div>
            ) }
        />
    );
};
