import { __ } from "@wordpress/i18n";
import DivRow from './DivRow';

const PrefixSuffix = ( { defaultValue, componentId, name, ...rest } ) => (
	<DivRow { ...rest }>
		<div className="og-input-group">
			<label htmlFor={ `${ componentId }-prefix` }>{ __( 'Prefix', 'meta-box-builder' ) }</label>
			<input
				type="text"
				id={ `${ componentId }-prefix` }
				name={ `${ name.replace( 'prefix_suffix', 'prefix' ) }` }
				defaultValue={ defaultValue.prefix }
			/>
			<label htmlFor={ `${ componentId }-suffix` }>{ __( 'Suffix', 'meta-box-builder' ) }</label>
			<input
				type="text"
				id={ `${ componentId }-suffix` }
				name={ `${ name.replace( 'prefix_suffix', 'suffix' ) }` }
				defaultValue={ defaultValue.suffix }
			/>
		</div>
	</DivRow>
);

export default PrefixSuffix;