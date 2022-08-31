import { useContext, useEffect } from "@wordpress/element";
import dotProp from "dot-prop";
import { FieldIdsContext } from "../../contexts/FieldIdsContext";
import { FieldsDataContext } from "../../contexts/FieldsDataContext";
import ThemeCode from "./CodeTypes/ThemeCode";

const Codes = (props) => {
  let fields = [];

  const { fieldTypes, fieldCategories } = useContext(FieldsDataContext);
  if (Object.keys(fieldTypes).length !== 0 && fieldCategories.length !== 0) {
    const { fieldIds } = useContext(FieldIdsContext);

    fields = Object.entries(fieldIds).map(([_id, id]) => {
      let name = dotProp.get(props.fields, `${_id}.name`, '');
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
  }

  return (
    <>
      {fields.length > 0 &&
        fields.map((field, index) => (
          <div key={`code_${field._id}`} className="og-result">
            <div className="og-item__header og-collapsible__header">
              <span id={`code-item-title-${field._id}`} item_id={field._id} className="og-item__title">{field.name}</span>
            </div>
            <div className="og-result__body">
              <ThemeCode field={field} />
            </div>
          </div>
        ))
      }
    </>
  );
};

export default Codes;
