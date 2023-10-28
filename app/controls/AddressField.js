import { Button, Dropdown } from "@wordpress/components";
import useFieldIds from '../hooks/useFieldIds';
import DivRow from './DivRow';
import FieldInserter from './FieldInserter';

const AddressField = ( { name, componentId, nameIdData, placeholder, defaultValue, ...rest } ) => {
	const ids = useFieldIds( state => state.ids );
	const fields = Array.from( new Set( Object.values( ids ) ) );

	const handleSelectItem = ( e, onToggle ) => {
		onToggle();
		const address = ! nameIdData.address_field ? '' : nameIdData.address_field + ',';
		nameIdData.updateAddressField( address + e.target.dataset.value );
	};

	return (
		<DivRow className="AddressField abcd1234" htmlFor={ componentId } { ...rest }>
			<input type="text" id={ componentId } name={ name } value={ nameIdData.address_field } placeholder={ placeholder } required />
			<Dropdown
				className="og-dropdown"
				position="bottom left"
				renderToggle={ ( { onToggle } ) => <Button icon="ellipsis" onClick={ onToggle } /> }
				renderContent={ ( { onToggle } ) => <FieldInserter  items={ fields } hasSearch={ true } onSelect={ e => handleSelectItem( e, onToggle ) } /> }
			/>
		</DivRow>
	)
};

export default AddressField;