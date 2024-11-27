import { __ } from "@wordpress/i18n";
import DivRow from './DivRow';

const CloneQuantity = ( { defaultValue, componentId, name, ...rest } ) => (
	<DivRow { ...rest }>
		<div className="og-input-group">
			<label htmlFor={ `${ componentId }-min` }>{ __( 'Min', 'meta-box-builder' ) }</label>
			<input
				type="number"
				min="0"
				id={ `${ componentId }-min` }
				name={ `${ name.replace( 'clone_quantity', 'min_clone' ) }` }
				defaultValue={ defaultValue.min }
			/>
			<label htmlFor={ `${ componentId }-max` }>{ __( 'Max', 'meta-box-builder' ) }</label>
			<input
				type="number"
				min="0"
				id={ `${ componentId }-max` }
				name={ `${ name.replace( 'clone_quantity', 'max_clone' ) }` }
				defaultValue={ defaultValue.max }
			/>
		</div>
	</DivRow>
);

export default CloneQuantity;