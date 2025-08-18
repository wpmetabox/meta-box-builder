import useFloatingStructurePanel from '../../hooks/useFloatingStructurePanel';
import FloatingStructurePanel from './FloatingStructurePanel';
import NormalStructurePanel from './NormalStructurePanel';

const StructurePanel = () => {
	const { floating } = useFloatingStructurePanel();
	return floating ? <FloatingStructurePanel /> : <NormalStructurePanel />;
};

export default StructurePanel;