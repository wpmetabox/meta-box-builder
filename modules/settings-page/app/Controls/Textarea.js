import DivRow from '/components/Controls/DivRow';

const Textarea = ( { name, value, update, ...rest } ) => (
	<DivRow { ...rest } htmlFor={ name }>
		<textarea value={ value } id={ name } name={ name } rows="4" onChange={ update }></textarea>
	</DivRow>
);

export default Textarea;