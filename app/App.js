import { render } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { ErrorBoundary } from "react-error-boundary";
import Header from './components/Header';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import { inside } from "./functions";
import useFieldSettingsPanel from "./hooks/useFieldSettingsPanel";
import useSidebarPanel from "./hooks/useSidebarPanel";

const Layout = ( { children } ) => {
	const { setSidebarPanel } = useSidebarPanel();
	const { setActiveField } = useFieldSettingsPanel();

	const hideSidebar = e => {
		if ( inside( e.target, '.mb-main, .mb-sidebar' ) ) {
			return;
		}
		setSidebarPanel( '' );
		setActiveField( {} );
	};

	return (
		<ErrorBoundary fallback={ <p>{ __( 'Something went wrong. Please try again!', 'meta-box-builder' ) }</p> }>
			<Header />

			<div className="mb-body">
				<div className="mb-body__inner" onClick={ hideSidebar }>
					{ children }
				</div>

				<Sidebar />
			</div >

			<input type="hidden" name="post_status" value={ MbbApp.status || 'draft' } />
			<input type="hidden" name="messages" value="" />
			<input type="hidden" name="mbb_nonce" value={ MbbApp.nonce_save } />
		</ErrorBoundary>
	);
};

const App = () => (
	<Layout>
		<Main />
	</Layout>
);

const container = document.getElementById( 'poststuff' );
container.classList.add( 'mb' );
container.classList.add( 'og' );
container.id = 'mb-app';

// Use React 17 to avoid flashing issues when click to expand field settings.
render( <App />, container );
// const root = createRoot( container );
// root.render( <App /> );

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
