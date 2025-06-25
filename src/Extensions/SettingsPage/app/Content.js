import { Suspense } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { getControlParams } from '../../../../app/functions';
import { useFetch } from '../../../../app/hooks/useFetch';

const Content = () => {
	const { data: controls } = useFetch( { api: 'settings-page-controls', defaultValue: [] } );

	const getControlComponent = control => {
		const [ Control, input, defaultValue ] = getControlParams( control, MbbApp.settings, () => import( `./controls/${ control.name }` ) );

		return <Control
			componentId={ `settings-${ control.setting }` }
			{ ...control.props }
			name={ `settings${ input }` }
			defaultValue={ defaultValue }
		/>;
	};

	const loading = <p>{ __( 'Loading settings, please wait...', 'meta-box-builder' ) }</p>;

	return controls.length === 0
		? loading
		: <>
			{ controls.map( control => <Suspense fallback={ null } key={ control.setting }>{ getControlComponent( control ) }</Suspense> ) }
		</>;
};

export default Content;