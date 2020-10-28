import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { Context } from '../../../context/CommonData/CommonDataContext';
import { addGroupChild, uniqid } from '../../../utility/functions';
import { Inserter } from '../../Common/Inserter';
import Content from './Content';
import Header from './Header';
import Insert from './Insert';
import Node from './Node';


const { useState, memo, useContext, useEffect } = wp.element;
const { __ } = wp.i18n;

const Group = ( props ) => {

	const { MbFields } = useContext( Context );

	const type = props.type;

	const [ expanded, setExpanded ] = useState( true );
	const [ children, setChildren ] = useState( props.items );

	useEffect( () => {
		setChildren( props.items );
		return;
	}, [ props.items ] );

	const toggleSettings = () => setExpanded( prev => !prev );

	const addItem = ( type ) => {

		const id = `${ type }_${ uniqid() }`;
		const data = {
			...MbFields[ type ],
		};
		const newChildList = [ ...children, { id, type, data, items: [] } ];
		setChildren( newChildList );
		addGroupChild( props.id, newChildList );
	};

	return (
		<div className={ `og-item og-item--${ type } og-collapsible${ expanded ? ' og-collapsible--expanded' : '' }` }>
			<div className="d" id="list">

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
						<Content fieldId={ props.id } data={ props.data.general } />
					</TabPanel>
					<TabPanel>
						<Content fieldId={ props.id } data={ props.data.advanced } />
					</TabPanel>
				</Tabs>
				<div className={ `og-group-fields og-field${ !children.length ? ' og-group-fields--empty' : '' }` }>
					<div className="og-label">{ __( 'Sub fields', 'meta-box-builder' ) }</div>
					<div className="og-input">
						{
							children.map( ( item, i ) => <div key={ item.id }>
								<Insert parent={ props.id } index={ i } />
								<Node
									key={ item.id }
									id={ item.id }
									data={ item }
									parent={ props.id }
									index={ i }
									changeSelectedList={ props.changeSelectedList }
								/>
							</div> )
						}
						<Inserter addItem={ addItem } type="group" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo( ( Group ), ( prevProps, nextProps ) => prevProps.id === nextProps.id && prevProps.items === nextProps.items );
