import { useEffect, useState } from "@wordpress/element";
import dotProp from "dot-prop";
import { getFieldValue } from "../functions";

export const useCodes = (field) => {
    const [settings, setSettings] = useState(MbbApp.settings);
    const [value, setValue] = useState(`<?php rwmb_the_value( '${field.id}' ) ?>`);
    // Change Setting location
    useEffect(() => {
        jQuery('#react-tabs-3 #settings-object_type').on('change', () => {
            setSettings(getFieldValue('settings'));
        });
    }, [settings])
    // End Change Setting location

    // const [objectType, setObjectType] = useState(dotProp.get(settings, 'object_type', 'post'));
    // const [postTypes, setPostTypes] = useState(ensureArray(dotProp.get(settings, 'post_types', ['post'])));

    // console.log("objectType: " + objectType)
    // console.log("postTypes: " + postTypes)

    useEffect(() => {
        console.log("object_type: ", settings)
        const args = [];
        let object_id = '';
        switch (settings.object_type) {
            case "setting":
                args.push("'object_type' => 'setting'");
                object_id = dotProp.get(settings, "settings_pages.0", "");
                break;
            case "term":
                args.push("'object_type' => 'term'");
                object_id = dotProp.get(settings, "taxonomies.0", "");
                break;
            case "comment":
                args.push("'object_type' => 'comment'");
                break;
        }

        if (args.length > 0) {
            if (object_id === '') {
                setValue(
                    `<?php \n\t $value = rwmb_meta( '${field.id}', [${args.join(', ')}]); \n\t echo $value; \n ?>`
                );
            } else {
                setValue(
                    `<?php \n\t $value = rwmb_meta( '${field.id}', [${args.join(', ')}], '${object_id}'); \n\t echo $value; \n ?>`
                );
            }
        }
    }, [settings]);

    return value;
}