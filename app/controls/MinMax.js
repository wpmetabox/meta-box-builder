import { __ } from "@wordpress/i18n";
import DivRow from "./DivRow";

const MinMax = ( { name, componentId, defaultValue, ...rest } ) => (
	<DivRow { ...rest }>
		<div className="og-input-group">
			<label htmlFor={ `${ componentId }-min` }>{ __( 'Min', 'meta-box-builder' ) }</label>
			<input
				type="number"
				id={ `${ componentId }-min` }
				defaultValue={ defaultValue.min }
			/>
			<label htmlFor={ `${ componentId }-max` }>{ __( 'Max', 'meta-box-builder' ) }</label>
			<input
				type="number"
				id={ `${ componentId }-max` }
				defaultValue={ defaultValue.max }
			/>
		</div>
	</DivRow>
);

export default MinMax;