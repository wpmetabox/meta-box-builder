import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import DivRow from '../../../controls/DivRow';
import ReactAsyncSelect from '../../../controls/ReactAsyncSelect';
import { fetcher, uniqid } from "../../../functions";
import useSettings from "../../../hooks/useSettings";

const IncludeExclude = () => {
	const name = 'settings[include_exclude]';

	const { getSetting } = useSettings();
	const setting = getSetting( 'include_exclude', {} );

	const [ rules, setRules ] = useState( Object.values( setting.rules || {} ) );
	const addRule = () => setRules( prev => [ ...prev, { name: 'ID', value: '', id: uniqid() } ] );
	const removeRule = id => setRules( prev => prev.filter( rule => rule.id !== id ) );

	return (
		<DivRow
			className="og-include-exclude"
			label={ `<a href="https://metabox.io/plugins/meta-box-include-exclude/" target="_blank" rel="noopener norefferer">${ __( 'Advanced rules', 'meta-box-builder' ) }</a>` }
			tooltip={ __( 'More rules on where to display the field group. For each rule, maximum 10 items are displayed. To select other items, please use the search.', 'meta-box-builder' ) }
		>
			{ rules.length > 0 && <Intro name={ name } setting={ setting } /> }
			{
				rules.map( rule => <Rule
					key={ rule.id }
					rule={ rule }
					baseName={ `${ name }[rules][${ rule.id }]` }
					removeRule={ removeRule }
				/> )
			}
			<button type="button" className="button" onClick={ addRule }>{ __( '+ Add Rule', 'meta-box-builder' ) }</button>
		</DivRow>
	);
};

const Intro = ( { name, setting } ) => (
	<div className="og-include-exclude__intro">
		<select name={ `${ name }[type]` } defaultValue={ setting.type || 'include' }>
			<option value="include">{ __( 'Show', 'meta-box-builder' ) }</option>
			<option value="exclude">{ __( 'Hide', 'meta-box-builder' ) }</option>
		</select>
		{ __( 'when', 'meta-box-builder' ) }
		<select name={ `${ name }[relation]` } defaultValue={ setting.relation || 'OR' }>
			<option value="OR">{ __( 'any', 'meta-box-builder' ) }</option>
			<option value="AND">{ __( 'all', 'meta-box-builder' ) }</option>
		</select>
		{ __( 'conditions match', 'meta-box-builder' ) }
	</div>
);

const Rule = ( { rule, baseName, removeRule } ) => {
	const { getObjectType, getPostTypes } = useSettings();
	const postTypes = getPostTypes();
	const objectType = getObjectType();

	const [ name, setName ] = useState( rule.name );
	const onChangeName = e => setName( e.target.value );

	// Validate rule name.
	useEffect( () => {
		if ( [ 'comment', 'setting' ].includes( objectType ) && ![ 'user_role', 'user_id', 'custom' ].includes( name ) ) {
			setName( 'user_role' );
		}
		if ( objectType === 'user' && ![ 'user_role', 'user_id', 'edited_user_role', 'edited_user_id', 'custom' ].includes( name ) ) {
			setName( 'user_role' );
		}
		if ( ( objectType === 'term' ) && [ 'ID', 'parent', 'template', 'is_child' ].includes( name ) ) {
			setName( 'category' );
		}
	}, [ objectType ] );

	const loadOptions = s => fetcher( 'include-exclude', { name, s, post_types: postTypes } );

	return (
		<div className="og-include-exclude__rule">
			<input type="hidden" name={ `${ baseName }[id]` } defaultValue={ rule.id } />
			<select name={ `${ baseName }[name]` } className="og-include-exclude__name" defaultValue={ name } onChange={ onChangeName }>
				{ objectType === 'post' && <option value="ID">{ __( 'Post', 'meta-box-builder' ) }</option> }
				{ objectType === 'post' && <option value="parent">{ __( 'Parent post', 'meta-box-builder' ) }</option> }
				{ objectType === 'post' && <option value="template">{ __( 'Page template', 'meta-box-builder' ) }</option> }
				{
					[ 'term', 'post' ].includes( objectType ) && MbbApp.taxonomies.map( taxonomy => <option key={ taxonomy.slug } value={ taxonomy.slug }>{ taxonomy.name } ({ taxonomy.slug })</option> )
				}
				{
					[ 'term', 'post' ].includes( objectType ) && MbbApp.taxonomies.map( taxonomy => <option key={ taxonomy.slug } value={ `parent_${ taxonomy.slug }` }>{ __( 'Parent', 'meta-box-builder' ) } { taxonomy.name } ({ taxonomy.slug })</option> )
				}
				<option value="user_role">{ __( 'User role', 'meta-box-builder' ) }</option>
				<option value="user_id">{ __( 'User', 'meta-box-builder' ) }</option>
				{ objectType === 'user' && <option value="edited_user_role">{ __( 'Edited user role', 'meta-box-builder' ) }</option> }
				{ objectType === 'user' && <option value="edited_user_id">{ __( 'Edited user', 'meta-box-builder' ) }</option> }
				{ objectType === 'post' && <option value="is_child">{ __( 'Is child post', 'meta-box-builder' ) }</option> }
				<option value="custom">{ __( 'Custom', 'meta-box-builder' ) }</option>
			</select>
			{
				// Using an unused "key" prop to force re-rendering, which makes the loadOptions callback work.
				![ 'is_child', 'custom' ].includes( name ) &&
				<ReactAsyncSelect
					key={ name + objectType + postTypes }
					baseName={ baseName }
					className="og-include-exclude__value"
					defaultValue={ rule }
					loadOptions={ loadOptions }
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
			<a href="#" className="og-include-exclude__remove" onClick={ () => removeRule( rule.id ) }>{ __( 'Remove', 'meta-box-builder' ) }</a>
		</div>
	);
};

export default IncludeExclude;