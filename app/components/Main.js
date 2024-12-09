import { Button, Flex, Icon } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { category, code, copy } from '@wordpress/icons';
import Fields from './Fields';
import PHP from "./PHP";
import ThemeCode from "./ThemeCode/ThemeCode";

const Main = () => (
	<MainInner
		fields={ <Fields /> }
		php={ <PHP /> }
		theme_code={ <ThemeCode /> }
	/>
);

const MainInner = ( { fields, php, theme_code } ) => {
	const [ area, setArea ] = useState( 'fields' );

	const titles = {
		fields: __( 'Fields', 'meta-box-builder' ),
		php: __( 'Get PHP Code', 'meta-box-builder' ),
		theme_code: __( 'Theme Code', 'meta-box-builder' ),
	};

	const icons = {
		fields: category,
		php: code,
		theme_code: copy
	};

	return (
		<div className="mb-main">
			<div className="wp-header-end" />

			<div className="mb-box">
				<Flex align="center" className="mb-box__header">
					<Flex align="center" justify="flex-start" gap={ 1 } className="mb-box__title">
						<Icon icon={ icons[ area ] } />
						{ titles[ area ] }
					</Flex>
					<Flex expanded={ false } className="mb-box__actions">
						<Button size="small" icon={ category } onClick={ () => setArea( 'fields' ) } label={ __( 'Show fields', 'meta-box-builder' ) } showTooltip={ true } />
						<Button size="small" icon={ code } onClick={ () => setArea( 'php' ) } label={ __( 'Get PHP code to register fields', 'meta-box-builder' ) } showTooltip={ true } />
						<Button size="small" icon={ copy } onClick={ () => setArea( 'theme_code' ) } label={ __( 'Generate ready-to-copy PHP code to show fields', 'meta-box-builder' ) } showTooltip={ true } />
					</Flex>
				</Flex>
				<div className="mb-box__body">
					<div className={ `mb-area ${ area === 'fields' ? 'mb-area--show' : '' }` }>
						{ fields }
					</div>
					<div className={ `mb-area ${ area === 'php' ? 'mb-area--show' : '' }` }>
						{ php }
					</div>
					<div className={ `mb-area ${ area === 'theme_code' ? 'mb-area--show' : '' }` }>
						{ theme_code }
					</div>
				</div>
			</div>
		</div>
	);
};

export default Main;