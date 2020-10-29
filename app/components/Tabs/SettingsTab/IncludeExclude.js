import { useFormContext } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import { request, uniqid } from '../../../utility/functions';
import DivRow from '../../Common/DivRow';
const { useState } = wp.element;
const { Dashicon } = wp.components;
const { __ } = wp.i18n;

export const IncludeExclude = () => {
	const [ rules, setRules ] = useState( [] );

	const addRule = () => setRules( prevRules => prevRules.concat( { name: 'ID', value: '', id: uniqid() } ) );
	const removeRule = id => setRules( prevRules => prevRules.filter( rule => rule.id !== id ) );

	return (
		<DivRow
			className="og-include-exclude"
			label={ `<a href="https://metabox.io/plugins/meta-box-include-exclude/" target="_blank" rel="noopener norefferer">${ __( 'Advanced rules', 'meta-box-builder' ) }</a>` }
			tooltip={ __( 'More controls on where to show this field group.', 'meta-box-builder' ) }
		>
			{ rules.length > 0 && <Intro /> }
			{
				rules.map( ( rule, index ) => <Rule
					key={ rule.id }
					rule={ rule }
					index={ index }
					removeRule={ removeRule }
				/> )
			}
			<button type="button" className="button" onClick={ addRule }>{ __( '+ Add Rule', 'meta-box-builder' ) }</button>
		</DivRow>
	);
};

const Intro = () => {
	const { register } = useFormContext();

	return (
		<div className="og-include-exclude__intro">
			<select name="include_exclude[type]" ref={ register }>
				<option value="include">{ __( 'Show', 'meta-box-builder' ) }</option>
				<option value="exclude">{ __( 'Hide', 'meta-box-builder' ) }</option>
			</select>
			{ __( 'when', 'meta-box-builder' ) }
			<select name="include_exclude[relation]" ref={ register }>
				<option value="AND">{ __( 'all', 'meta-box-builder' ) }</option>
				<option value="OR">{ __( 'any', 'meta-box-builder' ) }</option>
			</select>
			{ __( 'conditions match', 'meta-box-builder' ) }
		</div>
	);
};

const Rule = ( { rule, index, removeRule } ) => {
	const { register } = useFormContext();
	const [ name, setName ] = useState( rule.name );
	const onChangeName = e => setName( e.target.value );

	const loadOptions = inputValue => request( 'include-exclude', { name, s: inputValue } );

	return (
		<div className="og-include-exclude__rule og-attribute">
			<select name={ `include_exclude[rules][${ index }][name]` } ref={ register } defaultValue={ name } onChange={ onChangeName }>
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
				![ 'is_child', 'custom' ].includes( name ) &&
				<AsyncSelect className="react-select og-include-exclude__value" classNamePrefix="react-select" defaultOptions loadOptions={ loadOptions } />
			}
			{
				name === 'is_child' &&
				<select className="og-include-exclude__value" name={ `include_exclude[rules][${ index }][value]` } ref={ register }>
					<option value="true">{ __( 'Yes', 'meta-box-builder' ) }</option>
					<option value="false">{ __( 'No', 'meta-box-builder' ) }</option>
				</select>
			}
			{
				name === 'custom' &&
				<input className="og-include-exclude__value" type="text" name={ `include_exclude[rules][${ index }][value]` } ref={ register } placeholder={ __( 'Enter PHP callback function name', 'meta-box-builder' ) } />
			}
			<button type="button" title={ __( 'Remove', 'meta-box-builder' ) } onClick={ () => removeRule( rule.id ) }><Dashicon icon="dismiss" /></button>
		</div>
	);
};