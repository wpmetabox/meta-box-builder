const { Fragment } = wp.element;
const { __ } = wp.i18n;

export const FieldMenu = ( { onSelectField, fieldTypes } ) => (
	<>
		{
			Object.keys( fieldTypes ).length
			? Object.entries( fieldTypes ).map( ( [ title, list ] ) =>
				<Fragment key={ title }>
					<div className="og-inserter__title">{ title }</div>
					<div className="og-inserter__content">
						{
							Object.entries( list ).map( ( [ type, label ] ) =>
								<button type="button" className="button" key={ type } onClick={ () => onSelectField( type ) }>{ label }</button>
							)
						}
					</div>
				</Fragment>
			)
			: <p>{ __( 'Fetching field types, please wait...', 'meta-box-builder' ) }</p>
		}
	</>
);