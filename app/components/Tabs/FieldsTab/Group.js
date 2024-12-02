import { PanelBody, PanelRow } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import clsx from "clsx";
import { ReactSortable } from 'react-sortablejs';
import useApi from "../../../hooks/useApi";
import FieldSettings from "../../Sidebar/FieldSettings";
import Content from './Content';
import Node from './Node';

const Group = ( { id, field, parent = '', nameIdData, groupData } ) => {
	const {
		fields,
		add,
		remove,
		duplicate,
		setFields,
	} = groupData;

	const fieldTypes = useApi( 'field-types', {} );

	if ( !fieldTypes.hasOwnProperty( field.type ) ) {
		return;
	}

	const controls = [ ...fieldTypes[ field.type ].controls ];
	const general = controls.filter( control => control.tab === 'general' );
	const advanced = controls.filter( control => control.tab === 'advanced' );

	return (
		<>
			<FieldSettings id={ id }>
				<PanelBody title={ __( 'General', 'meta-box-builder' ) } initialOpen={ true }>
					<PanelRow>
						<Content id={ id } controls={ general } field={ field } parent={ parent } nameIdData={ nameIdData } />
					</PanelRow>
				</PanelBody>
				{
					advanced.length > 0 &&
					<PanelBody title={ __( 'Advanced', 'meta-box-builder' ) } initialOpen={ true }>
						<PanelRow>
							<Content id={ id } controls={ advanced } field={ field } parent={ parent } nameIdData={ nameIdData } />
						</PanelRow>
					</PanelBody>
				}
			</FieldSettings>

			<div className={ clsx( 'og-group-fields', fields.length === 0 && 'og-group-fields--empty' ) }>
				{
					fields.length > 0 &&
					<>
						<div className="og-group-fields__inner">
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
								handle=".og-item__header"
							>
								{
									fields.map( ( field, index ) => <Node
										key={ field._id }
										id={ field._id }
										field={ field }
										parent={ `${ parent }[${ id }][fields]` }
										removeField={ remove }
										duplicateField={ duplicate }
									/> )
								}
							</ReactSortable>
						</div>
					</>
				}
			</div>
		</>
	);
};

export default Group;
