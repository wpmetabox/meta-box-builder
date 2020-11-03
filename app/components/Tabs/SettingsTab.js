import React from 'react';
import Checkbox from '../Common/Checkbox';
import DivRow from '../Common/DivRow';
import Input from '../Common/Input';

const SettingsTab = ( { register, defaultValues } ) => {
  return (
    <>
      <h3>Options</h3>
      <Input register={ register } name="title" label="Meta box title" defaultValue={ defaultValues?.title || "Untitled" } />
      <Input register={ register } name="id" label="Meta box ID" defaultValue={ defaultValues?.id || "untitled" } />
      <DivRow label="Post types" className="og-field--check">
        <label><input type="checkbox" ref={ register } name="post_types" value="post" defaultChecked={ defaultValues?.post_types.includes( 'post' ) || true } /> Post</label>
        <label><input type="checkbox" ref={ register } name="post_types" value="page" defaultChecked={ defaultValues?.post_types.includes( 'page' ) || false } /> Page</label>
      </DivRow>
      <DivRow label="Position" htmlFor="context" >
        <select ref={ register } id="context" name="context" defaultValue={ defaultValues?.context || "advanced" }>
          <option value="normal">After content</option>
          <option value="side">Side</option>
          <option value="form_top">Before post title</option>
          <option value="after_title">After post title</option>
        </select>
      </DivRow>
      <DivRow label="Priority" className="og-field--check">
        <label><input ref={ register } type="radio" name="priority" value="high" defaultChecked={ defaultValues?.priority === 'high' || true } /> High</label>
        <label><input ref={ register } type="radio" name="priority" value="low" defaultChecked={ defaultValues?.priority === 'low' || false } /> Low</label>
      </DivRow>
      <Checkbox register={ register } name="autosave" label="Autosave" defaultValue={ defaultValues?.autosave || false } />
      <h3>Advanced</h3>
      <Input register={ register } name="prefix" label="Field ID prefix" defaultValue={ defaultValues?.prefix || "prefix-" } description="Prefix for all fields' ID. Leave empty to ignore or use _ to make fields hidden." tooltip="Auto add a prefix to all field IDs to keep them separated from other field groups or other plugins." />
      <Input register={ register } name="text_domain" label="Text domain" defaultValue={ defaultValues?.text_domain || "online-generator" } tooltip="Required for multilingual website. Used in the exported code only." />
    </>
  );
};
export default SettingsTab;
