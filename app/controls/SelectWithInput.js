import { Button } from "@wordpress/components";
import { useCallback, useEffect, useRef, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Icon, chevronDown, close } from "@wordpress/icons";
import { debounce } from 'lodash';
import DivRow from './DivRow';

const SelectWithInput = ( {
	componentId,
	name,
	options,
	defaultValue,
	updateField,
	...rest
} ) => {
	const [ showOptions, setShowOptions ] = useState( false );
	const ref = useRef();
	const [ value, setValue ] = useState( defaultValue );

	const predefinedItem = Object.entries( options ).find( item => item[ 0 ] === defaultValue );
	const isPredefined = predefinedItem !== undefined;
	const label = isPredefined ? predefinedItem[ 1 ] : '';

	const show = () => setShowOptions( true );
	const hide = () => setShowOptions( false );
	const toggle = () => setShowOptions( prev => !prev );
	const remove = e => {
		updateField( name, '' );
		ref.current.focus();
		show();
		e.stopPropagation(); // Do not trigger "toggle" event on the parent div
	};
	const select = e => {
		hide();
		updateField( name, e.target.dataset.value );
	};

	// Live update to the input, and debounce update to the field.
	const update = e => setValue( e.target.value );
	const debouncedUpdate = useCallback(
		debounce( val => updateField( name, val ), 100 ),
		[] // empty deps means it runs once
	);
	useEffect( () => {
		debouncedUpdate( value );
	}, [ value, debouncedUpdate ] );

	return <DivRow htmlFor={ componentId } { ...rest }>
		<div className="og-select-with-input">
			<input type="hidden" name={ name } defaultValue={ defaultValue } />
			<input
				ref={ ref }
				type="text"
				placeholder={ __( 'Please select or enter a value', 'meta-box-builder' ) }
				id={ componentId }
				onFocus={ show }
				value={ value }
				onChange={ update }
			/>
			<div className="og-select-with-input__icon" onClick={ toggle }><Icon icon={ chevronDown } /></div>
			{
				isPredefined &&
				<div className="og-select-with-input__selected" onClick={ toggle }>
					{ label }
					<Button icon={ close } size="small" iconSize={ 12 } isDestructive={ true } onClick={ remove } />
				</div>
			}
			{
				showOptions &&
				<div className="og-select-with-input__options">
					<div className="og-description">{ __( 'Select a value below or type to enter a manual value.', 'meta-box-builder' ) }</div>
					{
						Object.entries( options ).map( item => (
							<div
								key={ item[ 0 ] }
								className={ `og-select-with-input__option ${ item[ 0 ] === defaultValue ? 'og-select-with-input__option--selected' : '' }` }
								data-value={ item[ 0 ] }
								onClick={ select }
							>
								{ item[ 1 ] }
							</div>
						) )
					}
				</div>
			}
		</div>
	</DivRow>;
};

export default SelectWithInput;