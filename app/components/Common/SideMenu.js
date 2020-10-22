import FieldMenu from "./FieldMenu";
import SearchResultList from "./SearchResultList";

const { useState } = wp.element;
const { __ } = wp.i18n;

const componentId = "side_menu";

export const toggleSideMenu = () => {
    const sideMenu = document.getElementById( componentId );
    const isOpening = sideMenu.classList.contains( 'og-sidebar--open' );
    isOpening ? sideMenu.classList.remove( 'og-sidebar--open' ) : sideMenu.classList.add( 'og-sidebar--open' );
};

export const SideMenu = ( props ) => {
    const [ searchParam, setSearchParam ] = useState( '' );

    return (
        <div id={ componentId } className='og-sidebar' >
            <header className="og-sidebar__header">
                <div className="og-sidebar__title">{ __( 'Add a field', 'meta-box-builder' ) }</div>
                <button className="og-sidebar__close" onClick={ toggleSideMenu }>×</button>
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
    );
};
