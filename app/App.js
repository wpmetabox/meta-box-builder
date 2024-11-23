import { Button, Flex, Tooltip } from '@wordpress/components';
import { render, useContext, useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Icon, category, cog, drawerRight } from "@wordpress/icons";
import { ErrorBoundary } from "react-error-boundary";
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { ReactComponent as Logo } from './components/logo.svg';
import Sidebar from './components/Sidebar';
import Fields from './components/Tabs/Fields';
import Result from './components/Tabs/Result';
import Settings from './components/Tabs/Settings';
import ThemeCode from "./components/Tabs/ThemeCode";
import { SettingsContext, SettingsProvider } from "./contexts/SettingsContext";

const Root = () => {
	const forceValidate = () => document.querySelector( '#post' ).removeAttribute( 'novalidate' );

	useEffect( () => {
		const publishButton = document.querySelector( '#publish' );
		const saveButton = document.querySelector( '#save-post' );
		if ( publishButton ) {
			publishButton.addEventListener( 'click', forceValidate );
		}
		if ( saveButton ) {
			saveButton.addEventListener( 'click', forceValidate );
		}

		// Don't submit form when press Enter.
		jQuery( '#post' ).on( 'keypress keydown keyup', 'input', function ( e ) {
			if ( e.keyCode == 13 ) {
				e.preventDefault();
			}
		} );
	}, [] );

	return (
		<SettingsProvider>
			<App />
		</SettingsProvider>
	);
};

const App = () => {
	const { settings } = useContext( SettingsContext );
	const [ toggle, setToggle ] = useState( true );

	return (
		<>
			<Flex className="mb-header">
				<Flex gap={ 2 } expanded={ false }>
					<Tooltip delay={ 0 } text={ __( 'Back to all field groups', 'meta-box-builder' ) } placement='bottom'>
						<a className="mb-header__logo" href={ MbbApp.url }><Logo /></a>
					</Tooltip>
					<h1>{ ( MbbApp.action == 'add' ) ? __( 'Add Field Group', 'meta-box-builder' ) : __( 'Edit Field Group', 'meta-box-builder' ) }</h1>
					{ !( MbbApp.action == 'add' ) && <a className="page-title-action" href={ MbbApp.add }>{ __( 'Add New', 'meta-box-builder' ) }</a> }
				</Flex>
				<Flex gap={ 3 } expanded={ false } className="mb-header__actions">
					<input type="submit" name="draft" className="components-button is-compact is-tertiary mb-header__action--draft" value={ ( MbbApp.status == 'publish' ) ? __( 'Switch to draft', 'meta-box-builder' ) : __( 'Save draft', 'meta-box-builder' ) } />
					<input type="submit" name="publish" className="mb-header__action--publish components-button is-primary" value={ ( MbbApp.status == 'publish' ) ? __( 'Update', 'meta-box-builder' ) : __( 'Publish', 'meta-box-builder' ) } />
					<Button onClick={ () => setToggle( !toggle ) } className="is-compact" icon={ drawerRight } size="compact" label={ __( 'Toggle sidebar', 'meta-box-builder' ) } showTooltip={ true } isPressed={ toggle } />
				</Flex>
			</Flex>
			<ErrorBoundary fallback={ <h2>{ __( 'Something went wrong. Please try again!', 'meta-box-builder' ) }</h2> }>
				<Flex gap={ 0 } align="flex-start" className="mb-body">
					<div className="mb-body__inner">
						<div className="mb-body__main">
							<div className="wp-header-end" />

							<Tabs forceRenderTabPanel={ true } className="react-tabs mb-tabs">
								<TabList className="react-tabs__tab-list og-tabs--main">
									<Tab>
										<Icon icon={ category } />
										{ __( 'Fields', 'meta-box-builder' ) }
									</Tab>
									<Tab>
										<Icon icon={ cog } />
										{ __( 'Settings', 'meta-box-builder' ) }
									</Tab>
									<Tab className="button button-small">{ __( 'Get PHP Code', 'meta-box-builder' ) }</Tab>
								</TabList>
								<TabPanel>
									<Fields fields={ MbbApp.fields } />
								</TabPanel>
								<TabPanel className="react-tabs__tab-panel og-tab-panel--settings">
									<Settings />
								</TabPanel>
								<TabPanel className="react-tabs__tab-panel og-tab-panel--settings">
									<Result endPoint="generate" />
								</TabPanel>
							</Tabs>
							<br />
							{
								MbbApp.fields.length > 0 && settings.object_type !== 'block' &&
								<div className="mb-box">
									<div className="mb-box__header">{ __( "Theme code", "meta-box-builder" ) }</div>
									<div className="mb-box__body">
										<ThemeCode settings={ settings } fields={ MbbApp.fields } />
									</div>
								</div>
							}
						</div>
					</div>

					{ toggle && <Sidebar /> }
				</Flex>
			</ErrorBoundary>
			<input type="hidden" name="post_status" value={ MbbApp.status || 'draft' } />
			<input type="hidden" name="messages" value="" />
		</>
	);
};

const submit = e => {
	const submitButton = e.submitter;
	const status = submitButton.getAttribute( 'name' );
	const originalStatus = document.querySelector( '#original_post_status' ).value;
	if ( originalStatus !== status ) {
		document.querySelector( '[name="messages"]' ).setAttribute( 'name', MbbApp.status !== 'publish' ? 'publish' : 'save' );
	}
	if ( originalStatus === 'auto-draft' && status === 'draft' ) {
		document.querySelector( '[name="messages"]' ).setAttribute( 'name', 'save' );
	}

	submitButton.disabled = true;
	submitButton.setAttribute( 'value', MbbApp.saving );
	document.querySelector( '[name="post_status"]' ).setAttribute( 'value', status );
};

document.querySelector( '.wp-header-end' ).remove();

const container = document.getElementById( 'poststuff' );
container.classList.add( 'mb' );
container.classList.add( 'og' );
container.id = 'mb-app';

// const root = createRoot( container );
// root.render( <Root /> );

// Use React 17 to avoid flashing issues when click to expand field settings.
render( <Root />, container );

document.querySelector( '#post' ).addEventListener( 'submit', submit );
