import DivRow from './DivRow';
const ToggleGroup = ( { name, options, defaultValue, ...rest } ) => (
	<DivRow { ...rest }>
		<div className="og-toggle-group">
			{
				Object.entries( options ).map( ( [ value, label ] ) => (
					<label key={ value }>
						<input type="radio" name={ name } defaultValue={ value } defaultChecked={ value === defaultValue } />
						<span className="dashicons dashicons-yes-alt"></span>
						<span>{ label }</span>
					</label>
				) )
			}
		</div>
	</DivRow>
);

export default ToggleGroup;