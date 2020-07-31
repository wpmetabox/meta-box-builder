import { TEXT_INPUT, NUMBER_INPUT, CHECKBOX, fields, DROPDOWN_MENU, RADIO_CHECKBOX, LIST_OPTION_TYPE, DATA_LIST_TYPE } from '../constants/constants';

export const getLabel = (name, type) => {
    const labels = {
        class: "Custom CSS class",
        std: "Default value",
        size: "Size of the input box",
        placeholder: "Placeholder",
        min: "Minimum value",
        max: "Maximum value",
        rows: "Rows",
        cols: "Columns",
        prefix: "Prefix",
        suffix: "Suffix",
        timestamp: "Timestamp",
        max_file_uploads: "Maximum number of files",
        options: "Options",
        parent: "Parent",
        taxonomy: "Taxonomy",
    };

    return (name === 'std' && type === 'checkbox') ? "Checked?" : labels[name];
};

export const getElementControlName = (name, type) => {
    let types;
    switch (name) {
        case 'std':
            types = {
                button: 'StdButton',
                checkbox: 'StdCheckbox',
                checkbox_list: 'StdChoice',
                map: 'StdMap',
                select: 'StdChoice',
                textarea: 'StdChoice',
                wysiwyg: 'StdChoice',
            };
            return types[type] || 'TextInput';
        case 'placeholder':
        case 'class':
        case 'min':
        case 'max':
            return 'TextInput';
        case 'size':
        case 'rows':
        case 'cols':
        case 'max_file_uploads':
            return 'NumberInput';
        case 'inline':
            types = {
                date: 'InlineDate',
                datetime: 'InlineDate',
            };
            return types[type] || 'Inline';
        case 'options':
            types = {
                fieldset_text: 'OptionsFieldsetText',
                text_list: 'OptionsTextList',
                wysiwyg: 'OptionsWysiwyg',
            };
            return types[type] || 'Options';
        case 'query_args':
            types = {
                taxonomy: 'QueryArgsTaxonomy',
                taxonomy_advanced: 'QueryArgsTaxonomy',
                user: 'QueryArgsUser',
            };
            return types[type] || 'QueryArgs';
        case 'js_options':
            types = {
                date: 'JsOptionsDate',
                datetime: 'JsOptionsDate',
                slider: 'JsOptionsSlider',
                time: 'JsOptionsTime',
            };
            return types[type] || 'JsOptions';
        default:
            return toTitleCase(name);
    }
}

export const getElementType = (name) => {
    const inputsText = ['id', 'name', 'desc', 'std', 'placeholder', 'min', 'max', 'rows', 'cols', 'prefix', 'suffix', 'address_field', 'api_key', 'region', 'mime_type'];
    const inputsNumber = ['size', 'step', 'max_file_uploads'];
    const checkboxes = ['clone', 'inline', 'multiple', 'timestamp', 'force_delete', 'max_status', 'parent', 'raw'];
    const ratioCheckbox = ['field_type'];
    const dropdownMenu = ['post_type', 'taxonomy']
    let type = ''
    if (inputsText.includes(name)) {
        type = TEXT_INPUT
    }
    if (inputsNumber.includes(name)) {
        type = NUMBER_INPUT
    }
    if (checkboxes.includes(name)) {
        type = CHECKBOX
    }
    if (ratioCheckbox.includes(name)) {
        type = RADIO_CHECKBOX
    }
    if (dropdownMenu.includes(name)) {
        type = DROPDOWN_MENU
    }

    return type
}

export const getDataCopiedItem = (type, index) => {
    let data = fields[type];
    let result = {}
    result.general = getGeneralData(data.general, index);
    result.advanced = getAdvancedData(data.advanced, index)

    return result
}

const getGeneralData = (generalItems, index) => {
    let result = {}
    const multipleInputTypes = ['fieldset_text', 'text_list'];

    Object.keys(generalItems).forEach(item => {
        const elementName = `fields-${index}-${item}`;
        let value = getElementValue(elementName);
        value = value ? value : generalItems[item]
        result[item] = value;

        if (item === 'options' && multipleInputTypes.includes(item)) {
            let options = []
            for (let i = 0; i < value; i++) {
                options[i] = {}
                options[i]['key'] = getElementValue(`fields-${index}-${item}-${i}-key`);
                options[i]['label'] = getElementValue(`fields-${index}-${item}-${i}-label`);
            }
            result[item] = options;
        }
    })

    return result
}

const getAdvancedData = (advancedItems, index) => {
    let result = {}
    Object.keys(advancedItems).forEach(item => {
        const elementName = `fields-${index}-${item}`;
        let value = getElementValue(elementName);
        value = value ? value : advancedItems[item]
        if (LIST_OPTION_TYPE.includes(item)) {
            let optionalList = []
            for (let i = 0; i < value; i++) {
                optionalList[i] = {}
                optionalList[i]['key'] = getElementValue(`fields-${index}-${item}-${i}-key`);
                optionalList[i]['label'] = getElementValue(`fields-${index}-${item}-${i}-label`);
            }

            result[item] = optionalList;
        } else if (DATA_LIST_TYPE.includes(item)) {
            let dataList = []
            let idDataList = document.getElementsByName(`fields-${index}-datalist-id`)[0]?.value
            const listValue = document.getElementsByName(`fields-${index}-datalist-options-0`);

            listValue.forEach(input => {
                dataList.push(input.value);
            });

            result[item] = { id: idDataList, items: dataList };
        } else {
            result[item] = value;
        }
    })

    return result
}

const getElementValue = name => {
    const element = document.querySelector(`[name="${name}"]`);
    if (!element) {
        return null;
    }
    if (['select', 'textarea'].includes(element.tagName) || ['text', 'number', 'email'].includes(element.type)) {
        return element.value;
    }
    if ('checkbox' === element.type) {
        return element?.checked;
    }
    if ('radio' === element.type) {
        return document.querySelector(`[name="${name}"]:checked`).value;
    }
}

export const updateSelectedList = data => localStorage.setItem('selectedList', JSON.stringify(data))

export const getSelectedList = () => JSON.parse(localStorage.getItem('selectedList'))


export const ucfirst = string => string.charAt(0).toUpperCase() + string.slice(1);
const toTitleCase = string => string.split('_').map(ucfirst).join('');