import { createInterpolateElement } from '@wordpress/element';
import { _n, sprintf } from '@wordpress/i18n';
import useModelSchema from '../../hooks/useModelSchema';

const SchemaMismatchBanner = () => {
	const missingFieldIds = useModelSchema( state => state.missingFieldIds );
	const selectedModel = useModelSchema( state => state.selectedModel );
	const openSchema = useModelSchema( state => state.openSchema );

	const count = missingFieldIds.length;
	if ( ! count ) {
		return null;
	}

	const readOnly = ! selectedModel?.post_id;
	/* translators: %d: number of field IDs */
	const editableMessage = _n(
		'%d field ID does not match the model table. Update the field ID to match a column, or <a>update the schema</a>.',
		'%d field IDs do not match the model table. Update the field IDs to match columns, or <a>update the schema</a>.',
		count,
		'meta-box-builder'
	);
	/* translators: %d: number of field IDs */
	const readOnlyMessage = _n(
		'%d field ID does not match the model table. Update the field ID to match a column, or <a>view the schema</a>.',
		'%d field IDs do not match the model table. Update the field IDs to match columns, or <a>view the schema</a>.',
		count,
		'meta-box-builder'
	);

	return (
		<div className="notice notice-warning mb-schema-notice">
			<p>
				{
					createInterpolateElement(
						sprintf( readOnly ? readOnlyMessage : editableMessage, count ),
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
