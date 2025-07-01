import { Button, Flex, Icon } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { category, code } from '@wordpress/icons';
import Content from './Content';
import PHP from './PHP';

const Main = () => {
	const [ area, setArea ] = useState( 'settings' );

	const titles = {
		settings: __( 'Settings', 'meta-box-builder' ),
		php: __( 'Get PHP Code', 'meta-box-builder' ),
	};

	const icons = {
		settings: category,
		php: code,
	};

	return (
		<div className="mb-main">
			<div className="wp-header-end" />
			<div className="mb-box">
				<Flex align="center" className="mb-box__header">
					<Icon icon={ icons[ area ] } />
					<span className="mb-box__title">{ titles[ area ] }</span>
					<Button size="small" icon={ category } onClick={ () => setArea( 'settings' ) } label={ __( 'Show settings', 'meta-box-builder' ) } showTooltip={ true } />
					<Button size="small" icon={ code } onClick={ () => setArea( 'php' ) } label={ __( 'Get PHP code to register the relationship', 'meta-box-builder' ) } showTooltip={ true } />
				</Flex>
				<div className="mb-box__body">
					{ area === 'settings' && <Content /> }
					{ area === 'php' && <PHP /> }
				</div>
			</div>
		</div>
	);
};

export default Main;