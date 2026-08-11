import { __ } from '@wordpress/i18n';
import Checkbox from '../../../../../../assets/app/controls/Checkbox';
import useSettings from '../../../../../../assets/app/hooks/useSettings';
import useAutofill from '../../hooks/useAutofill';

const SUPPORTS = {
	author: __( 'Author', 'meta-box-builder' ),
	published_date: __( 'Published date', 'meta-box-builder' ),
	modified_date: __( 'Modified date', 'meta-box-builder' ),
};

const Supports = () => {
	const { getSetting, updateSetting } = useAutofill();
	const supports = getSetting( 'supports', [] );

	const toggleSupport = ( name, checked ) => {
		const supports = useSettings.getState().getSetting( 'supports', [] );
		let newSupports = [ ...supports ];

		if ( checked ) {
			if ( ! newSupports.includes( name ) ) {
				newSupports.push( name );
			}
		} else {
			newSupports = newSupports.filter( item => item !== name );
		}

		updateSetting( 'supports', newSupports );
	};

	return (
		<div className="mb-content">
			<p className="og-description">{ __( 'Features the model supports:', 'meta-box-builder' ) }</p>
			{
				Object.entries( SUPPORTS ).map( ( [ name, label ] ) => (
					<Checkbox
						key={ name }
						name={ name }
						componentId={ `support-${ name }` }
						label={ label }
						className="og-field--checkbox-list"
						defaultValue={ supports.includes( name ) }
						updateField={ toggleSupport }
					/>
				) )
			}
		</div>
	);
};

export default Supports;
