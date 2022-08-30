import { ClipboardButton } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { UnControlled as CodeMirror } from "react-codemirror2";
import { useCodes } from "../../../hooks/useCodes";
const { withState } = wp.compose;

const ThemeCode = ({ settings, field }) => {
  // const [objectType, setObjectType] = useState(dotProp.get(settings, 'object_type', 'post'));
  // const [postTypes, setPostTypes] = useState(ensureArray(dotProp.get(settings, 'post_types', ['post'])));

  const codeValue = useCodes(field, settings);
  const { object_type, settings_pages } = settings;
  const Button = withState({ hasCopied: false })(
    ({ hasCopied, setState, textCode }) => (
      <ClipboardButton
        className="button"
        text={textCode}
        onCopy={() => setState({ hasCopied: true })}
        onFinishCopy={() => setState({ hasCopied: false })}
      >
        {hasCopied
          ? __("Copied!", "meta-box-builder")
          : __("Copy", "meta-box-builder")}
      </ClipboardButton>
    )
  );

  return (
    <>
      <CodeMirror
        value={codeValue}
        editorDidMount={(editor) => {
          editor.setSize("", "100%");
        }}
        options={{
          mode: "php",
          lineNumbers: true,
          smartIndent: true,
          readOnly: true,
          lineWrapping: true,
          viewportMargin: Infinity,
        }}
      />

      <Button textCode={codeValue} />
    </>
  );
};

export default ThemeCode;
