import { createRoot } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { ErrorBoundary } from 'react-error-boundary';
import { updateNewPostUrl } from '../../../../app/functions';
import Header from './components/Header';
import Main from './components/Main';
import Notification from './components/Notification';
import { initSaveForm } from './save';

const Layout = ( { children } ) => (
	<ErrorBoundary fallback={ <p>{ __( 'Something went wrong. Please try again!', 'meta-box-builder' ) }</p> }>
		<Header />

		<div className="mb-body">
			<div className="mb-body__inner">
				{ children }
			</div>
		</div>

		<Notification />
	</ErrorBoundary>
);

const App = () => (
	<Layout>
		<Main />
	</Layout>
);

const container = document.getElementById( 'poststuff' );
container.classList.add( 'mb' );
container.classList.add( 'og' );
container.id = 'mb-app';

const root = createRoot( container );
root.render( <App /> );

// Update URL for new posts
updateNewPostUrl();

// Remove .wp-header-end element to properly show notices.
document.querySelector( '.wp-header-end' )?.remove();

const form = document.querySelector( '#post' );

// Prevent submit when press Enter.
const preventSubmitWhenPressEnter = e => {
	if ( e.target.tagName === 'INPUT' && e.keyCode == 13 ) {
		e.preventDefault();
	}
};
form.addEventListener( 'keypress', preventSubmitWhenPressEnter );
form.addEventListener( 'keydown', preventSubmitWhenPressEnter );
form.addEventListener( 'keyup', preventSubmitWhenPressEnter );

initSaveForm();