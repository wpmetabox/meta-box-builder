import { uniqid } from '../../../utility/functions';
import DivRow from '../../Common/DivRow';
const { useState } = wp.element;
const { __ } = wp.i18n;

export const IncludeExclude = () => {
	const [ rules, setRules ] = useState( [] );

	const addRule = () => {
		setRules( prevRules => {
			let newRules = [ ...prevRules ];
			newRules.push( { name: '', value: '', id: uniqid() } );
			return newRules;
		} );
	};

	return (
		<DivRow
			label={ `<a href="https://metabox.io/plugins/meta-box-include-exclude/" target="_blank" rel="noopener norefferer">${ __( 'Advanced rules', 'meta-box-builder' ) }</a>` }
			tooltip={ __( 'More controls on where to show this field group.', 'meta-box-builder' ) }
		>
			{ rules.length && <Intro /> }
			{ rules.length && rules.map( ( rule, index ) => <Rule key={ rule.id } rule={ rule } index={ index } /> ) }
			<AddRule addRule={ addRule } />
		</DivRow>
	);
};

const Intro = () => {
	const { register } = useFormContext();

	return (
		<div className="og-include-exclude-intro">
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

const Rule = ( { rule, index } ) => {
	const { register } = useFormContext();
	const [ name, setName ] = useState( rule.name );
	const onChangeName = e => setName( e.target.value );

	return (
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
			<option value="is_child">{ __( 'Child post', 'meta-box-builder' ) }</option>
			<option value="custom">{ __( 'Custom PHP callback', 'meta-box-builder' ) }</option>
		</select>
	);
};

const AddRule = ( { addRule } ) => <button type="button" className="button" onClick={ addRule }>{ __( '+ Add Rule', 'meta-box-builder' ) }</button>;