import { DragSource } from 'react-dnd';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { cardSource, collect } from '../../../utility/updateSelectedList';
import Content from './Content';
import Header from './Header';
import Types from './Types';

const { useState, memo } = wp.element;
const { __ } = wp.i18n;

const FieldSelected = ( props ) => {
	const { connectDragSource } = props;
	const type = props.type;
	const data = props.data;

	const [ expanded, setExpanded ] = useState( true );
	const toggleSettings = () => setExpanded( !expanded );

	if ( 'divider' === type ) {
		return connectDragSource(
			<div className={ `og-item og-item--${ type } og-collapsible${ expanded ? ' og-collapsible--expanded' : '' }` }>
				<input ref={ props.register } type="hidden" name={ `fields-${ props.id }-type` } defaultValue={ type } />
				<Header
					type={ type }
					id={ props.id }
					copyItem={ props.copyItem }
					removeItem={ props.removeItem }
					toggleSettings={ toggleSettings }
					index={ props.index }
				/>
				<div className="og-item__body og-collapsible__body">
					<Content index={ props.id } data={ data.general } />
				</div>
			</div>
		);
	}

	return connectDragSource(
		<div className={ `og-item og-item--${ type } og-collapsible${ expanded ? ' og-collapsible--expanded' : '' }` }>
			<div className="d" id="leaf">
				<input ref={ props.register } type="hidden" name={ `fields-${ props.id }-type` } defaultValue={ type } />
				<Header
					type={ type }
					id={ props.id }
					copyItem={ props.copyItem }
					removeItem={ props.removeItem }
					toggleSettings={ toggleSettings }
					changeSelectedList={ props.changeSelectedList }
					parent={ props.parent }
					index={ props.index }
				/>
				<Tabs forceRenderTabPanel={ true } className="og-item__body og-collapsible__body">
					<TabList>
						<Tab>{ __( 'General', 'meta-box-builder' ) }</Tab>
						<Tab>{ __( 'Advanced', 'meta-box-builder' ) }</Tab>
					</TabList>
					<TabPanel>
						<Content fieldId={ props.id } data={ data.general } />
					</TabPanel>
					<TabPanel>
						<Content fieldId={ props.id } data={ data.advanced } />
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
};

export default memo( DragSource( Types.CARD, cardSource, collect )( FieldSelected ), ( prevProps, nextProps ) => prevProps.props.id === nextProps.props.id );