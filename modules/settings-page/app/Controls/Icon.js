const { Dashicon } = wp.components;
const Icon = ( { label, name, update, value } ) => (
	<div className="mb-spui-field mb-spui-field--radio">
		<label className="mb-spui-label">{ label }</label>
		<div className="mb-spui-input">
			{
				MBSPUI.icons.map( icon => (
					<label key={ icon } className="mb-spui-choice mb-spui-icon">
						<input type="radio" data-name={ name } value={ `dashicons-${ icon }` } checked={ `dashicons-${ icon }` === value ||  `dashicons-${ icon }` === 'dashicons-admin-generic' } onChange={ update } />
						<Dashicon icon={ icon } />
					</label>
				) )
			}
		</div>
	</div>
);

export default Icon;