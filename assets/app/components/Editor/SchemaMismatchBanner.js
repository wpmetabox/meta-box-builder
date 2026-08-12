import { createInterpolateElement } from '@wordpress/element';
import { _n, sprintf } from '@wordpress/i18n';
import useModelSchema from '../../hooks/useModelSchema';

const SchemaMismatchBanner = () => {
	const missingFieldIds = useModelSchema( state => state.missingFieldIds );
	const openSchema = useModelSchema( state => state.openSchema );

	if ( missingFieldIds.length === 0 ) {
		return null;
	}

	const message = createInterpolateElement(
		sprintf(
			/* translators: %d: number of field IDs */
			_n(
				'%d field ID does not match the model table. Update the field ID to match a column, or <a>update the schema</a>.',
				'%d field IDs do not match the model table. Update the field IDs to match columns, or <a>update the schema</a>.',
				missingFieldIds.length,
				'meta-box-builder'
			),
			missingFieldIds.length
		),
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
