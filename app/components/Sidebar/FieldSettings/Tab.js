import { Suspense } from "@wordpress/element";
import { getControlParams } from '/functions';

const Tab = ( { controls, field, parent = '', updateField } ) => {
	const getControlComponent = control => {
		let [ Control, input, defaultValue ] = getControlParams( control, field, () => {}, true );

		// Safe fallback to 'text' for not-recommended HTML5 field types.
		if ( control.setting === 'type' ) {
			defaultValue = [ 'datetime-local', 'month', 'tel', 'week' ].includes( defaultValue ) ? 'text' : defaultValue;
		}

		let props = {
			componentName: control.setting,
			componentId: `fields-${ field._id }-${ control.setting }`,
			...control.props,
			name: `fields${ parent }[${ field._id }]${ input }`,
			defaultValue,
			field,
		};

		// Specific settings that have live update.
		const settingsWithLiveUpdate = [
			'name',
			'id',
			'required',
			'clone_settings',
			'label_description',
			'desc',
			'placeholder',
			'size',
			'prepend_append',
			'group_title',
			'icon',
			'icon_url',
			'icon_fa',
		];
		if ( settingsWithLiveUpdate.includes( control.setting ) ) {
			props = { ...props, updateField };
		}

		return <Control { ...props } />;
	};

	return controls.map( control => <Suspense fallback={ null } key={ control.setting }>{ getControlComponent( control ) }</Suspense> );
};

export default Tab;