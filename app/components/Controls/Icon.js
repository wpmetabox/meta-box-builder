import DivRow from './DivRow';
const { Dashicon } = wp.components;

const Icon = ( { name, componentId, defaultValue, ...rest } ) => (
	<DivRow htmlFor={ componentId } className="og-icon" { ...rest }>
		{
			MbbApp.icons.map( icon => (
				<label key={ icon } className="og-icon__select">
					<input type="radio" name={ name } value={ icon } defaultChecked={ icon === defaultValue } />
					<Dashicon icon={ icon } />
				</label>
			) )
		}
	</DivRow>
);

export default Icon;