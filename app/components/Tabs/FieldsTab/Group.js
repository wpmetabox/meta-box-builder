import Content from './Content';
import { DragSource } from 'react-dnd';
import Types from './Types';
import Header from './Header';
import { cardSource, collect } from '../../../utility/updateSelectedList';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const { useState, memo } = wp.element;
const { __ } = wp.i18n;

const Group = (props) => {
	const { connectDragSource } = props;

	const type = props.type;
	const index = props.id;

	const [expanded, setExpanded] = useState(false);
	const toggleSettings = () => setExpanded(!expanded);

	return connectDragSource(
		<div className={`og-item og-item--${type} og-collapsible${expanded ? ' og-collapsible--expanded' : ''}`}>
			<div className="d" id="list">

				<input ref={props.register} type="hidden" name={`fields-${index}-type`} defaultValue={type} />
				<Header
					type={type}
					index={index}
					expanded={expanded}
					copyItem={props.copyItem}
					removeItem={props.removeItem}
					toggleSettings={toggleSettings}
					changeSelectedList={props.changeSelectedList}
					parent={props.parent}
					indexVal={props.indexVal}
				/>
				<Tabs forceRenderTabPanel={ true } className="og-item__body og-collapsible__body">
					<TabList>
						<Tab>{ __( 'General', 'meta-box-builder' ) }</Tab>
						<Tab>{ __( 'Advanced', 'meta-box-builder' ) }</Tab>
					</TabList>
					<TabPanel>
						<Content index={ index } data={ props.data.general } />
					</TabPanel>
					<TabPanel>
						<Content index={ index } data={ props.data.advanced } />
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
};

export default memo(DragSource(Types.CARD, cardSource, collect)(Group), (prevProps, nextProps) => prevProps.id === nextProps.id);
