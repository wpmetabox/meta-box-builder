import { Context } from '../../context/CommonData/CommonDataContext';
import { uniqid, updateSelectedList } from '../../utility/functions';
import { Inserter } from '../Common/Inserter';
import Insert from './FieldsTab/Insert';
import Node from './FieldsTab/Node';

const { useContext, useState, useEffect, useCallback, memo, Fragment } = wp.element;
const { __ } = wp.i18n;

const FieldsTab = ( props ) => {
  const { MbFields } = useContext( Context );

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
      { selectedList.items.length === 0 && <p className="og-none" dangerouslySetInnerHTML={ { __html: __( 'There are no fields here. Click the <strong>+ Add Field</strong> to add a new field.', 'meta-box-builder' ) } } /> }
      <div className="og-fields">
        {
          selectedList.items.map( ( item, index ) => (
            <Fragment key={ item.id + index }>
              <Node
                id={ item.id }
                data={ item }
                parent="root"
                index={ index }
                changeSelectedList={ changeSelectedList }
              />
              <Insert index={ index } parent="root" />
            </Fragment>
          ) )
        }
      </div>
      <Inserter addItem={ addItem } />
    </>
  );
};

export default memo( FieldsTab );
