import { __ } from '@wordpress/i18n';
import { category, code, copy } from '@wordpress/icons';
import useMainArea from "../hooks/useMainArea";
import Box from "./Box";
import Form from './Form';
import PHP from "./PHP";
import ThemeCode from "./ThemeCode/ThemeCode";

const Main = () => (
	<MainInner
		fields={ <Form /> }
		php={ <PHP /> }
		theme_code={ <ThemeCode /> }
	/>
);

const MainInner = ( { fields, php, theme_code } ) => {
	const { area } = useMainArea();

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

			<Box title={ titles[ area ] } icon={ icons[ area ] }>
				<div className={ `mb-area ${ area === 'fields' ? 'mb-area--show' : '' }` }>
					{ fields }
				</div>
				<div className={ `mb-area ${ area === 'php' ? 'mb-area--show' : '' }` }>
					{ php }
				</div>
				<div className={ `mb-area ${ area === 'theme_code' ? 'mb-area--show' : '' }` }>
					{ theme_code }
				</div>
			</Box>
		</div>
	);
};

export default Main;