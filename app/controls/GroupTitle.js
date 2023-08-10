import DivRow from './DivRow';

const GroupTitle = ( { name, componentId, nameIdData, ...rest } ) => (
	<DivRow htmlFor={ componentId } { ...rest }>
		<input
			type="text"
			id={ componentId }
			name={ name }
			value={ nameIdData.group_title }
			onChange={ e => nameIdData.updateGroupTitle( e.target.value ) }
		/>
	</DivRow>
);

export default GroupTitle;