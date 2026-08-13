import { createInterpolateElement } from '@wordpress/element';
import { _n, sprintf } from '@wordpress/i18n';
import useModelSchema from '../../hooks/useModelSchema';

const SchemaMismatchBanner = () => {
	const missingFieldIds = useModelSchema( state => state.missingFieldIds );
	const selectedModel = useModelSchema( state => state.selectedModel );
	const openSchema = useModelSchema( state => state.openSchema );

	if ( missingFieldIds.length === 0 ) {
		return null;
	}

	const readOnly = ! selectedModel?.post_id;
	const editableMessage = sprintf(
		/* translators: %d: number of field IDs */
		_n(
			'%d field ID does not match the model table. Update the field ID to match a column, or <a>update the schema</a>.',
			'%d field IDs do not match the model table. Update the field IDs to match columns, or <a>update the schema</a>.',
			missingFieldIds.length,
			'meta-box-builder'
		),
		missingFieldIds.length
	);
	const readOnlyMessage = sprintf(
		/* translators: %d: number of field IDs */
		_n(
			'%d field ID does not match the model table. Update the field ID to match a column, or <a>view the schema</a>.',
			'%d field IDs do not match the model table. Update the field IDs to match columns, or <a>view the schema</a>.',
			missingFieldIds.length,
			'meta-box-builder'
		),
		missingFieldIds.length
	);

	const message = createInterpolateElement(
		readOnly ? readOnlyMessage : editableMessage,
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
	);

	return (
		<div className="notice notice-warning mb-schema-notice">
			<p>{ message }</p>
		</div>
	);
};

export default SchemaMismatchBanner;
