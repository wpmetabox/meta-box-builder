import { createInterpolateElement } from '@wordpress/element';
import { __, _n, sprintf } from '@wordpress/i18n';
import useModelSchema from '../../hooks/useModelSchema';

const SchemaMismatchBanner = () => {
	const missingFieldIds = useModelSchema( state => state.missingFieldIds );
	const schemaSource = useModelSchema( state => state.schemaSource );
	const selectedModel = useModelSchema( state => state.selectedModel );
	const openSchema = useModelSchema( state => state.openSchema );

	const count = missingFieldIds.length;
	if ( ! count || ! schemaSource ) {
		return null;
	}

	const isCustomTable = schemaSource === 'custom_table';
	const readOnly = ! isCustomTable && ! selectedModel?.post_id;
	const tableLabel = isCustomTable
		? __( 'custom table', 'meta-box-builder' )
		: __( 'model table', 'meta-box-builder' );

	/* translators: %1$d: number of field IDs, %2$s: table type (model table / custom table) */
	const editableMessage = _n(
		'%1$d field ID does not match the %2$s. Update the field ID to match a column, or <a>update the schema</a>.',
		'%1$d field IDs do not match the %2$s. Update the field IDs to match columns, or <a>update the schema</a>.',
		count,
		'meta-box-builder'
	);
	/* translators: %1$d: number of field IDs, %2$s: table type (model table / custom table) */
	const readOnlyMessage = _n(
		'%1$d field ID does not match the %2$s. Update the field ID to match a column, or <a>view the schema</a>.',
		'%1$d field IDs do not match the %2$s. Update the field IDs to match columns, or <a>view the schema</a>.',
		count,
		'meta-box-builder'
	);

	return (
		<div className="notice notice-warning mb-schema-notice">
			<p>
				{
					createInterpolateElement(
						sprintf( readOnly ? readOnlyMessage : editableMessage, count, tableLabel ),
						{
							a: (
								<a
									href="#"
									onClick={ e => {
										e.preventDefault();
										openSchema();
									} }
								/>
							),
						}
					)
				}
			</p>
		</div>
	);
};

export default SchemaMismatchBanner;
