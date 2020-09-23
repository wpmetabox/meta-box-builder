import { useForm, FormContext } from "react-hook-form";
import SettingsTab from './Tabs/SettingsTab';
import FieldsTab from './Tabs/FieldsTab/FieldsTab';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { actions, Context } from '../../context/GeneratorContext';

const { useState, useEffect, useContext } = wp.element;
const { TabPanel } = wp.components;
const { __ } = wp.i18n;

const MainTabs = () => {
  const { handleSubmit, register, control } = useForm();
  const methods = useForm();

  const state = useContext(Context);
  const [loading, setLoading] = useState(false);

  const onSubmit = data => {
    setLoading(true);
    actions.generatePHPCode(data);
  }

  useEffect(() => setLoading(false), [state.state.responseTime])

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
    code: (
      <>
        This is code tab
      </>
    )
  }

  return (
    <FormContext {...methods} register={register} control={control}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TabPanel className="mbb-tabs" tabs={ tabs }>{ tab => panels[tab.name] }</TabPanel>
        <button type="submit" className="button button-primary" disabled={loading}>Generate Code</button> {loading && <span className="og-loading">Generating code. Please wait...</span>}
      </form>
    </FormContext>
  );
}

export default MainTabs;