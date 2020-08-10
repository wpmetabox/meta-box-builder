import React, { useState, useEffect, useContext } from 'react';
import 'react-tabs/style/react-tabs.css';
import { useForm } from "react-hook-form";
import { TabPanel, Tabs, TabList, Tab } from 'react-tabs';
import SettingsTab from './Tabs/SettingsTab';
import FieldsTab from './Tabs/FieldsTab/FieldsTab';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { settingIcon, fieldIcon } from '../../constants/icons';
import { actions, Context } from '../../context/GeneratorContext';

export const MainTabs = () => {
  const { handleSubmit, register, setValue, getValues } = useForm();
  const methods = useForm();

  const state = useContext(Context);
  const [loading, setLoading] = useState(false);

  const onSubmit = data => {
    setLoading(true);
    actions.generatePHPCode(data);
  }

  useEffect(() => setLoading(false), [state.state.responseTime])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Tabs forceRenderTabPanel={true}>
        <TabList>
          <Tab>{fieldIcon} Fields</Tab>
          <Tab>{settingIcon} Settings</Tab>
        </TabList>
        <TabPanel>
          <DndProvider backend={HTML5Backend}>
            <FieldsTab register={register} setValue={setValue} getValues={getValues} />
          </DndProvider>
        </TabPanel>
        <TabPanel>
          <SettingsTab register={register} />
        </TabPanel>
      </Tabs>
      <button type="submit" disabled={loading}>Generate Code</button> {loading && <span className="og-loading">Generating code. Please wait...</span>}
    </form>
  );
}

export default MainTabs;