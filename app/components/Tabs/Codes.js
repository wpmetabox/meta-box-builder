import { useContext } from "@wordpress/element";
import dotProp from "dot-prop";
import { FieldIdsContext } from "../../contexts/FieldIdsContext";
import ThemeCode from "./CodeTypes/ThemeCode";

const Codes = (props) => {
  const { fieldIds } = useContext(FieldIdsContext);
  console.log("Field Context OK: ", fieldIds);

  const fields = Object.entries(fieldIds).map(([_id, id]) => {
    let name = dotProp.get(props.fields, `${_id}.name`, '');

    // if (name === '') {
    //   name = document.getElementById(`fields-${_id}-name`).value;
    // }

    return { _id, id, name }
  })

  // const changeSettings = () => {
  //   console.log(MbbApp);
  // }

  // useEffect(() => {
  //   const timmer = setInterval(() => {

  //     const settingsObjectType = document.querySelector('#settings-object_type');
  //     if (settingsObjectType != null) {
  //       if (settingsObjectType) {
  //         settingsObjectType.addEventListener('change', changeSettings);
  //       }

  //       clearInterval(timmer);
  //     }

  //   }, 200);
  // }, [])

  // console.log(props);
  return (
    <>
      {fields.length > 0 &&
        fields.map((field, index) => (
          <div key={`code_${field._id}`} className="og-result">
            <div className="og-item__header og-collapsible__header">
              <span className="og-item__title">{field.name}</span>
            </div>
            <div className="og-result__body">
              <ThemeCode settings={props.settings} field={field} />
            </div>
          </div>
        ))}
    </>
  );
};

export default Codes;
