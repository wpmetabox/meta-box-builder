import { Dashicon, Button, Dropdown } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import DataList from "./DataList";
import DivRow from './DivRow';
import FieldInserter from './FieldInserter';
import { uniqid } from "/functions";

const KeyValue = ( {
	defaultValue,
	name,
	keyPlaceholder = __( 'Enter key', 'meta-box-builder' ),
	valuePlaceholder = __( 'Enter value', 'meta-box-builder' ),
	keys = [],
	values = [],
	...rest
} ) => {
	const [ items, setItems ] = useState( Object.values( defaultValue || {} ) );

	const add = () => setItems( prev => [ ...prev, { key: '', value: '', id: uniqid() } ] );
	const remove = id => setItems( prev => prev.filter( item => item.id !== id ) );

	return (
		<DivRow { ...rest }>
			{
				items.map( item => (
					<Item
						key={ item.id }
						item={ item }
						remove={ remove }
						name={ `${ name }[${ item.id }]` }
						keys={ `${ name }-keys` }
						keysList={ keys }
						values={ `${ name }-values` }
						valuesList={ values }
						keyPlaceholder={ keyPlaceholder }
						valuePlaceholder={ valuePlaceholder }
					/>
				) )
			}
			<button type="button" className="button" onClick={ add }>{ __( '+ Add New', 'meta-box-builder' ) }</button>
		</DivRow>
	);
};

const Item = ( { name, keys, keysList, values, valuesList, item, remove, keyPlaceholder, valuePlaceholder } ) => (
	<div className="og-attribute">
		<input type="hidden" name={ `${ name }[id]` } defaultValue={ item.id } />
		<DropdownItem placeholder={ keyPlaceholder } name={ `${ name }[key]` } defaultValue={ item.key } items={ keysList } />
		<DropdownItem placeholder={ keyPlaceholder } name={ `${ name }[value]` } defaultValue={ item.value } items={ valuesList } />
		<button type="button" className="og-remove" title={ __( 'Remove', 'meta-box-builder' ) } onClick={ () => remove( item.id ) }><Dashicon icon="dismiss" /></button>
	</div>
);

const DropdownItem = ( { name, placeholder, defaultValue, items } ) => {
	const handleSelectItem = ( name, e, onToggle ) => {
		onToggle();
		document.getElementsByName( name )[0].value = e.target.dataset.value;
	};

	return (
		<DivRow className="og-keyvalue-field">
			<input type="text" placeholder={ placeholder } name={ name } defaultValue={ defaultValue } />
			<Dropdown
				className="og-dropdown"
				position="bottom left"
				renderToggle={ ( { onToggle } ) => <Button icon="ellipsis" onClick={ onToggle } /> }
				renderContent={ ( { onToggle } ) => <FieldInserter  items={ items } onSelect={ e => handleSelectItem( name, e, onToggle ) } /> }
			/>
		</DivRow>
	);
}

export default KeyValue;