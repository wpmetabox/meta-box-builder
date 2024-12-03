import { __ } from "@wordpress/i18n";
import DivRow from './DivRow';

const PrependAppend = ( { defaultValue, componentId, fieldType, name, ...rest } ) => (
	<DivRow { ...rest }>
		<div className="og-input-group">
			<label htmlFor={ `${ componentId }-prepend` }>{ __( 'Prepend', 'meta-box-builder' ) }</label>
			<input
				type="text"
				id={ `${ componentId }-prepend` }
				name={ `${ name.replace( 'prepend_append', 'prepend' ) }` }
				defaultValue={ defaultValue.prepend }
			/>
		</div>
		<div className="og-input-group">
			<input
				type="text"
				id={ `${ componentId }-append` }
				name={ `${ name.replace( 'prepend_append', 'append' ) }` }
				defaultValue={ defaultValue.append }
			/>
			<label htmlFor={ `${ componentId }-append` }>{ __( 'Append', 'meta-box-builder' ) }</label>
		</div>
	</DivRow>
);

export default PrependAppend;