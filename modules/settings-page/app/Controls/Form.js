import dotProp from 'dot-prop';
import { SettingsContext } from '../SettingsContext';
import List from './List';

const { __ } = wp.i18n;
const { useContext, useState } = wp.element;

const Form = ( { label, name } ) => {
	const { settings, updateSettings } = useContext( SettingsContext );
	const [ currentTab ] = useState( {
		id: '',
		label: ''
	} );

	const addItem = e => {
		e.preventDefault();

		if ( ! currentTab ) {
			return;
		}

		let newSettings = { ...settings };
		const newItems = { ...settings.tabs, ...{ [currentTab.id]: currentTab.label } };

		dotProp.set( newSettings, 'tabs', newItems );
		updateSettings( newSettings );
	}

	const deleteItem = i => {
		let newSettings = { ...settings };
		const newItems = Object.entries( settings.tabs ).filter( ( item, index ) => index !== i );

		dotProp.set( newSettings, 'tabs', Object.fromEntries(newItems) );
		updateSettings( newSettings );
	}

	const setUpdate = e => {
		const items = settings.tabs;

		if ( 'mbspui-tab-value' === e.target.id ) { // if modify Label => update value of Tab[ID]
			items[ e.target.getAttribute( 'data' ) ] = e.target.value;
		}

		if ( 'mbspui-tab-key' === e.target.id ) { // if modify ID => first: delete Tab, then: add new Tab with old ID
			delete Object.assign( items, { [ e.target.value ]: items[ e.target.name ] } )[ e.target.name ];
		}

		let newSettings = { ...settings };
		dotProp.set( newSettings, 'tabs', items );
		updateSettings( newSettings );
	}

	return (
		<div className="mb-spui-field">
			<label className="mb-spui-label" htmlFor={ name }>
				{ label }
			</label>

			<div className="mb-spui-tabs">
				<List items={ settings.tabs } deleteItem={ deleteItem } setUpdate={ setUpdate }/>

				<button type="button" className="button" onClick={ addItem }>{ __( '+ Add New', 'mb-settings-page-ui' ) }</button>
			</div>
		</div>
	);
};

export default Form;