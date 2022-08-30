import { useContext, useEffect } from "@wordpress/element";
import dotProp from "dot-prop";
import { FieldIdsContext } from "../../contexts/FieldIdsContext";
import { FieldsDataContext } from "../../contexts/FieldsDataContext";
import { SettingsDataContext } from "../../contexts/SettingsDataContext";
import ThemeCode from "./CodeTypes/ThemeCode";

const Codes = (props) => {
  let fields = [];

  const { fieldTypes, fieldCategories } = useContext(FieldsDataContext);
  if (Object.keys(fieldTypes).length !== 0 && fieldCategories.length !== 0) {
    const { fieldIds } = useContext(FieldIdsContext);

    fields = Object.entries(fieldIds).map(([_id, id]) => {
      let name = dotProp.get(props.fields, `${_id}.name`, '');
      console.log(jQuery(`#fields-${_id}-name`).length);
      return { _id, id, name }
    })

    // Show code add new field.  
    useEffect(() => {
      if (fields.length > 0) {
        const last_field = fields[fields.length - 1];
        let timmer = setInterval(() => {
          if (last_field.name === '' && jQuery(`#fields-${last_field._id}-name`).length > 0) {
            jQuery(`.og-tab-panel--theme-code .og-result span[item_id="${last_field._id}"]`).text(jQuery(`#fields-${last_field._id}-name`).val());
            clearInterval(timmer);
          }

          return () => clearInterval(timmer);
        }, 200);
      }
    }, [fields])
    //End Show code add new field.

    // Change Setting location
    const { settingsControls } = useContext(SettingsDataContext);
    useEffect(() => {
      if (settingsControls.length !== 0) {
        jQuery('#react-tabs-3 #settings-object_type').on('change', () => {
          console.log(MbbApp);
        });
      }
    }, [settingsControls])
    // End Change Setting location
  }

  // console.log(useContext(FieldsDataContext));
  console.log(props.settings);
  return (
    <>
      {fields.length > 0 &&
        fields.map((field, index) => (
          <div key={`code_${field._id}`} className="og-result">
            <div className="og-item__header og-collapsible__header">
              <span id={`code-item-title-${field._id}`} item_id={field._id} className="og-item__title">{field.name}</span>
            </div>
            <div className="og-result__body">
              <ThemeCode settings={props.settings} field={field} />
            </div>
          </div>
        ))
      }
    </>
  );
};

export default Codes;
