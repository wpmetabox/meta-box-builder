import DivRow from './DivRow';

const Name = ( { name, componentId, nameIdData, ...rest } ) => (
	<DivRow htmlFor={ componentId } { ...rest }>
		<input
			type="text"
			id={ componentId }
			name={ name }
			value={ nameIdData.name }
			onChange={ e => nameIdData.updateName( e.target.value ) }
			onBlur={ nameIdData.noAutoGenerateId }
		/>
	</DivRow>
);

export default Name;