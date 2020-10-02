import { useForm, FormProvider } from "react-hook-form";
import SettingsTab from './Tabs/SettingsTab';
import FieldsTab from './Tabs/FieldsTab';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { actions, formatParams } from '../context/GeneratorContext';
import Result from './Result';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const { useEffect } = wp.element;
const { __ } = wp.i18n;
const SUBMIT_FORM_BUTTON = 'submit-form';

const MainTabs = () => {
  const { handleSubmit, register, control } = useForm();
  const methods = useForm();
  const onSubmit = data => {
    actions.generatePHPCode( data );
  };

  const onPublish = data => {
    const inputData = document.getElementById( 'post_content' );
    inputData.value = JSON.stringify( formatParams( data ) );
  };

  const onSelect = ( index ) => {
    const isGetCodeTab = index === 2;
    if ( isGetCodeTab ) {
      document.getElementById( SUBMIT_FORM_BUTTON ).click();
    }
  };

  useEffect( () => {
    document.querySelector( '#publish' ).addEventListener( 'click', handleSubmit( onPublish ) );
  }, [] );

  return (
    <FormProvider { ...methods } register={ register } control={ control }>
      <form onSubmit={ handleSubmit( onSubmit ) } id='myForm'>
        <Tabs forceRenderTabPanel={ true } onSelect={ onSelect }>
          <TabList>
            <Tab>{ __( 'Fields', 'meta-box-builder' ) }</Tab>
            <Tab>{ __( 'Settings', 'meta-box-builder' ) }</Tab>
            <Tab>{ __( 'Code', 'meta-box-builder' ) }</Tab>
          </TabList>
          <TabPanel>
            <DndProvider backend={ HTML5Backend }>
              <FieldsTab />
            </DndProvider>
          </TabPanel>
          <TabPanel>
            <SettingsTab register={ register } />
          </TabPanel>
          <TabPanel>
            <Result />
          </TabPanel>
        </Tabs>
        <button type="submit" style={ { display: 'none' } } id={ SUBMIT_FORM_BUTTON } />
      </form>
      <input type="hidden" id="post_content" />
      <button onClick={ handleSubmit( onPublish ) }>Publish</button>
    </FormProvider>
  );
};

export default MainTabs;