export const fieldTypes = {
  Basic: {
    button: 'Button',
    // button_group
    checkbox: 'Checkbox',
    checkbox_list: 'Checkbox List',
    email: 'Email',
    hidden: 'Hidden',
    number: 'Number',
    password: 'Password',
    radio: 'Radio',
    range: 'Range',
    select: 'Select',
    select_advanced: 'Select Advanced',
    text: 'Text',
    textarea: 'Textarea',
    url: 'URL',
  },
  Advanced: {
    autocomplete: 'Autocomplete',
    // background
    color: 'Color Picker',
    // custom_html
    date: 'Date',
    datetime: 'Date Time',
    fieldset_text: 'Fieldset Text',
    map: 'Google Maps',
    // key_value
    image_select: 'Image Select',
    oembed: 'oEmbed',
    // osm
    slider: 'Slider',
    // switch
    text_list: 'Text List',
    time: 'Time',
    wysiwyg: 'WYSIWYG',
  },
  WordPress: {
    post: 'Post',
    // sidebar
    taxonomy: 'Taxonomy',
    taxonomy_advanced: 'Taxonomy Advanced',
    user: 'User',
  },
  Upload: {
    file: 'File',
    file_advanced: 'File Advanced',
    // file_upload
    file_input: 'File Input',
    image: 'Image',
    image_advanced: 'Image Advanced',
    // image_upload
    // single_image
    video: 'Video',
  },
  Layout: {
    divider: 'Divider',
    heading: 'Heading',
    group: 'Group',
  },
};

export const fields = {
  text: {
    general: {
      id: '',
      type: 'text',
      name: 'Text',
      desc: '',
      std: '',
      placeholder: '',
      size: '',
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      attributes: [],
    },
  },
  number: {
    general: {
      id: '',
      type: 'number',
      name: 'Number',
      desc: '',
      std: '',
      min: '',
      max: '',
      step: '',
      placeholder: '',
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      attributes: [],
    },
  },
  url: {
    general: {
      id: '',
      type: 'url',
      name: 'URL',
      desc: '',
      std: '',
      placeholder: '',
      size: '',
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      attributes: [],
    },
  },
  email: {
    general: {
      id: '',
      name: 'Email',
      type: 'email',
      desc: '',
      std: '',
      placeholder: '',
      size: '',
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      attributes: [],
    },
  },
  range: {
    general: {
      id: '',
      name: 'Range',
      type: 'range',
      desc: '',
      std: 0,
      min: 0,
      max: 9,
      step: 1,
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      attributes: [],
    },
  },
  text_list: {
    general: {
      id: '',
      type: 'text_list',
      name: 'Text List',
      desc: '',
      options: [],
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      attributes: [],
    },
  },
  checkbox: {
    general: {
      id: '',
      name: 'Checkbox',
      type: 'checkbox',
      desc: '',
      std: false,
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      attributes: [],
    },
  },
  checkbox_list: {
    general: {
      id: '',
      name: 'Checkbox List',
      type: 'checkbox_list',
      desc: '',
      options: '',
      std: '',
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      attributes: [],
    },
  },
  button: {
    general: {
      id: '',
      type: 'button',
      name: 'Button',
      desc: '',
      std: '',
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      attributes: [],
    },
  },
  password: {
    general: {
      id: '',
      type: 'password',
      name: 'Password',
      desc: '',
      std: '',
      placeholder: '',
      size: '',
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      attributes: [],
    },
  },
  radio: {
    general: {
      id: '',
      name: 'Radio',
      type: 'radio',
      desc: '',
      options: [],
      inline: true,
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      attributes: [],
    },
  },
  select: {
    general: {
      id: '',
      name: 'Select',
      type: 'select',
      desc: '',
      options: '',
      std: '',
      placeholder: '',
      multiple: false,
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      attributes: [],
    },
  },
  select_advanced: {
    general: {
      id: '',
      name: 'Select Advanced',
      type: 'select_advanced',
      desc: '',
      options: '',
      std: '',
      placeholder: '',
      multiple: false,
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      js_options: [],
      attributes: [],
    },
  },
  textarea: {
    general: {
      id: '',
      type: 'textarea',
      name: 'Textarea',
      desc: '',
      std: '',
      placeholder: '',
      rows: '',
      cols: '',
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      attributes: [],
    },
  },
  hidden: {
    general: {
      id: '',
      type: 'hidden',
      std: '',
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      attributes: [],
    },
  },
  image_select: {
    general: {
      id: '',
      type: 'image_select',
      name: 'Image Select',
      desc: '',
      std: '',
      options: '',
      multiple: false,
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      attributes: [],
    },
  },
  color: {
    general: {
      id: '',
      name: 'Color Picker',
      type: 'color',
      desc: '',
      std: '',
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      attributes: [],
    },
  },
  oembed: {
    general: {
      id: '',
      type: 'oembed',
      name: 'oEmbed',
      desc: '',
      std: '',
      placeholder: '',
      size: '',
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      attributes: [],
    },
  },
  slider: {
    general: {
      id: '',
      type: 'slider',
      name: 'Slider',
      desc: '',
      std: '',
      prefix: '',
      suffix: '',
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      js_options: [],
      attributes: [],
    },
  },
  wysiwyg: {
    general: {
      id: '',
      name: 'WYSIWYG',
      type: 'wysiwyg',
      desc: '',
      std: '',
      raw: false,
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      options: [],
      attributes: [],
    },
  },
  autocomplete: {
    general: {
      id: '',
      type: 'autocomplete',
      name: 'Autocomplete',
      desc: '',
      options: '',
      size: '',
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      attributes: [],
    },
  },
  fieldset_text: {
    general: {
      id: '',
      type: 'fieldset_text',
      name: 'Fieldset Text',
      desc: '',
      options: [],
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      attributes: [],
    },
  },
  map: {
    general: {
      id: '',
      type: 'map',
      name: 'Map',
      desc: '',
      std: '',
      api_key: '',
      address_field: '',
      region: '',
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      attributes: [],
    },
  },
  group: {
    general: {
      id: 'group',
      type: 'group',
      name: 'Group',
      desc: '',
    },
    advanced: {
      attributes: [],
    },
  },
  heading: {
    general: {
      type: 'heading',
      name: 'Heading',
      desc: '',
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      attributes: [],
    },
  },
  divider: {
    general: {
      type: 'divider',
      before: '',
      after: '',
    },
  },
  date: {
    general: {
      id: '',
      type: 'date',
      name: 'Date Picker',
      desc: '',
      std: '',
      size: '',
      inline: false,
      timestamp: false,
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      js_options: [],
      attributes: [],
    },
  },
  datetime: {
    general: {
      id: '',
      type: 'datetime',
      name: 'Date Time Picker',
      desc: '',
      std: '',
      size: '',
      inline: false,
      timestamp: false,
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      js_options: [],
      attributes: [],
    },
  },
  time: {
    general: {
      id: '',
      name: 'Time Picker',
      type: 'time',
      desc: '',
      std: '',
      size: '',
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      js_options: [],
      attributes: [],
    },
  },
  post: {
    general: {
      id: '',
      type: 'post',
      name: 'Post',
      desc: '',
      std: '',
      post_type: 'post',
      field_type: 'select_advanced', // select, select_advanced
      parent: false,
      placeholder: '',
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      query_args: [],
      attributes: [],
    },
  },
  taxonomy: {
    general: {
      id: '',
      type: 'taxonomy',
      name: 'Taxonomy',
      desc: '',
      taxonomy: 'category',
      field_type: 'select_advanced',
      std: '',
      placeholder: '',
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      query_args: [],
      attributes: [],
    },
  },
  taxonomy_advanced: {
    general: {
      id: '',
      type: 'taxonomy_advanced',
      name: 'Taxonomy Advanced',
      desc: '',
      taxonomy: 'category',
      field_type: 'select_advanced',
      std: '',
      placeholder: '',
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      query_args: [],
      attributes: [],
    },
  },
  user: {
    general: {
      id: '',
      type: 'user',
      name: 'User',
      desc: '',
      field_type: 'select_advanced', // select, select_advanced,
      std: '',
      placeholder: '',
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      query_args: [],
      attributes: [],
    },
  },
  file: {
    general: {
      id: '',
      type: 'file',
      name: 'File',
      desc: '',
      max_file_uploads: '',
      force_delete: false,
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      attributes: [],
    },
  },
  file_input: {
    general: {
      id: '',
      type: 'file_input',
      name: 'File Input',
      desc: '',
      std: '',
      placeholder: '',
      size: '',
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      attributes: [],
    },
  },
  file_advanced: {
    general: {
      id: '',
      type: 'file_advanced',
      name: 'File Advanced',
      desc: '',
      max_file_uploads: '',
      mime_type: '',
      max_status: true,
      force_delete: false,
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      attributes: [],
    },
  },
  image_advanced: {
    general: {
      id: '',
      type: 'image_advanced',
      name: 'Image Advanced',
      desc: '',
      max_file_uploads: '',
      max_status: false,
      force_delete: false,
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      attributes: [],
    },
  },
  image: {
    general: {
      id: '',
      type: 'image',
      name: 'Image Upload',
      desc: '',
      max_file_uploads: '',
      force_delete: false,
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      attributes: [],
    },
  },
  video: {
    general: {
      id: '',
      type: 'video',
      name: 'Video',
      desc: '',
      max_file_uploads: 4,
      max_status: false,
      force_delete: false,
      clone: false,
    },
    advanced: {
      before: '',
      after: '',
      class: '',
      attributes: [],
    },
  },
};

export const TEXT_INPUT = 'TEXT_INPUT';
export const NUMBER_INPUT = 'NUMBER_INPUT';
export const CHECKBOX = 'CHECKBOX';
export const RADIO_CHECKBOX = 'RADIO_CHECKBOX';
export const DROPDOWN_MENU = 'DROPDOWN_MENU';
export const LIST_WORDPRESS_FIELDS = [
  'post',
  'taxonomy',
  'taxonomy_advanced',
  'user',
];
export const ADVANCED_ADDITIONAL = {
  attributes: {
    title: 'Custom attributes',
    titleLink:
      'https://docs.metabox.io/extensions/meta-box-builder/#custom-attributes',
  },
  select2: {
    title: 'Select2 options',
    titleLink: 'https://select2.org/configuration',
  },
  query_args: {
    title: 'Query arguments',
    titleLink: null,
    buttonName: '+ Option',
  },
  slider: {
    title: 'Slider options',
    titleLink: 'https://api.jqueryui.com/slider/',
    buttonName: '+ Option',
  },
  editor: {
    title: 'Editor options',
    titleLink: 'https://codex.wordpress.org/Function_Reference/wp_editor',
    buttonName: '+ Option',
  },
  time_picker: {
    title: 'Time picker options',
    titleLink: 'https://trentrichardson.com/examples/timepicker/',
    buttonName: '+ Option',
  },
};

export const LIST_OPTION = [
  { type: 'select2', option: 'select_advanced' },
  { type: 'query_args', option: 'post' },
  { type: 'query_args', option: 'taxonomy' },
  { type: 'query_args', option: 'taxonomy_advanced' },
  { type: 'query_args', option: 'user' },
  { type: 'slider', option: 'slider' },
  { type: 'editor', option: 'wysiwyg' },
  { type: 'date_picker', option: 'date' },
  { type: 'datetime_picker', option: 'datetime' },
  { type: 'time_picker', option: 'time' },
];

export const DATA_LIST = ['text', 'oembed', 'file_input'];
export const DATA_LIST_TYPE = ['datalist'];

export const LIST_OPTION_TYPE = [
  'attributes',
  'query_args',
  'js_options',
  'options',
];

export const LIST_ADD_SELECT = [
  'checkbox_list',
  'radio',
  'select',
  'select_advanced',
  'image_select',
  'autocomplete',
];
export const LIST_NO_HEADING = ['text_list', 'fieldset_text'];

export const LIST_FIELD_TYPE = {
  post: [
    { type: 'select', value: 'Select' },
    { type: 'select_tree', value: 'Select tree' },
    { type: 'select_advanced', value: 'Select advanced' },
    { type: 'checkbox_list', value: 'Checkbox list' },
    { type: 'checkbox_tree', value: 'Checkbox tree' },
    { type: 'radio_list', value: 'Radio list' },
  ],
  taxonomy: [
    { type: 'select', value: 'Select' },
    { type: 'select_tree', value: 'Select tree' },
    { type: 'select_advanced', value: 'Select advanced' },
    { type: 'checkbox_list', value: 'Checkbox list' },
    { type: 'checkbox_tree', value: 'Checkbox tree' },
    { type: 'radio_list', value: 'Radio list' },
  ],
  taxonomy_advanced: [
    { type: 'select', value: 'Select' },
    { type: 'select_tree', value: 'Select tree' },
    { type: 'select_advanced', value: 'Select advanced' },
    { type: 'checkbox_list', value: 'Checkbox list' },
    { type: 'checkbox_tree', value: 'Checkbox tree' },
    { type: 'radio_list', value: 'Radio list' },
  ],
  user: [
    { type: 'select', value: 'Select' },
    { type: 'select_advanced', value: 'Select advanced' },
    { type: 'checkbox_list', value: 'Checkbox list' },
    { type: 'radio_list', value: 'Radio list' },
  ],
};
