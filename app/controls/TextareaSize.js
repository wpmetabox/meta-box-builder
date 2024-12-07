import { Tooltip } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import DivRow from './DivRow';

const TextareaSize = ( { defaultValue, componentId, name, ...rest } ) => (
	<DivRow { ...rest }>
		<div className="og-input-group">
			<Tooltip delay={ 0 } text={ __( 'Leave empty to make the textarea 100% width', 'meta-box-builder' ) }>
				<label htmlFor={ `${ componentId }-cols` }>{ __( 'Columns', 'meta-box-builder' ) }</label>
			</Tooltip>
			<input
				type="text"
				id={ `${ componentId }-cols` }
				name={ `${ name.replace( 'textarea_size', 'cols' ) }` }
				defaultValue={ defaultValue.cols }
			/>
			<label htmlFor={ `${ componentId }-rows` }>{ __( 'Rows', 'meta-box-builder' ) }</label>
			<input
				type="text"
				id={ `${ componentId }-rows` }
				name={ `${ name.replace( 'textarea_size', 'rows' ) }` }
				defaultValue={ defaultValue.rows }
			/>
		</div>
	</DivRow>
);

export default TextareaSize;