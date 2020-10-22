import { Context } from '../../context/CommonData/CommonDataContext';
import { uniqid, updateSelectedList } from '../../utility/functions';
import { SideMenu, toggleSideMenu } from '../Common/SideMenu';
import Insert from './FieldsTab/Insert';
import Node from './FieldsTab/Node';

const { useContext, useState, useEffect, useCallback, memo, Fragment } = wp.element;
const { __ } = wp.i18n;

const FieldsTab = ( props ) => {
  const { state } = useContext( Context );
  const { MbFields } = state;

  const initialFields = props.fields || [];
  const [ selectedList, setSelectedList ] = useState( { id: 'root', items: initialFields } );

  const addItem = ( type ) => {
    const id = `${ type }_${ uniqid() }`;
    const data = {
      ...MbFields[ type ],
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
      <SideMenu addItem={ addItem } />
      { selectedList.items.length === 0 && <p className="og-none">{ __( 'There are no fields here. Click the Add Button above to add a new field.', 'meta-box-builder' ) }</p> }
      <div className="og-fields">
        {
          selectedList.items.map( ( item, index ) => (
            <Fragment key={ item.id + index }>
              <Node
                id={ item.id }
                item={ item }
                parent="root"
                index={ index }
                changeSelectedList={ changeSelectedList }
              />
              <Insert index={ index } parent="root" />
            </Fragment>
          ) )
        }
      </div>
      <button className="button og-add" onClick={ toggleSideMenu }>{ __( 'Add Field', 'meta-box-builder' ) }</button>
    </>
  );
};

export default memo( FieldsTab );
