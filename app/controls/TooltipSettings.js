import { Button, Flex, RadioControl, Tooltip } from '@wordpress/components';
import { useCallback, useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { settings } from '@wordpress/icons';
import { debounce } from 'lodash';
import DashiconPicker from "./DashiconPicker";
import DivRow from "./DivRow";

const TooltipSettings = ( { componentId, defaultValue, updateField, ...rest } ) => {
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

	const updatePosition = e => updateField( 'tooltip', {
		...defaultValue,
		position: e.target.value,
	} );

	return (
		<>
			<DivRow>
				<Flex className='og-with-toggle-sub-settings'>
					<label className="og-toggle">
						<input type="checkbox" id={ `${ componentId }-enable` } onChange={ toggleEnable } checked={ enable } />
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
									<input type="text" id={ `${ componentId }-url` } value={ isDashicons ? '' : icon } onChange={ e => updateIcon( e.target.value ) } />
								</DivRow>
						}
						<Position label={ __( 'Position', 'meta-box-builder' ) } defaultValue={ defaultValue.position } onChange={ updatePosition } />
					</div>
				)
			}
		</>
	);
};

const TooltipContent = ( { componentId, defaultValue, updateField } ) => {
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
				value={ content }
				onChange={ updateContent }
			/>
		</DivRow>
	);
};

const Position = ( { defaultValue = 'top', onChange, ...rest } ) =>
(
	<DivRow { ...rest }>
		<div className="og-toggle-group og-toggle-group--no-check">
			<label>
				<input type="radio" value="top" checked={ "top" === defaultValue } onChange={ onChange } />
				<Tooltip text={ __( 'Top', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12.71 6.29a1 1 0 0 0-.33-.21a1 1 0 0 0-.76 0a1 1 0 0 0-.33.21l-4 4a1 1 0 1 0 1.42 1.42L11 9.41V21a1 1 0 0 0 2 0V9.41l2.29 2.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42ZM19 2H5a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2Z" /></svg>
				</Tooltip>
			</label>
			<label>
				<input type="radio" value="bottom" checked={ "bottom" === defaultValue } onChange={ onChange } />
				<Tooltip text={ __( 'Bottom', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M19 20H5a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2Zm-7.71-2.29a1 1 0 0 0 .33.21a.94.94 0 0 0 .76 0a1 1 0 0 0 .33-.21l4-4a1 1 0 0 0-1.42-1.42L13 14.59V3a1 1 0 0 0-2 0v11.59l-2.29-2.3a1 1 0 1 0-1.42 1.42Z" /></svg>
				</Tooltip>
			</label>
			<label>
				<input type="radio" value="left" checked={ "left" === defaultValue } onChange={ onChange } />
				<Tooltip text={ __( 'Left', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M21 11H9.41l2.3-2.29a1 1 0 1 0-1.42-1.42l-4 4a1 1 0 0 0-.21.33a1 1 0 0 0 0 .76a1 1 0 0 0 .21.33l4 4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L9.41 13H21a1 1 0 0 0 0-2ZM3 3a1 1 0 0 0-1 1v16a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1Z" /></svg>
				</Tooltip>
			</label>
			<label>
				<input type="radio" value="right" checked={ "right" === defaultValue } onChange={ onChange } />
				<Tooltip text={ __( 'Right', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="m17.71 11.29l-4-4a1 1 0 1 0-1.42 1.42l2.3 2.29H3a1 1 0 0 0 0 2h11.59l-2.3 2.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4-4a1 1 0 0 0 .21-.33a1 1 0 0 0 0-.76a1 1 0 0 0-.21-.33ZM21 4a1 1 0 0 0-1 1v14a1 1 0 0 0 2 0V5a1 1 0 0 0-1-1Z" /></svg>
				</Tooltip>
			</label>
		</div>
	</DivRow>
);

export default TooltipSettings;