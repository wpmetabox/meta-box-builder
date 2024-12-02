import { Tooltip } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import DivRow from './DivRow';

const Descriptions = ( { defaultValue, componentId, fieldType, name, ...rest } ) => (
	<DivRow { ...rest }>
		<div className="og-input-groups">
			<Tooltip text={ __( 'Display below the field label', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
				<label htmlFor={ `${ componentId }-label_description` }>{ __( 'Label', 'meta-box-builder' ) }</label>
			</Tooltip>
			<input
				type="text"
				size="40"
				id={ `${ componentId }-label_description` }
				name={ `${ name.replace( 'descriptions', 'label_description' ) }` }
				defaultValue={ defaultValue.label_description }
			/>
			<Tooltip text={ __( 'Display below the field input', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
				<label htmlFor={ `${ componentId }-desc` }>{ __( 'Input', 'meta-box-builder' ) }</label>
			</Tooltip>
			<input
				type="text"
				size="40"
				id={ `${ componentId }-desc` }
				name={ `${ name.replace( 'descriptions', 'desc' ) }` }
				defaultValue={ defaultValue.desc }
			/>
		</div>
	</DivRow>
);

export default Descriptions;