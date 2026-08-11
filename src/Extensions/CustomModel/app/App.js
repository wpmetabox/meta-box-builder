import { createRoot } from '@wordpress/element';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../../../../assets/app/components/ErrorFallback';
import useSettings from '../../../../assets/app/hooks/useSettings';
import Header from './components/Header';
import Main from './components/Main';
import Notification from './components/Notification';
import DefaultSettings from './constants/DefaultSettings';
import { initSaveForm } from './save';

useSettings.setState( {
	settings: {
		...DefaultSettings,
		...( MbbApp.settings || {} ),
	},
} );

const Layout = ( { children } ) => (
	<ErrorBoundary FallbackComponent={ ErrorFallback }>
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

createRoot( container ).render( <App /> );

document.querySelector( 'h1:not(.mb-header h1)' )?.remove();
document.querySelector( '.page-title-action' )?.remove();
document.querySelector( '.wp-header-end' )?.remove();

const form = document.querySelector( '#post' );

const preventSubmitWhenPressEnter = e => {
	if ( e.target.tagName === 'INPUT' && e.keyCode === 13 ) {
		e.preventDefault();
	}
};
form.addEventListener( 'keypress', preventSubmitWhenPressEnter );
form.addEventListener( 'keydown', preventSubmitWhenPressEnter );
form.addEventListener( 'keyup', preventSubmitWhenPressEnter );

initSaveForm();

document.addEventListener( 'keydown', e => {
	if ( ( e.ctrlKey || e.metaKey ) && e.key === 's' ) {
		e.preventDefault();
		const submitButton = document.querySelector( '#post [type="submit"]' );
		if ( submitButton && ! submitButton.disabled ) {
			submitButton.click();
		}
	}
} );
