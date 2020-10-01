import { useForm, FormProvider } from "react-hook-form";
import SettingsTab from './Tabs/SettingsTab';
import FieldsTab from './Tabs/FieldsTab';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { actions, formatParams } from '../context/GeneratorContext';
import Result from './Result';

const { TabPanel } = wp.components;
const { __ } = wp.i18n;
const INPUT_FORM_DATA = 'post_content';

const MainTabs = () => {
  const { handleSubmit, register, control, watch } = useForm();
  const methods = useForm();
  const onSubmit = data => actions.generatePHPCode(data);

  const onPublish = data => {
    const inputData = document.getElementById(INPUT_FORM_DATA)
    inputData.value = JSON.stringify(formatParams(data))
  }

  const tabs = [
    {
      name: 'fields',
      title: __( 'Fields', 'meta-box-builder' ),
      forceLayout:true
    },
    {
      name: 'settings',
      title: __( 'Settings', 'meta-box-builder' ),
    },
    {
      name: 'code',
      title: __( 'Code', 'meta-box-builder' ),
    }
  ];
  const panels = {
    fields: (
      <DndProvider backend={HTML5Backend}>
        <FieldsTab watch={watch} />
      </DndProvider>
    ),
    settings: <SettingsTab register={register} />,
    code: <Result />
  }

  const onSelect = tab => {
    if ( tab !== 'code' ) {
      return;
    }
    const submitButton = document.getElementById('submit-form')
    submitButton.click()
    // TODO: get data in JSON format.
    // handleSubmit( onSubmit );
  }

  return (
    <FormProvider {...methods} register={register} control={control}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TabPanel initialTabName='fields' className="mbb-tabs" tabs={ tabs } onSelect={ onSelect }>{ tab => panels[tab.name] }</TabPanel>
        <button type="submit" style={{display: 'none'}} id="submit-form" />
      </form>
      <input type="hidden" id={INPUT_FORM_DATA} />
      <button onClick={handleSubmit(onPublish)}>Publish</button>
    </FormProvider>
  );
}

export default MainTabs;