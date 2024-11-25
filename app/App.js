import { Button, Flex, Tooltip } from '@wordpress/components';
import { render, useContext, useReducer, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Icon, category, cog, drawerRight } from "@wordpress/icons";
import { ErrorBoundary } from "react-error-boundary";
import AutosizeInput from 'react-input-autosize';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { ReactComponent as Logo } from './components/logo.svg';
import Sidebar from './components/Sidebar';
import Fields from './components/Tabs/Fields';
import Result from './components/Tabs/Result';
import Settings from './components/Tabs/Settings';
import ThemeCode from "./components/Tabs/ThemeCode";
import { SettingsContext, SettingsProvider } from "./contexts/SettingsContext";

const Root = () => (
	<SettingsProvider>
		<App />
	</SettingsProvider>
);

const App = () => {
	const { settings } = useContext( SettingsContext );
	const [ showSidebar, toggleSidebar ] = useReducer( show => !show, true );
	const [ title, setTitle ] = useState( MbbApp.title );
	const [ slug, setSlug ] = useState( MbbApp.slug );

	return (
		<>
			<Flex className="mb-header">
				<Flex expanded={ false }>
					<Tooltip delay={ 0 } text={ __( 'Back to all field groups', 'meta-box-builder' ) } placement='bottom'>
						<a className="mb-header__logo" href={ MbbApp.url }><Logo /></a>
					</Tooltip>

					<Flex gap={ 3 } align="baseline">
						<div className="mb-header__title" title={ __( 'Field group title', 'meta-box-builder' ) }>
							<AutosizeInput
								name="post_title"
								id="post_title"
								inputStyle={ { fontSize: 20 } }
								value={ title }
								onChange={ e => setTitle( e.target.value ) }
								placeholder={ __( 'Field group title', 'meta-box-builder' ) }
							/>
						</div>
						<Flex gap={ 0 } align="stretch" expanded={ false } className="mb-header__badge" title={ __( 'Field group ID (slug)', 'meta-box-builder' ) }>
							<Flex align="center" expanded={ false } className="mb-header__badge__name" as="label" htmlFor="post_name">
								{ __( 'ID', 'meta-box-builder' ) }
							</Flex>
							<Flex align="center" expanded={ false } className="mb-header__badge__content">
								<AutosizeInput
									name="post_name"
									id="post_name"
									inputStyle={ { fontSize: 13 } }
									value={ slug }
									onChange={ e => setSlug( e.target.value ) }
									placeholder={ __( 'Field group ID', 'meta-box-builder' ) }
								/>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
				<Flex gap={ 3 } expanded={ false } className="mb-header__actions">
					<input type="submit" data-status="draft" className="components-button is-compact is-tertiary" value={ MbbApp.status == 'publish' ? __( 'Switch to draft', 'meta-box-builder' ) : __( 'Save draft', 'meta-box-builder' ) } />
					<input type="submit" data-status="publish" className="components-button is-primary" value={ MbbApp.status == 'publish' ? __( 'Update', 'meta-box-builder' ) : __( 'Publish', 'meta-box-builder' ) } />
					<Button onClick={ toggleSidebar } className="is-compact" icon={ drawerRight } size="compact" label={ __( 'Toggle sidebar', 'meta-box-builder' ) } showTooltip={ true } isPressed={ showSidebar } />
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

					{ showSidebar && <Sidebar /> }
				</Flex>
			</ErrorBoundary>
			<input type="hidden" name="post_status" value={ MbbApp.status || 'draft' } />
			<input type="hidden" name="messages" value="" />
		</>
	);
};

const container = document.getElementById( 'poststuff' );
container.classList.add( 'mb' );
container.classList.add( 'og' );
container.id = 'mb-app';

// Use React 17 to avoid flashing issues when click to expand field settings.
render( <Root />, container );
// const root = createRoot( container );
// root.render( <Root /> );

// Remove .wp-header-end element to properly show notices.
document.querySelector( '.wp-header-end' ).remove();

const form = document.querySelector( '#post' );

// Force form to validate to force users to enter required fields.
// Use setTimeout because this attribute is dynamically added.
setTimeout( () => {
	form.removeAttribute( 'novalidate' );
}, 100 );

// Prevent submit when press Enter.
const preventSubmitWhenPressEnter = e => {
	if ( e.target.tagName === 'INPUT' && e.keyCode == 13 ) {
		e.preventDefault();
	}
};
form.addEventListener( 'keypress', preventSubmitWhenPressEnter );
form.addEventListener( 'keydown', preventSubmitWhenPressEnter );
form.addEventListener( 'keyup', preventSubmitWhenPressEnter );

// Set post status when clicking submit buttons.
form.addEventListener( 'submit', e => {
	const submitButton = e.submitter;
	const status = submitButton.dataset.status;
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
} );
