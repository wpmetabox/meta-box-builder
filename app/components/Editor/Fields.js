import { RawHTML } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { ReactSortable } from 'react-sortablejs';
import useApi from "../../hooks/useApi";
import useLists from "../../hooks/useLists";
import AddFieldButton from "./AddFieldButton";
import Node from './Node';

const Fields = () => {
	const { getForList } = useLists();
	const { fields, setFields, ...fieldActions } = getForList( 'root' );

	// Don't render any field if fields data is not available.
	const types = useApi( 'field-types', {} );
	const categories = useApi( 'field-categories', [] );

	if ( Object.keys( types ).length === 0 || Object.keys( categories ).length === 0 ) {
		return <div className="mb-editor__empty">{ __( 'Loading fields, please wait...', 'meta-box-builder' ) }</div>;
	}

	if ( fields.length === 0 ) {
		return (
			<div className="mb-editor__empty">
				<RawHTML>{ __( 'There are no fields here. Click the <strong>+ Add Field</strong> to add a new field.', 'meta-box-builder' ) }</RawHTML>
				<AddFieldButton { ...fieldActions } />
			</div>
		);
	}

	return (
		<ReactSortable group={ {
			name: 'root',
			pull: true,
			put: true,
		} }
			animation={ 200 }
			delayOnTouchStart={ true }
			delay={ 2 }
			className="og-fields"
			list={ fields }
			setList={ setFields }
			handle=".og-column--drag"
		>
			{
				fields.map( field => <Node
					key={ field._id }
					field={ field }
					{ ...fieldActions }
				/> )
			}
		</ReactSortable>
	);
};

export default Fields;