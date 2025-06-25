// import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { Button, Flex, Icon } from '@wordpress/components';
import { render, useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { category, code } from '@wordpress/icons';
import Content from './Content';
import PHP from './PHP';

const App = () => {
	const [ area, setArea ] = useState( 'settings' );

	useEffect( () => {
		// Hide option name by default.
		jQuery( '.toggle_option_name' ).closest( '.rwmb-field' ).next().hide();
		jQuery( '#post' )
			// Don't submit form when press Enter.
			.on( 'keypress keydown keyup', 'input', function ( e ) {
				if ( e.keyCode == 13 ) {
					e.preventDefault();
				}
			} )
			// Toggle option name.
			.on( 'click', '.toggle_option_name', function ( e ) {
				jQuery( this ).closest( '.rwmb-field' ).next().toggle();
			} );
	} );

	const titles = {
		settings: __( 'Settings', 'meta-box-builder' ),
		php: __( 'Get PHP Code', 'meta-box-builder' ),
	};

	const icons = {
		settings: category,
		php: code,
	};

	return (
		<div className="mb-box">
			<Flex align="center" className="mb-box__header">
				<Icon icon={ icons[ area ] } />
				<span className="mb-box__title">{ titles[ area ] }</span>
				<Button size="small" icon={ category } onClick={ () => setArea( 'settings' ) } label={ __( 'Show settings', 'meta-box-builder' ) } showTooltip={ true } />
				<Button size="small" icon={ code } onClick={ () => setArea( 'php' ) } label={ __( 'Get PHP code to register the settings page', 'meta-box-builder' ) } showTooltip={ true } />
			</Flex>
			<div className="mb-box__body">
				{ area === 'settings' && <Content /> }
				{ area === 'php' && <PHP /> }
			</div>
		</div>
	);
};

render( <App />, document.getElementById( 'root' ) );
