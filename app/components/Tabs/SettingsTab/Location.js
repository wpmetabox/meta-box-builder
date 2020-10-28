import ReactSelect from 'react-select';
import DivRow from '../../Common/DivRow';
const { useState } = wp.element;
const { __ } = wp.i18n;

let objectTypes = [ {
	value: 'post',
	label: __( 'Post', 'meta-box-builder' )
} ];
if ( MbbApp.extensions.termMeta ) {
	objectTypes.push( { value: 'term', label: __( 'Term', 'meta-box-builder' ) } );
}
if ( MbbApp.extensions.userMeta ) {
	objectTypes.push( { value: 'user', label: __( 'User', 'meta-box-builder' ) } );
}
if ( MbbApp.extensions.commentMeta ) {
	objectTypes.push( { value: 'comment', label: __( 'Comment', 'meta-box-builder' ) } );
}
if ( MbbApp.extensions.settingsPage ) {
	objectTypes.push( { value: 'setting', label: __( 'Settings Page', 'meta-box-builder' ) } );
}
if ( MbbApp.extensions.blocks ) {
	objectTypes.push( { value: 'block', label: __( 'Block', 'meta-box-builder' ) } );
}
export const Location = () => {
	const [ objectType, setObjectType ] = useState( 'post' );

	const onSelectObjectType = ( item, { action } ) => {
		if ( 'select-option' !== action ) {
			return;
		}
		setObjectType( item.value );
	};

	return <>
		<h3>{ __( 'Location', 'meta-box-builder' ) }</h3>
		<DivRow label={ __( 'Object type', 'meta-box-builder' ) }>
			<ReactSelect className="react-select" classNamePrefix="react-select" options={ objectTypes } defaultValue={ objectTypes[0] } onChange={ onSelectObjectType } />
		</DivRow>
		{
			'post' === objectType &&
			<DivRow label={ __( 'Post types', 'meta-box-builder' ) }>
				<ReactSelect className="react-select" classNamePrefix="react-select" isMulti={ true } options={ MbbApp.postTypes.map( item => ( { value: item.slug, label: item.name } ) ) } />
			</DivRow>
		}
	</>;
};