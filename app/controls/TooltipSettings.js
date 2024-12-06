import { RadioControl } from '@wordpress/components';
import { useReducer, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import DashiconPicker from "./DashiconPicker";
import DivRow from "./DivRow";
import Position from "./Position";
import Tooltip from "./Tooltip";

const TooltipSettings = ( { name, componentId, defaultValue, ...rest } ) => {
	const [ enable, toggleEnable ] = useReducer( on => !on, defaultValue.enable );
	const [ icon, setIcon ] = useState( defaultValue.icon || 'info' );

	let isDashicons = false;
	if ( !icon || [ 'info', 'help' ].includes( icon ) || icon.includes( 'dashicons' ) ) {
		isDashicons = true;
	}
	const [ icon_type, setIconType ] = useState( isDashicons ? 'dashicons' : 'url' );

	return (
		<>
			<input type="hidden" name={ `${ name }[enable]` } value={ enable } />
			<input type="hidden" name={ `${ name }[icon]` } value={ icon } />

			<Toggle
				label={ __( 'Enable tooltip', 'meta-box-builder' ) }
				defaultValue={ enable }
				componentId={ `${ componentId }-enable` }
				onChange={ toggleEnable }
			/>
			{
				enable && (
					<div className="og-sub-settings">
						<DivRow
							htmlFor={ `${ componentId }-content` }
							label={ __( 'Content', 'meta-box-builder' ) }
						>
							<input type="text" id={ `${ componentId }-content` } name={ `${ name }[content]` } defaultValue={ defaultValue.content } />
						</DivRow>
						<DivRow label={ __( 'Icon type', 'meta-box-builder' ) }>
							<RadioControl
								options={ [
									{
										value: 'dashicons',
										label: __( 'Dashicons', 'meta-box-builder' ),
									},
									{
										value: 'url',
										label: __( 'Custom', 'meta-box-builder' ),
									},
								] }
								onChange={ setIconType }
								selected={ icon_type }
							/>
						</DivRow>
						{
							icon_type === 'dashicons'
								? <DashiconPicker
									label={ __( 'Icon', 'meta-box-builder' ) }
									defaultValue={ isDashicons ? icon.replace( 'dashicons-', '' ) : '' }
									componentId={ `${ componentId }-icon` }
									updateFieldData={ ( name, value ) => setIcon( `dashicons-${ value }` ) }
								/>
								: <DivRow htmlFor={ `${ componentId }-url` } label={ __( 'Icon URL', 'meta-box-builder' ) }>
									<input type="text" id={ `${ componentId }-url` } defaultValue={ isDashicons ? '' : icon } onChange={ setIcon } />
								</DivRow>
						}
						<Position
							label={ __( 'Position', 'meta-box-builder' ) }
							name={ `${ name }[position]` }
							defaultValue={ defaultValue.position }
						/>
					</div>
				)
			}
		</>
	);
};

const Toggle = ( { componentId, label, defaultValue, tooltip, onChange } ) => (
	<DivRow>
		<label className="og-toggle">
			<input type="checkbox" id={ componentId } onChange={ onChange } defaultChecked={ defaultValue } />
			<div className="og-toggle__switch"></div>
			{ label }
			{ tooltip && <Tooltip id={ componentId } content={ tooltip } /> }
		</label>
	</DivRow>
);

export default TooltipSettings;