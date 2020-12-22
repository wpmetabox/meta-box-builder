import dotProp from 'dot-prop';
import { FormProvider, useForm } from 'react-hook-form';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { actions as ConditionalActions } from '../context/ConditionalList/ConditionalContext';
import FieldsTab from './Tabs/FieldsTab';
import Result from './Tabs/Result';
import SettingsTab from './Tabs/SettingsTab';

const { useEffect, useContext, memo } = wp.element;
const { __ } = wp.i18n;

const MainTabs = () => {
	const methods = useForm();

	const onPublish = data => {
		document.getElementById( 'data_raw' ).value = JSON.stringify( data );
	};

	useEffect( () => {
		document.querySelector( '#publish' ).addEventListener( 'click', () => {
			document.getElementById( 'btn-on-publish' ).click();
		} );
		if ( MbbApp.settings && MbbApp.settings.conditionalList ) {
			ConditionalActions.updateConditionalList( 'initial', JSON.parse( MbbApp.settings.conditionalList ) );
		}
	}, [] );

	return (
		<FormProvider { ...methods }>
			<form>
				<Tabs forceRenderTabPanel={ true }>
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
			</form>
			<input type="hidden" id="data_raw" name="data_raw" />

			<button style={ { display: 'none' } } id="btn-on-publish" onClick={ methods.handleSubmit( onPublish ) }>Publish</button>
		</FormProvider>
	);
};

export default memo( MainTabs );