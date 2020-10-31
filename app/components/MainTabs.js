import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FormProvider, useForm } from 'react-hook-form';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { actions as commonDataActions } from '../context/CommonData/CommonDataContext';
import { actions, formatParams } from '../context/Generator/GeneratorContext';
import { fillFieldsValues } from '../utility/functions';
import Result from './Result';
import FieldsTab from './Tabs/FieldsTab';
import SettingsTab from './Tabs/SettingsTab';

const { useEffect } = wp.element;
const { __ } = wp.i18n;
const SUBMIT_FORM_BUTTON = 'submit-form';

const MainTabs = () => {
	const { handleSubmit, register, control } = useForm();
	const methods = useForm();
	const onSubmit = data => {
		actions.generatePHPCode( data );
	};

	const onPublish = data => {
		const inputData = document.getElementById( 'post_content' );
		const inputExcerpt = document.getElementById( 'post_excerpt' );
		inputData.value = JSON.stringify( formatParams( data ) );
		inputExcerpt.value = JSON.stringify( fillFieldsValues() );
	};

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
	}, [] );

	const fields = MbbApp.settings ? MbbApp.settings.items : [];

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
							<DndProvider backend={ HTML5Backend }>
								<FieldsTab fields={ fields } />
							</DndProvider>
						</TabPanel>
						<TabPanel>
							<SettingsTab register={ register } />
						</TabPanel>
						<TabPanel>
							<Result />
						</TabPanel>
					</Tabs>
					<button type="submit" style={ { display: 'none' } } id={ SUBMIT_FORM_BUTTON } />
				</form>
				<input type="hidden" id="post_excerpt" name="post_excerpt" />
				<input type="hidden" id="post_content" name="post_content" />

				<button style={ { display: 'none' } } id="btn-on-publish" onClick={ handleSubmit( onPublish ) }>Publish</button>
			</FormProvider>
		</>
	);
};

export default MainTabs;