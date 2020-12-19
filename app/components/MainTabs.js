import dotProp from 'dot-prop';
import { FormProvider, useForm } from 'react-hook-form';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { actions as commonDataActions } from '../context/CommonData/CommonDataContext';
import { actions as ConditionalActions, Context } from '../context/ConditionalList/ConditionalContext';
import { actions } from '../context/Generator/GeneratorContext';
import Result from './Result';
import FieldsTab from './Tabs/FieldsTab';
import SettingsTab from './Tabs/SettingsTab';

const { useEffect, useContext, memo } = wp.element;
const { __ } = wp.i18n;

const MainTabs = () => {
	const methods = useForm();

	const state = useContext( Context );

	const onSubmit = data => {
		actions.generatePHPCode( data );
	};

	const onPublish = data => {
		document.getElementById( 'data_raw' ).value = JSON.stringify( data );
	};

	const onSelect = ( index ) => {
		const isGetCodeTab = index === 2;
		if ( isGetCodeTab ) {
			document.getElementById( 'submit-form' ).click();
		}
	};

	useEffect( () => {
		commonDataActions.getMBFields();
		document.querySelector( '#publish' ).addEventListener( 'click', () => {
			document.getElementById( 'btn-on-publish' ).click();
		} );
		if ( MbbApp.settings && MbbApp.settings.conditionalList ) {
			ConditionalActions.updateConditionalList( 'initial', JSON.parse( MbbApp.settings.conditionalList ) );
		}
	}, [] );

	return (
		<FormProvider { ...methods }>
			<form onSubmit={ methods.handleSubmit( onSubmit ) } id='myForm'>
				<Tabs forceRenderTabPanel={ true } onSelect={ onSelect }>
					<TabList>
						<Tab>{ __( 'Fields', 'meta-box-builder' ) }</Tab>
						<Tab>{ __( 'Settings', 'meta-box-builder' ) }</Tab>
						<Tab className="button button-small">{ __( 'Get PHP Code', 'meta-box-builder' ) }</Tab>
					</TabList>
					<TabPanel>
						<FieldsTab fields={ Object.values( dotProp.get( MbbApp.data_raw, 'fields', {} ) ) } />
					</TabPanel>
					<TabPanel className="react-tabs__tab-panel og-tab-panel--settings">
						<SettingsTab defaultValues={ MbbApp.data_raw } />
					</TabPanel>
					<TabPanel className="react-tabs__tab-panel og-tab-panel--settings">
						<Result />
					</TabPanel>
				</Tabs>
				<button type="submit" style={ { display: 'none' } } id="submit-form" />
			</form>
			<input type="hidden" id="data_raw" name="data_raw" />

			<button style={ { display: 'none' } } id="btn-on-publish" onClick={ methods.handleSubmit( onPublish ) }>Publish</button>
		</FormProvider>
	);
};

export default memo( MainTabs );