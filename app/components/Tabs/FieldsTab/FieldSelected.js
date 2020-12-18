import { useFormContext } from 'react-hook-form';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Content from './Content';

const { useState, memo } = wp.element;
const { __ } = wp.i18n;

const FieldSelected = ( props ) => {
	const type = props.type;
	const data = props.data;

	const { register } = useFormContext();
	const [ tabIndex, setTabIndex ] = useState( 0 );

	if ( [ 'divider', 'tab' ].includes( type ) ) {
		return <div className="og-item__body og-collapsible__body">
			<Content fieldId={ props.id } data={ data.general } />
		</div>;
	}

	return <Tabs selectedIndex={ tabIndex } onSelect={ index => setTabIndex( index ) } forceRenderTabPanel={ true } className="og-item__body og-collapsible__body">
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
	</Tabs>;
};

export default memo( ( FieldSelected ), ( prevProps, nextProps ) => prevProps.id === nextProps.id );