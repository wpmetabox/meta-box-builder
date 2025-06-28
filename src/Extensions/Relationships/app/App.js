import { render, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Checkbox from '../../../../../app/controls/Checkbox';
import { useFetch } from '../../../../app/hooks/useFetch';
import Result from '../../../../components/Tabs/Result';
import Side from './Side';

const App = () => {
	useEffect( () => {
		// Don't submit form when press Enter.
		jQuery( '#post' ).on( 'keypress keydown keyup', 'input', function ( e ) {
			if ( e.keyCode == 13 ) {
				e.preventDefault();
			}
		} );
	}, [] );

	const { data: sides } = useFetch( { api: 'relationships-sides', defaultValue: [] } );

	return (
		<>
			<Tabs forceRenderTabPanel={ true }>
				<TabList>
					<Tab>{ __( 'Settings', 'meta-box-builder' ) }</Tab>
					<Tab className="button button-small">{ __( 'Get PHP Code', 'meta-box-builder' ) }</Tab>
				</TabList>
				<TabPanel>
					<Checkbox
						name="settings[delete_data]"
						componentId="settings-delete-data"
						label={ __( 'Delete data in database?' ) }
						defaultValue={ !!MbbApp.settings.delete_data }
						className="relationships-plain"
						description={ __( 'Delete data in database if the relationship is deleted.', 'meta-box-builder' ) }
					/>
					<Checkbox
						name="settings[reciprocal]"
						componentId="settings-reciprocal"
						label={ __( 'Reciprocal relationship' ) }
						defaultValue={ !!MbbApp.settings.reciprocal }
						className="relationships-plain"
						description={ __( 'Enable only if two sides of the relationship are the same.', 'meta-box-builder' ) }
					/>
					{ sides.map( side => <Side key={ side.id } { ...side } /> ) }
				</TabPanel>
				<TabPanel className="react-tabs__tab-panel og-tab-panel--settings">
					<Result endPoint="relationships-generate" />
				</TabPanel>
			</Tabs>
		</>
	);
};

render( <App />, document.getElementById( 'root' ) );