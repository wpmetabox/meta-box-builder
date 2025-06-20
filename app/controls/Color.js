import { ColorPicker, Dropdown } from '@wordpress/components';
import DivRow from './DivRow';

const Color = ( { name, defaultValue = '', updateField, ...rest } ) => (
	<DivRow { ...rest }>
		<Dropdown
			renderToggle={ ( { onToggle } ) => (
				<button
					type="button"
					onClick={ onToggle }
					className="button button-secondary og-icon__pick"
					style={ { backgroundColor: defaultValue || 'transparent' } }
				/>
			) }
			renderContent={ () => <ColorPicker color={ defaultValue } onChange={ value => updateField( name, value ) } copyFormat="hex" /> }
		/>
	</DivRow>
);

export default Color;