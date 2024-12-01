import { __ } from "@wordpress/i18n";
import DivRow from './DivRow';

const CloneQuantity = ( { defaultValue, componentId, name, ...rest } ) => (
	<DivRow { ...rest }>
		<div className="og-input-group">
			<label htmlFor={ `${ componentId }-min_clone` }>{ __( 'Min', 'meta-box-builder' ) }</label>
			<input
				type="number"
				min="0"
				id={ `${ componentId }-min_clone` }
				name={ `${ name.replace( 'clone_quantity', 'min_clone' ) }` }
				defaultValue={ defaultValue.min_clone }
			/>
			<label htmlFor={ `${ componentId }-max_clone` }>{ __( 'Max', 'meta-box-builder' ) }</label>
			<input
				type="number"
				min="0"
				id={ `${ componentId }-max_clone` }
				name={ `${ name.replace( 'clone_quantity', 'max_clone' ) }` }
				defaultValue={ defaultValue.max_clone }
			/>
		</div>
	</DivRow>
);

export default CloneQuantity;