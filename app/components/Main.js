import { Button, Flex, Icon } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { category, code, copy } from '@wordpress/icons';
import useNavPanel from '../hooks/useNavPanel';
import Fields from './Editor/Fields';
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
	const { setNavPanel } = useNavPanel();

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

	useEffect( () => {
		// Trigger 'resize' event on window to make the theme code tab render react-mirror2 component properly.
		window.dispatchEvent( new Event( 'resize' ) );
	}, [ area ] );

	const switchArea = area => () => {
		setArea( area );
		if ( [ 'php', 'theme_code' ].includes( area ) ) {
			setNavPanel( '' );
		}
	};

	return (
		<div className="mb-main">
			<div className="wp-header-end" />

			<div className="mb-box">
				<Flex align="center" className="mb-box__header">
					<Icon icon={ icons[ area ] } />
					<span className="mb-box__title">{ titles[ area ] }</span>
					<Button size="small" icon={ category } onClick={ switchArea( 'fields' ) } label={ __( 'Show fields', 'meta-box-builder' ) } showTooltip={ true } />
					<Button size="small" icon={ code } onClick={ switchArea( 'php' ) } label={ __( 'Get PHP code to register fields', 'meta-box-builder' ) } showTooltip={ true } />
					<Button size="small" icon={ copy } onClick={ switchArea( 'theme_code' ) } label={ __( 'Generate ready-to-copy PHP code to show fields', 'meta-box-builder' ) } showTooltip={ true } />
				</Flex>
				<div className="mb-box__body">
					{ area === 'fields' && fields }
					{ area === 'php' && php }
					{ area === 'theme_code' && theme_code }
				</div>
			</div>
		</div>
	);
};

export default Main;