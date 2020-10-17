import GeneralContent from './FieldContent/GeneralContent';
import AdvancedContent from './FieldContent/AdvancedContent';
import { ucfirst } from '../../../utility/functions';
import { DragSource } from 'react-dnd';
import Types from './Types';
import { cardSource, collect, copyItem, deleteItem } from '../../../utility/updateSelectedList';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const { useState, memo } = wp.element;
const { Dashicon } = wp.components;
const { __ } = wp.i18n;

const FieldSelected = ( props ) => {
  const { connectDragSource } = props;
  const type = props.data.general.type;
  const index = props.id;
  const [ expanded, setExpanded ] = useState( false );
  const toggleSettings = () => setExpanded( !expanded );
  if ( 'divider' === type ) {
    return connectDragSource(
      <div className={ `og-item og-item--${ type } og-collapsible${ expanded ? ' og-collapsible--expanded' : '' }` }>
        <input ref={ props.register } type="hidden" name={ `fields-${ index }-type` } defaultValue={ type } />
        <Header
          type={ type }
          index={ index }
          name={ props.data.general.name }
          expanded={ expanded }
          copyItem={ props.copyItem }
          removeItem={ props.removeItem }
          toggleSettings={ toggleSettings }
        />
        <div className="og-item__body og-collapsible__body">
          <GeneralContent type={ type } index={ index } fieldData={ props.data.general } />
        </div>
      </div>
    );
  }

  return connectDragSource(
    <div className={ `og-item og-item--${ type } og-collapsible${ expanded ? ' og-collapsible--expanded' : '' }` }>
      <div className="d" id="leaf">
        <input ref={ props.register } type="hidden" name={ `fields-${ index }-type` } defaultValue={ type } />
        <Header
          type={ type }
          index={ index }
          name={ props.data.general.name }
          expanded={ expanded }
          copyItem={ props.copyItem }
          removeItem={ props.removeItem }
          toggleSettings={ toggleSettings }
          changeSelectedList={ props.changeSelectedList }
          parent={ props.parent }
          indexVal={ props.indexVal }
        />
        <Tabs forceRenderTabPanel={ true } className="og-item__body og-collapsible__body">
          <TabList>
            <Tab>{ __( 'General', 'meta-box-builder' ) }</Tab>
            <Tab>{ __( 'Advanced', 'meta-box-builder' ) }</Tab>
          </TabList>
          <TabPanel>
            <GeneralContent type={ type } index={ index } fieldData={ props.data.general } />
          </TabPanel>
          <TabPanel>
            <AdvancedContent type={ type } index={ index } data={ props.data.advanced } />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};
const Header = ( props ) => {
  const duplicate = ( e ) => {
    e.stopPropagation();
    const newSelectedList = copyItem( props.index, props.parent, props.indexVal );
    props.changeSelectedList( newSelectedList );
  };
  const remove = ( e ) => {
    e.stopPropagation();
    const newSelectedList = deleteItem( props.index, props.parent, props.indexVal );
    props.changeSelectedList( newSelectedList );
  };

  return (
    <div className="og-item__header og-collapsible__header" onClick={ props.toggleSettings }>
      <div className="og-item__title" id={ `og-item__title__${ props.index }` }>{ props.name || ucfirst( props.type ) }</div>
      <div className="og-item__actions">
        <span className="og-item__type">{ props.type }</span>
        <span className="og-item__action og-item__action--remove" title="Remove" onClick={ remove }><Dashicon icon="trash" /></span>
        <span className="og-item__action og-item__action--duplicate" title="Duplicate" onClick={ duplicate }><Dashicon icon="admin-page" /></span>
        <span className="og-item__action og-item__action--toggle" title="Toggle Settings"><Dashicon icon="arrow-down-alt2" /></span>
      </div>
    </div>
  );
};

export default memo( DragSource( Types.CARD, cardSource, collect )( FieldSelected ), ( prevProps, nextProps ) => prevProps.id === nextProps.id );