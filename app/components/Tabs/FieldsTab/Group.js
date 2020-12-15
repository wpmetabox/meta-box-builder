import { useFormContext } from 'react-hook-form';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { Context } from '../../../context/CommonData/CommonDataContext';
import { addGroupChild, uniqid } from '../../../utility/functions';
import { Inserter } from '../../Common/Inserter';
import Content from './Content';
import Header from './Header';
import Insert from './Insert';
import Node from './Node';

const { useState, memo, useContext, useEffect, Fragment } = wp.element;
const { __ } = wp.i18n;

const Group = ( props ) => {
	const { MbFields } = useContext( Context );

	const type = props.type;

	const { register } = useFormContext();
	const [ expanded, setExpanded ] = useState( !!props.expanded );
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
		const newChildList = [ ...children, { id, type, expanded: true, data, items: [] } ];
		setChildren( newChildList );
		props.changeSelectedList( addGroupChild( props.id, newChildList ) );
	};

	return (
		<div className={ `og-item og-item--${ type } og-collapsible${ expanded ? ' og-collapsible--expanded' : '' }` }>
			<input ref={ register } type="checkbox" readOnly style={ { display: 'none' } } name={ `fields[${ props.id }][expanded]` } checked={ expanded } />
			<input ref={ register } type="hidden" name={ `fields[${ props.id }][type]` } defaultValue={ type } />
			<Header
				type={ type }
				id={ props.id }
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
						children.map( ( item, i ) => (
							<Fragment key={ item.id }>
								<Insert parent={ props.id } index={ i } />
								<Node
									item={ item }
									parent={ props.id }
									index={ i }
									changeSelectedList={ props.changeSelectedList }
								/>
							</Fragment>
						) )
					}
					<Inserter addItem={ addItem } type="group" />
				</div>
			</div>
		</div>
	);
};

export default memo( ( Group ), ( prevProps, nextProps ) => prevProps.id === nextProps.id && prevProps.items === nextProps.items );
