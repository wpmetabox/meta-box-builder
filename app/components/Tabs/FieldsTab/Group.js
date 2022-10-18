import { memo } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { ReactSortable } from 'react-sortablejs';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import useApi from "../../../hooks/useApi";
import useFields from "../../../hooks/useFields";
import Content from './Content';
import { Inserter } from './Inserter';
import Node from './Node';

const Group = ( { id, field, parent = '', updateFieldType } ) => {
	const {
		fields,
		add,
		remove,
		duplicate,
		updateType,
		setFields,
	} = useFields(
		Object.values( field.fields || {} ),
		`fields${ parent }[${ id }][fields]`
	);

	const fieldTypes = useApi( 'field-types', {} );
	const controls = [ ...fieldTypes[ field.type ].controls ];

	return (
		<>
			<Tabs forceRenderTabPanel={ true } className="og-item__body og-collapsible__body">
				<TabList>
					<Tab>{ __( 'General', 'meta-box-builder' ) }</Tab>
					<Tab>{ __( 'Advanced', 'meta-box-builder' ) }</Tab>
				</TabList>
				<TabPanel>
					<Content id={ id } controls={ controls.filter( control => control.tab === 'general' ) } field={ field } parent={ parent } updateFieldType={ updateFieldType } />
				</TabPanel>
				<TabPanel>
					<Content id={ id } controls={ controls.filter( control => control.tab === 'advanced' ) } field={ field } parent={ parent } />
				</TabPanel>
			</Tabs>
			<div className={ `og-group-fields og-field${ fields.length === 0 ? ' og-group-fields--empty' : '' }` }>
				<div className="og-label">{ __( 'Sub fields', 'meta-box-builder' ) }</div>
				<div className="og-input">
					<ReactSortable list={ fields } setList={ setFields } handle=".og-item__header">
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
					<Inserter addField={ add } />
				</div>
			</div>
		</>
	);
};

export default memo( ( Group ), ( prevProps, nextProps ) => prevProps.id === nextProps.id && prevProps.field.fields === nextProps.field.fields );
