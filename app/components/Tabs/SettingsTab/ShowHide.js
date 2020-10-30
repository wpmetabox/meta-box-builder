import { useFormContext } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import { request, uniqid } from '../../../utility/functions';
import DivRow from '../../Common/DivRow';
import KeyValue from '../../Common/KeyValue';
const { useState } = wp.element;
const { Dashicon } = wp.components;
const { __ } = wp.i18n;

export const ShowHide = () => {
	const [ rules, setRules ] = useState( [] );

	const addRule = () => setRules( prevRules => prevRules.concat( { name: 'template', value: '', id: uniqid() } ) );
	const removeRule = id => setRules( prevRules => prevRules.filter( rule => rule.id !== id ) );

	return (
		<DivRow
			className="og-include-exclude"
			label={ `<a href="https://metabox.io/plugins/meta-box-show-hide/" target="_blank" rel="noopener norefferer">${ __( 'Toggle rules', 'meta-box-builder' ) }</a>` }
			tooltip={ __( 'Conditions to toggle visibility of the field group', 'meta-box-builder' ) }
		>
			{ rules.length > 0 && <Intro /> }
			{
				rules.map( ( rule, index ) => <Rule
					key={ rule.id }
					rule={ rule }
					baseName={ `show_hide[rules][${ index }]` }
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
			<select name="show_hide[type]" ref={ register }>
				<option value="include">{ __( 'Show', 'meta-box-builder' ) }</option>
				<option value="exclude">{ __( 'Hide', 'meta-box-builder' ) }</option>
			</select>
			{ __( 'when', 'meta-box-builder' ) }
			<select name="show_hide[relation]" ref={ register }>
				<option value="AND">{ __( 'all', 'meta-box-builder' ) }</option>
				<option value="OR">{ __( 'any', 'meta-box-builder' ) }</option>
			</select>
			{ __( 'conditions match', 'meta-box-builder' ) }
		</div>
	);
};

const Rule = ( { rule, baseName, removeRule } ) => {
	const { register } = useFormContext();
	const [ name, setName ] = useState( rule.name );
	const onChangeName = e => {
		setName( e.target.value );

		// Set default value for "inputs" as array.
		if ( e.target.value === 'input_value' ) {
			rule.value = [];
		}
	}

	const loadOptions = s => request( 'show-hide', { name, s } );

	return (
		<div className={ `og-include-exclude__rule og-attribute${ name === 'input_value' ? ' og-show-hide__inputs' : '' }` }>
			<select name={ `${ baseName }[name]` } ref={ register } defaultValue={ name } onChange={ onChangeName }>
				<option value="template">{ __( 'Page template', 'meta-box-builder' ) }</option>
				<option value="format">{ __( 'Post format', 'meta-box-builder' ) }</option>
				{
					MbbApp.taxonomies.map( taxonomy => <option key={ taxonomy.slug } value={ taxonomy.slug }>{ taxonomy.name } ({ taxonomy.slug })</option> )
				}
				<option value="is_child">{ __( 'Is child post', 'meta-box-builder' ) }</option>
				<option value="input_value">{ __( 'Input value', 'meta-box-builder' ) }</option>
			</select>
			{
				// Using an unused "key" prop for AsyncSelect forces rerendering, which makes the loadOptions callback work.
				![ 'is_child', 'input_value' ].includes( name ) &&
				<AsyncSelect key={ name } className="react-select og-include-exclude__value" classNamePrefix="react-select" defaultOptions loadOptions={ loadOptions } />
			}
			{
				name === 'is_child' &&
				<select className="og-include-exclude__value" name={ `${ baseName }[value]` } ref={ register } defaultValue={ rule.value }>
					<option value="true">{ __( 'Yes', 'meta-box-builder' ) }</option>
					<option value="false">{ __( 'No', 'meta-box-builder' ) }</option>
				</select>
			}
			{
				name === 'input_value' &&
				<KeyValue keyPlaceholder={ __( 'CSS selector', 'meta-box-builder' ) } />
			}
			<button type="button" className="og-remove" title={ __( 'Remove', 'meta-box-builder' ) } onClick={ () => removeRule( rule.id ) }><Dashicon icon="dismiss" /></button>
		</div>
	);
};