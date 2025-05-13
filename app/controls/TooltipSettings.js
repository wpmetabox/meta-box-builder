import { Button, Flex, RadioControl } from '@wordpress/components';
import { useCallback, useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { settings } from '@wordpress/icons';
import { debounce } from 'lodash';
import DashiconPicker from "./DashiconPicker";
import DivRow from "./DivRow";
import Position from "./Position";

const TooltipSettings = ( { name, componentId, defaultValue, updateField, ...rest } ) => {
	const enable = defaultValue.enable;
	const icon = defaultValue.icon || 'info';

	let isDashicons = false;
	if ( !icon || [ 'info', 'help' ].includes( icon ) || icon.includes( 'dashicons' ) ) {
		isDashicons = true;
	}

	const [ icon_type, setIconType ] = useState( isDashicons ? 'dashicons' : 'url' );
	const [ showSettings, setShowSettings ] = useState( false );

	const toggleEnable = e => {
		setShowSettings( e.target.checked );
		updateField( 'tooltip', {
			...defaultValue,
			enable: e.target.checked
		} );
	};

	const toggleShowSettings = () => setShowSettings( prev => !prev );
	const updateIcon = value => updateField( 'tooltip', {
		...defaultValue,
		icon: value,
	} );

	return (
		<>
			<input type="hidden" name={ `${ name }[enable]` } value={ enable } />
			<input type="hidden" name={ `${ name }[icon]` } value={ icon } />

			<DivRow>
				<Flex className='og-with-toggle-sub-settings'>
					<label className="og-toggle">
						<input type="checkbox" id={ `${ componentId }-enable` } onChange={ toggleEnable } defaultChecked={ enable } />
						<div className="og-toggle__switch"></div>
						{ __( 'Tooltip', 'meta-box-builder' ) }
					</label>
					{ enable && <Button icon={ settings } size="small" onClick={ toggleShowSettings } isPressed={ showSettings } /> }
				</Flex>
			</DivRow>
			{
				showSettings && (
					<div className="og-sub-settings">
						<TooltipContent
							componentId={ componentId }
							name={ name }
							defaultValue={ defaultValue }
							updateField={ updateField }
						/>
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
									updateField={ ( name, value ) => updateIcon( `dashicons-${ value }` ) }
								/>
								: <DivRow htmlFor={ `${ componentId }-url` } label={ __( 'Icon URL', 'meta-box-builder' ) }>
									<input type="text" id={ `${ componentId }-url` } defaultValue={ isDashicons ? '' : icon } onChange={ e => updateIcon( e.target.value ) } />
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

const TooltipContent = ( { componentId, name, defaultValue, updateField } ) => {
	const [ content, setContent ] = useState( defaultValue?.content );
	const updateContent = e => setContent( e.target.value );

	const debouncedUpdateContent = useCallback(
		debounce( content => updateField( 'tooltip', { ...defaultValue, content } ), 300 ),
		[] // empty deps means it runs once
	);

	useEffect( () => {
		debouncedUpdateContent( content );
	}, [ content, debouncedUpdateContent ] );

	return (
		<DivRow htmlFor={ `${ componentId }-content` } label={ __( 'Content', 'meta-box-builder' ) }>
			<input
				type="text"
				id={ `${ componentId }-content` }
				name={ `${ name }[content]` }
				value={ content }
				onChange={ updateContent }
			/>
		</DivRow>
	);
};

export default TooltipSettings;