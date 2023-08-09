import DivRow from './DivRow';

const Id = ( { name, componentId, nameIdData, ...rest } ) => (
	<DivRow htmlFor={ componentId } { ...rest }>
		<input
			type="text"
			id={ componentId }
			name={ name }
			value={ nameIdData.id }
			onChange={ e => nameIdData.updateId( e.target.value ) }
		/>
	</DivRow>
);

export default Id;