import { DragSource } from 'react-dnd';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { Context } from '../../../context/CommonData/CommonDataContext';
import { addGroupChild, uniqid } from '../../../utility/functions';
import { cardSource, collect } from '../../../utility/updateSelectedList';
import { SideMenu } from '../../Common/SideMenu';
import Content from './Content';
import Header from './Header';
import Insert from './Insert';
import Node from './Node';
import Types from './Types';


const { useState, memo, useContext } = wp.element;
const { __ } = wp.i18n;

const Group = ( props ) => {
	const { connectDragSource } = props;
	const { state } = useContext( Context );
	const { MbFields } = state;

	const type = props.type;
	const index = props.id;

	const [ expanded, setExpanded ] = useState( false );
	const [ childs, setChilds ] = useState( props.items );

	const toggleSettings = () => setExpanded( !expanded );

	const addItem = ( type ) => {
		const id = `${ type }_${ uniqid() }`;
		const data = {
			...MbFields[ type ],
		};
		const newChildList = [ ...childs, { id, type, data, items: [] } ];
		setChilds( newChildList );
		addGroupChild( index, newChildList );
	};

	return connectDragSource(
		<div className={ `og-item og-item--${ type } og-collapsible${ expanded ? ' og-collapsible--expanded' : '' }` }>
			<div className="d" id="list">

				<input ref={ props.register } type="hidden" name={ `fields-${ index }-type` } defaultValue={ type } />
				<Header
					type={ type }
					index={ index }
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
						<Content index={ index } data={ props.data.general } />
					</TabPanel>
					<TabPanel>
						<Content index={ index } data={ props.data.advanced } />
					</TabPanel>
				</Tabs>
				<div className="og-group-fields">
					{
						childs.map( ( item, i ) => <div key={ item.id }>
							<Insert parent={ id } index={ i } />
							<Node
								key={ item.id }
								id={ item.id }
								item={ item }
								parent={ id }
								index={ i }
								changeSelectedList={ props.changeSelectedList }
							/>
						</div> )
					}
					<Insert index={ props.items.length } parent={ id } />
					<SideMenu addItem={ addItem } />
				</div>
			</div>
		</div>
	);
};

export default memo( DragSource( Types.CARD, cardSource, collect )( Group ), ( prevProps, nextProps ) => prevProps.id === nextProps.id );
