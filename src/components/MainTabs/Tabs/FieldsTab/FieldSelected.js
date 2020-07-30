import React, { useState, memo } from 'react';
import { trashIcon, copyIcon, arrowDownIcon, arrowUpIcon } from '../../../../constants/icons';
import { TabPanel, Tabs, TabList, Tab } from 'react-tabs';
import GeneralContent from './FieldContent/GeneralContent';
import AdvancedContent from './FieldContent/AdvancedContent';
import { ucfirst } from '../../../../utility/functions';

const FieldSelected = (props) => {
  const type = props.data.general.type;
  const index = props.index;

  const [expanded, setExpanded] = useState(false);
  const toggleSettings = () => setExpanded(!expanded);

  if ('divider' === type) {
    return (
      <div className={`og-item og-item--${type} og-collapsible${expanded ? ' og-collapsible--expanded' : ''}`}>
        <input ref={props.register} type="hidden" name={`fields-${index}-type`} defaultValue={type} />
        <Header
          type={type}
          index={index}
          name={props.data.general.name}
          expanded={expanded}
          copyItem={props.copyItem}
          removeItem={props.removeItem}
          toggleSettings={toggleSettings}
        />
        <div className="og-item__body og-collapsible__body">
          <GeneralContent register={props.register} type={type} index={index} fieldData={props.data.general} />
        </div>
        <div className="og-item__sort">
          <button type="button" className="og-item__up" title="Move up" onClick={() => props.changePosition(props.index, 'up')}>{arrowUpIcon}</button>
          <button type="button" className="og-item__down" title="Move down" onClick={() => props.changePosition(props.index, 'down')}>{arrowDownIcon}</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`og-item og-item--${type} og-collapsible${expanded ? ' og-collapsible--expanded' : ''}`}>
      <input ref={props.register} type="hidden" name={`fields-${index}-type`} defaultValue={type} />
      <Header
        type={type}
        index={index}
        name={props.data.general.name}
        expanded={expanded}
        copyItem={props.copyItem}
        removeItem={props.removeItem}
        toggleSettings={toggleSettings}
      />
      <div className="og-item__body og-collapsible__body">
        <Tabs forceRenderTabPanel={true}>
          <TabList>
            <Tab>General</Tab>
            <Tab>Advanced</Tab>
          </TabList>
          <TabPanel>
            <GeneralContent register={props.register} type={type} index={index} fieldData={props.data.general} />
          </TabPanel>
          <TabPanel>
            <AdvancedContent register={props.register} type={type} index={index} data={props.data.advanced} />
          </TabPanel>
        </Tabs>
      </div>
      <div className="og-item__sort">
        <button type="button" className="og-item__up" title="Move up" onClick={() => props.changePosition(props.index, 'up')}>{arrowUpIcon}</button>
        <button type="button" className="og-item__down" title="Move down" onClick={() => props.changePosition(props.index, 'down')}>{arrowDownIcon}</button>
      </div>
    </div>
  );
};
const Header = (props) => {
  const duplicate = (e) => {
    e.stopPropagation();
    props.copyItem(props.type, props.index);
  };
  const remove = (e) => {
    e.stopPropagation();
    props.removeItem(props.index);
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

export default memo(FieldSelected);
