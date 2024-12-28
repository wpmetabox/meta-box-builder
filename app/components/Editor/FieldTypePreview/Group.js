import { __ } from '@wordpress/i18n';
import { ReactSortable } from 'react-sortablejs';
import useLists from '../../../hooks/useLists';
import AddFieldButton from '../AddFieldButton';
import Node from '../Node';

const Group = ( { field, parent } ) => {
	const { getForList } = useLists();
	const { fields, setFields, ...fieldActions } = getForList( field._id );

	return (
		<>
			<CollapsibleElements field={ field } />

			<ReactSortable
				group={ {
					name: 'nested',
					pull: true,
					put: [ 'root', 'nested' ],
				} }
				animation={ 200 }
				delayOnTouchStart={ true }
				delay={ 2 }
				list={ fields }
				setList={ setFields }
				invertSwap={ true }
				className="mb-field--group__fields"
			>
				{
					fields.map( f => <Node
						key={ f._id }
						field={ f }
						parent={ `${ parent }[${ field._id }][fields]` }
						{ ...fieldActions }
					/> )
				}
			</ReactSortable>
			<AddFieldButton text={ __( '+ Add Subfield', 'meta-box-builder' ) } variant='secondary' { ...fieldActions } />
		</>
	);
};

const CollapsibleElements = ( { field } ) => {
	if ( !field.collapsible ) {
		return;
	}

	const groupTitle = field.group_title || ( field.clone ? __( 'Entry {#}', 'meta-box-builder' ) : __( 'Entry', 'meta-box-builder' ) );

	return (
		<>
			<div className="rwmb-group-title-wrapper">
				<h4 className="rwmb-group-title">{ groupTitle }</h4>
				{
					field.clone && <a href="#" className="rwmb-group-remove">{ __( 'Remove', 'meta-box-builder' ) }</a>
				}
			</div>
			<button className="rwmb-group-toggle-handle button-link">
				<span className="rwmb-group-toggle-indicator" />
			</button>
		</>
	);
};

export default Group;