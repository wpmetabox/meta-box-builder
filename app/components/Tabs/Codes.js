import useFields from "../../hooks/useFields";
import ThemeCode from "./CodeTypes/ThemeCode";

const Codes = (props) => {
  const { fields, setFields } = useFields(
    Object.values(props.fields),
    "fields"
  );

  console.log(props);
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
