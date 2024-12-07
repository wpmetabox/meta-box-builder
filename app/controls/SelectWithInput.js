import { Button } from "@wordpress/components";
import { useRef, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Icon, chevronDown, close } from "@wordpress/icons";
import DivRow from './DivRow';

const SelectWithInput = ( {
	componentId,
	name,
	options,
	defaultValue,
	...rest
} ) => {
	const [ value, setValue ] = useState( defaultValue );
	const [ showOptions, setShowOptions ] = useState( false );
	const ref = useRef();

	const predefinedItem = Object.entries( options ).find( item => item[ 0 ] === value );
	const isPredefined = predefinedItem !== undefined;
	const label = isPredefined ? predefinedItem[ 1 ] : '';

	const show = () => setShowOptions( true );
	const hide = () => setShowOptions( false );
	const toggle = () => setShowOptions( prev => !prev );
	const remove = e => {
		setValue( '' );
		ref.current.focus();
		show();
		e.stopPropagation(); // Do not trigger "toggle" event on the parent div
	};
	const select = e => {
		hide();
		setValue( e.target.dataset.value );
	};

	return <DivRow htmlFor={ componentId } { ...rest }>
		<div className="og-select-with-input">
			<input type="hidden" name={ name } defaultValue={ value } />
			<input
				ref={ ref }
				type="text"
				placeholder={ __( 'Please select or enter a value', 'meta-box-builder' ) }
				id={ componentId }
				onFocus={ show }
				value={ value }
				onChange={ e => setValue( e.target.value ) }
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
								className={ `og-select-with-input__option ${ item[ 0 ] === value ? 'og-select-with-input__option--selected' : '' }` }
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