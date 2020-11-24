import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FormProvider, useForm } from 'react-hook-form';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { actions as commonDataActions } from '../context/CommonData/CommonDataContext';
import { actions as ConditionalActions, Context } from '../context/ConditionalList/ConditionalContext';
import { actions } from '../context/Generator/GeneratorContext';
import { fillFieldsValues } from '../utility/functions';
import Result from './Result';
import FieldsTab from './Tabs/FieldsTab';
import SettingsTab from './Tabs/SettingsTab';

const { useEffect, useContext } = wp.element;
const { __ } = wp.i18n;
const SUBMIT_FORM_BUTTON = 'submit-form';

const MainTabs = () => {
	const { handleSubmit, register, control } = useForm();
	const methods = useForm();

	const state = useContext( Context );

	const onSubmit = data => {
		actions.generatePHPCode( data );
	};

	const onPublish = data => document.getElementById( 'data' ).value = JSON.stringify( fillFieldsValues( data, state ) );

	const onSelect = ( index ) => {
		const isGetCodeTab = index === 2;
		if ( isGetCodeTab ) {
			document.getElementById( SUBMIT_FORM_BUTTON ).click();
		}
	};

	useEffect( () => {
		commonDataActions.getMBFields();
		document.querySelector( '#publish' ).addEventListener( 'click', () => {
			document.getElementById( 'btn-on-publish' ).click();
		} );
		if ( MbbApp.settings && MbbApp.settings.conditionalList ) {
			ConditionalActions.updateConditionalList( JSON.parse( MbbApp.settings.conditionalList ), 'initial' );
		}
	}, [] );
	const fields = MbbApp.settings ? MbbApp.settings.fields : [];
	const settings = MbbApp.settings ? MbbApp.settings.settings : null;

	return (
		<>
			<FormProvider { ...methods } register={ register } control={ control }>
				<form onSubmit={ handleSubmit( onSubmit ) } id='myForm'>
					<Tabs forceRenderTabPanel={ true } onSelect={ onSelect }>
						<TabList>
							<Tab>{ __( 'Fields', 'meta-box-builder' ) }</Tab>
							<Tab>{ __( 'Settings', 'meta-box-builder' ) }</Tab>
							<Tab>{ __( 'Code', 'meta-box-builder' ) }</Tab>
						</TabList>
						<TabPanel>
							<DndProvider backend={ HTML5Backend } options={ { enableTouchEvents: false, enableMouseEvents: true } }>
								<FieldsTab fields={ fields } />
							</DndProvider>
						</TabPanel>
						<TabPanel className="react-tabs__tab-panel og-tab-settings">
							<SettingsTab register={ register } defaultValues={ settings } />
						</TabPanel>
						<TabPanel className="react-tabs__tab-panel og-tab-code">
							<Result />
						</TabPanel>
					</Tabs>
					<button type="submit" style={ { display: 'none' } } id={ SUBMIT_FORM_BUTTON } />
				</form>
				<input type="hidden" id="data" name="data" />

				<button style={ { display: 'none' } } id="btn-on-publish" onClick={ handleSubmit( onPublish ) }>Publish</button>
			</FormProvider>
			<div style={ { marginTop: 32 } } onClick={ handleSubmit( onPublish ) } >test</div>
		</>
	);
};

export default MainTabs;