import { __ } from "@wordpress/i18n";
import clsx from "clsx";
import { ReactSortable } from 'react-sortablejs';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import useApi from "../../../hooks/useApi";
import FieldSettings from "../../Sidebar/FieldSettings";
import Content from './Content';
import Node from './Node';

const Group = ( { id, field, parent = '', updateFieldType, nameIdData, groupData } ) => {
	const {
		fields,
		add,
		remove,
		duplicate,
		updateType,
		setFields,
	} = groupData;

	const fieldTypes = useApi( 'field-types', {} );

	if ( !fieldTypes.hasOwnProperty( field.type ) ) {
		return;
	}

	const controls = [ ...fieldTypes[ field.type ].controls ];

	return (
		<>
			<FieldSettings id={ id }>
				<Tabs forceRenderTabPanel={ true } className="og-item__body">
					<TabList>
						<Tab>{ __( 'General', 'meta-box-builder' ) }</Tab>
						<Tab>{ __( 'Advanced', 'meta-box-builder' ) }</Tab>
					</TabList>
					<TabPanel>
						<Content id={ id } controls={ controls.filter( control => control.tab === 'general' ) } field={ field } parent={ parent } updateFieldType={ updateFieldType } nameIdData={ nameIdData } />
					</TabPanel>
					<TabPanel>
						<Content id={ id } controls={ controls.filter( control => control.tab === 'advanced' ) } field={ field } parent={ parent } nameIdData={ nameIdData } />
					</TabPanel>
				</Tabs>
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
										updateFieldType={ updateType }
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
