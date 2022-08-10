import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import { UnControlled as CodeMirror } from "react-codemirror2";
import { ClipboardButton } from "@wordpress/components";
const { withState } = wp.compose;
import dotProp from "dot-prop";
import { useCodes } from "../../../hooks/useCodes";

const ThemeCode = ({ settings, field }) => {
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
