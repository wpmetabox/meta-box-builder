import { useForm, FormContext } from "react-hook-form";
import SettingsTab from './Tabs/SettingsTab';
import FieldsTab from './Tabs/FieldsTab/FieldsTab';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { actions } from '../../context/GeneratorContext';
import Result from '../Result';

const { TabPanel } = wp.components;
const { __ } = wp.i18n;

const MainTabs = () => {
  const { handleSubmit, register, control } = useForm();
  const methods = useForm();
  const onSubmit = data => actions.generatePHPCode(data);

  const tabs = [
    {
      name: 'fields',
      title: __( 'Fields', 'meta-box-builder' ),
    },
    {
      name: 'settings',
      title: __( 'Settings', 'meta-box-builder' ),
    },
    {
      name: 'code',
      title: __( 'Get PHP Code', 'meta-box-builder' ),
      className: 'mbb-code button button-small'
    }
  ];
  const panels = {
    fields: (
      <DndProvider backend={HTML5Backend}>
        <FieldsTab />
      </DndProvider>
    ),
    settings: <SettingsTab register={register} />,
    code: <Result />
  }

  const onSelect = tab => {
    if ( tab !== 'code' ) {
      return;
    }
    // TODO: get data in JSON format.
    handleSubmit( onSubmit );
  }

  return (
    <FormContext {...methods} register={register} control={control}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TabPanel className="mbb-tabs" tabs={ tabs } onSelect={ onSelect }>{ tab => panels[tab.name] }</TabPanel>
      </form>
    </FormContext>
  );
}

export default MainTabs;