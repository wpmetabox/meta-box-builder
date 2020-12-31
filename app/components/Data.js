import { ConditionalLogicContext } from '../contexts/ConditionalLogicContext';
const { useContext } = wp.element;

export const Data = () => {
	const { conditionalLogic } = useContext( ConditionalLogicContext );

	return (
		<>
			<datalist id="conditional-logic">
				{
					Object.entries( conditionalLogic ).map( ( [ id, field ] ) => <option key={ id } value={ field.id } /> )
				}
			</datalist>
		</>
	);
};