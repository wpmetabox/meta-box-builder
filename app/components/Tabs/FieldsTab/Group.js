import { trashIcon, copyIcon, arrowDownIcon, arrowUpIcon } from '../../../constants/icons';
import GeneralContent from './FieldContent/GeneralContent';
import AdvancedContent from './FieldContent/AdvancedContent';
import { ucfirst } from '../../../utility/functions';
import { DragSource } from 'react-dnd';
import Types from './Types';
import { cardSource, collect, copyItem, deleteItem } from '../../../utility/updateSelectedList';

const { useState, memo } = wp.element;
const { TabPanel } = wp.components;
const { __ } = wp.i18n;

const Group = (props) => {
  const {
    connectDragSource,
  } = props;

  const type = props.data.general.type;
  const index = props.id;

  const [expanded, setExpanded] = useState(false);
  const toggleSettings = () => setExpanded(!expanded);

  const tabs = [
    {
      name: 'general',
      title: __( 'General', 'meta-box-builder' ),
    },
    {
      name: 'advanced',
      title: __( 'Advanced', 'meta-box-builder' ),
    },
  ];
  const panels = {
    general: <GeneralContent type={type} index={index} fieldData={props.data.general} />,
    advanced: <AdvancedContent type={type} index={index} data={props.data.advanced} />
  };

  return connectDragSource(
    <div className={`og-item og-item--${type} og-collapsible${expanded ? ' og-collapsible--expanded' : ''}`}>
      <li className="d" id="list">

        <input ref={props.register} type="hidden" name={`fields-${index}-type`} defaultValue={type} />
        <Header
          type={type}
          index={index}
          name={props.data.general.name}
          expanded={expanded}
          copyItem={props.copyItem}
          removeItem={props.removeItem}
          toggleSettings={toggleSettings}
          changeSelectedList={props.changeSelectedList}
          parent={props.parent}
          indexVal={props.indexVal}
        />
        <TabPanel className="og-item__body og-collapsible__body" tabs={ tabs }>{ tab => panels[tab.name] }</TabPanel>
      </li>
    </div>
  );
};

const Header = (props) => {
  const duplicate = (e) => {
    e.stopPropagation();
    const newSelectedList = copyItem(props.index, props.parent, props.indexVal)
    props.changeSelectedList(newSelectedList)
  };
  const remove = (e) => {
    e.stopPropagation();
    const newSelectedList = deleteItem(props.index, props.parent, props.indexVal)
    props.changeSelectedList(newSelectedList)
  };

  return (
    <div className="og-item__header og-collapsible__header" onClick={props.toggleSettings}>
      <div className="og-item__title" id={`og-item__title__${props.index}`}>{props.name || ucfirst(props.type)}</div>
      <div className="og-item__actions">
        <span className="og-item__type">{props.type}</span>
        <span className="og-item__action og-item__action--remove" title="Remove" onClick={remove}>{trashIcon}</span>
        <span className="og-item__action og-item__action--duplicate" title="Duplicate" onClick={duplicate}>{copyIcon}</span>
        <span className="og-item__action og-item__action--toggle" title="Toggle Settings">{props.expanded ? arrowUpIcon : arrowDownIcon}</span>
      </div>
    </div>
  );
};

export default memo(DragSource(Types.CARD, cardSource, collect)(Group), (prevProps, nextProps) => prevProps.id === nextProps.id);
