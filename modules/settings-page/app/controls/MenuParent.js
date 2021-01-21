import Select from '/components/Controls/Select';

const MenuParent = props => <Select { ...props } options={ MbbApp.menu_parents } />;
export default MenuParent;