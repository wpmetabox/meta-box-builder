import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Content from './Content';
import Header from './Header';

const { useState, memo } = wp.element;
const { __ } = wp.i18n;

const FieldSelected = ( props ) => {
	const type = props.type;
	const data = props.data;

	const [ expanded, setExpanded ] = useState( true );
	const [ tabIndex, setTabIndex ] = useState( 0 );
	const toggleSettings = () => {
		setExpanded( prev => !prev );
	};

	if ( 'divider' === type ) {
		return (
			<div className={ `og-item og-item--${ type } og-collapsible${ expanded ? ' og-collapsible--expanded' : '' }` }>
				<input ref={ props.register } type="hidden" name={ `fields[${ props.id }][type]` } defaultValue={ type } />
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

	return (
		<div className={ `og-item og-item--${ type } ${ expanded ? ' og-collapsible--expanded' : 'og-collapsible' }` }>
			<input ref={ props.register } type="hidden" name={ `fields[${ props.id }][type]` } defaultValue={ type } />
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
			<Tabs selectedIndex={ tabIndex } onSelect={ index => setTabIndex( index ) } forceRenderTabPanel={ true } className="og-item__body og-collapsible__body">
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
	);
};

export default memo( ( FieldSelected ), ( prevProps, nextProps ) => prevProps.id === nextProps.id );