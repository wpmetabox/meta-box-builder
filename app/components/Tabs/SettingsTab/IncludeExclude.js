import dotProp from 'dot-prop';
import AsyncSelect from 'react-select/async';
import { request, uniqid } from '../../../functions';
import DivRow from '../../Common/DivRow';
const { useState } = wp.element;
const { Dashicon } = wp.components;
const { __ } = wp.i18n;

export const IncludeExclude = ( { defaultValues } ) => {
	const [ rules, setRules ] = useState( dotProp.get( defaultValues, 'rules', [] ) );

	const addRule = () => setRules( prev => [...prev, { name: 'ID', value: '', id: uniqid() } ] );
	const removeRule = id => setRules( prev => prev.filter( rule => rule.id !== id ) );

	return (
		<DivRow
			className="og-include-exclude"
			label={ `<a href="https://metabox.io/plugins/meta-box-include-exclude/" target="_blank" rel="noopener norefferer">${ __( 'Advanced location rules', 'meta-box-builder' ) }</a>` }
			tooltip={ __( 'More rules on where to display the field group.', 'meta-box-builder' ) }
		>
			{ rules.length > 0 && <Intro defaultValues={ defaultValues } /> }
			{
				rules.map( rule => <Rule
					key={ rule.id }
					rule={ rule }
					baseName={ `settings[include_exclude][rules][${ rule.id }]` }
					removeRule={ removeRule }
				/> )
			}
			<button type="button" className="button" onClick={ addRule }>{ __( '+ Add Rule', 'meta-box-builder' ) }</button>
		</DivRow>
	);
};

const Intro = ( { defaultValues } ) => (
	<div className="og-include-exclude__intro">
		<select name="settings[include_exclude][type]" defaultValue={ dotProp.get( defaultValues, 'type', 'include' ) }>
			<option value="include">{ __( 'Show', 'meta-box-builder' ) }</option>
			<option value="exclude">{ __( 'Hide', 'meta-box-builder' ) }</option>
		</select>
		{ __( 'when', 'meta-box-builder' ) }
		<select name="settings[include_exclude][relation]" defaultValue={ dotProp.get( defaultValues, 'relation', 'OR' ) }>
			<option value="OR">{ __( 'any', 'meta-box-builder' ) }</option>
			<option value="AND">{ __( 'all', 'meta-box-builder' ) }</option>
		</select>
		{ __( 'conditions match', 'meta-box-builder' ) }
	</div>
);

const Rule = ( { rule, baseName, removeRule } ) => {
	const [ name, setName ] = useState( rule.name );
	const onChangeName = e => setName( e.target.value );

	const loadOptions = s => request( 'include-exclude', { name, s } );
	return (
		<div className="og-include-exclude__rule og-attribute">
			<input type="hidden" name={ `${ baseName }[id]` } defaultValue={ rule.id } />
			<select name={ `${ baseName }[name]` } className="og-include-exclude__name" defaultValue={ name } onChange={ onChangeName }>
				<option value="ID">{ __( 'Post', 'meta-box-builder' ) }</option>
				<option value="parent">{ __( 'Parent post', 'meta-box-builder' ) }</option>
				<option value="template">{ __( 'Page template', 'meta-box-builder' ) }</option>
				{
					MbbApp.taxonomies.map( taxonomy => <option key={ taxonomy.slug } value={ taxonomy.slug }>{ taxonomy.name } ({ taxonomy.slug })</option> )
				}
				{
					MbbApp.taxonomies.map( taxonomy => <option key={ taxonomy.slug } value={ `parent_${ taxonomy.slug }` }>{ __( 'Parent', 'meta-box-builder' ) } { taxonomy.name } ({ taxonomy.slug })</option> )
				}
				<option value="user_role">{ __( 'User role', 'meta-box-builder' ) }</option>
				<option value="user_id">{ __( 'User', 'meta-box-builder' ) }</option>
				<option value="edited_user_role">{ __( 'Edited user role', 'meta-box-builder' ) }</option>
				<option value="edited_user_id">{ __( 'Edited user', 'meta-box-builder' ) }</option>
				<option value="is_child">{ __( 'Is child post', 'meta-box-builder' ) }</option>
				<option value="custom">{ __( 'Custom', 'meta-box-builder' ) }</option>
			</select>
			{
				// Using an unused "key" prop for AsyncSelect forces rerendering, which makes the loadOptions callback work.
				![ 'is_child', 'custom' ].includes( name ) &&
				<AsyncSelect
					key={ name }
					name={ `${ baseName }[value][]` }
					className="react-select og-include-exclude__value"
					classNamePrefix="react-select"
					isMulti
					defaultOptions
					loadOptions={ loadOptions }
					defaultValue={ name === rule.name ? rule.value : [] } // Conditional because the component is used for different rules.
				/>
			}
			{
				name === 'is_child' &&
				<select className="og-include-exclude__value" name={ `${ baseName }[value]` } defaultValue={ rule.value }>
					<option value="true">{ __( 'Yes', 'meta-box-builder' ) }</option>
					<option value="false">{ __( 'No', 'meta-box-builder' ) }</option>
				</select>
			}
			{
				name === 'custom' &&
				<input
					type="text"
					name={ `${ baseName }[value]` }
					className="og-include-exclude__value"
					placeholder={ __( 'Enter PHP callback function name', 'meta-box-builder' ) }
					defaultValue={ rule.value }
				/>
			}
			<button type="button" className="og-remove" title={ __( 'Remove', 'meta-box-builder' ) } onClick={ () => removeRule( rule.id ) }><Dashicon icon="dismiss" /></button>
		</div>
	);
};