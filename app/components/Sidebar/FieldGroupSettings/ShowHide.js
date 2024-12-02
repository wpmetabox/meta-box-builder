import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import KeyValue from '../../../controls/KeyValue';
import ReactAsyncSelect from '../../../controls/ReactAsyncSelect';
import { fetcher, uniqid } from "../../../functions";
import useSettings from "../../../hooks/useSettings";

const ShowHide = () => {
	const name = 'settings[show_hide]';

	const { getSetting } = useSettings();
	const setting = getSetting( 'show_hide', {} );

	const [ rules, setRules ] = useState( Object.values( setting.rules || {} ) );
	const addRule = () => setRules( prev => [ ...prev, { name: 'template', value: '', id: uniqid() } ] );
	const removeRule = id => setRules( prev => prev.filter( rule => rule.id !== id ) );

	return (
		<>
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
		</>
	);
};

const Intro = ( { name, setting } ) => (
	<div className="og-include-exclude__intro">
		<select name={ `${ name }[type]` } defaultValue={ setting.type || 'show' }>
			<option value="show">{ __( 'Show', 'meta-box-builder' ) }</option>
			<option value="hide">{ __( 'Hide', 'meta-box-builder' ) }</option>
		</select>
		{ __( 'when', 'meta-box-builder' ) }
		<br />
		<select name={ `${ name }[relation]` } defaultValue={ setting.relation || 'OR' }>
			<option value="OR">{ __( 'any', 'meta-box-builder' ) }</option>
			<option value="AND">{ __( 'all', 'meta-box-builder' ) }</option>
		</select>
		{ __( 'conditions match', 'meta-box-builder' ) }
	</div>
);

const Rule = ( { rule, baseName, removeRule } ) => {
	const { getObjectType } = useSettings();
	const objectType = getObjectType();

	const [ name, setName ] = useState( rule.name );
	const onChangeName = e => setName( e.target.value );
	const loadOptions = s => fetcher( 'show-hide', { name, s } );

	// Validate rule name.
	useEffect( () => {
		if ( objectType !== 'post' && name !== 'input_value' ) {
			setName( 'input_value' );
		}
	}, [ objectType ] );

	return (
		<div className={ `og-include-exclude__rule ${ name === 'input_value' ? ' og-show-hide__inputs' : '' }` }>
			<input type="hidden" name={ `${ baseName }[id]` } defaultValue={ rule.id } />
			<select name={ `${ baseName }[name]` } className="og-include-exclude__name" defaultValue={ name } onChange={ onChangeName }>
				{ objectType === 'post' && <option value="template">{ __( 'Page template', 'meta-box-builder' ) }</option> }
				{ objectType === 'post' && <option value="format">{ __( 'Post format', 'meta-box-builder' ) }</option> }
				{
					objectType === 'post' && MbbApp.taxonomies.map( taxonomy => <option key={ taxonomy.slug } value={ taxonomy.slug }>{ taxonomy.name } ({ taxonomy.slug })</option> )
				}
				{ objectType === 'post' && <option value="is_child">{ __( 'Is child post', 'meta-box-builder' ) }</option> }
				<option value="input_value">{ __( 'Input value', 'meta-box-builder' ) }</option>
			</select>
			{
				// Using an unused "key" prop to force re-rendering, which makes the loadOptions callback work.
				![ 'is_child', 'input_value' ].includes( name ) &&
				<ReactAsyncSelect
					key={ name + objectType }
					name={ `${ baseName }[value][]` }
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
				name === 'input_value' &&
				<KeyValue
					name={ `${ baseName }[value]` }
					keyPlaceholder={ __( 'CSS selector', 'meta-box-builder' ) }
					defaultValue={ name === rule.name ? rule.value : {} }
				/>
			}
			<a href="#" className="og-include-exclude__remove" onClick={ () => removeRule( rule.id ) }>{ __( 'Remove', 'meta-box-builder' ) }</a>
		</div>
	);
};

export default ShowHide;