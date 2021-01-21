import Select from '/components/Controls/Select';

const MenuPosition = props => <Select { ...props } options={ MbbApp.menu_positions } />;
export default MenuPosition;