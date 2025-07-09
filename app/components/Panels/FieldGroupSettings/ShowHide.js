import { Button, Flex, SelectControl } from "@wordpress/components";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import KeyValue from '../../../controls/KeyValue';
import ReactAsyncSelect from '../../../controls/ReactAsyncSelect';
import { maybeArrayToObject, uniqid } from "../../../functions";
import { fetcher } from "../../../hooks/useFetch";
import useSettings from "../../../hooks/useSettings";
import PanelBody from "../PanelBody";

const ShowHide = () => {
	const { getSetting, updateSetting } = useSettings();
	const setting = getSetting( 'show_hide', {} );
	const rules = maybeArrayToObject( setting.rules, 'id' );

	// Convert `rules` to an object if it's an array, only run once when initializing, just in case it's an empty array.
	useEffect( () => {
		if ( Array.isArray( setting.rules ) ) {
			updateSetting( 'show_hide.rules', {} );
		}
	}, [] );

	const addRule = () => {
		const newRule = { name: 'template', value: '', id: uniqid() };
		updateSetting( `show_hide.rules.${ newRule.id }`, newRule );

		// Make sure setting.type is always set.
		if ( setting.type === undefined ) {
			updateSetting( 'show_hide.type', 'show' );
		}
	};

	const removeRule = id => {
		const newRules = { ...rules };
		delete newRules[ id ];
		updateSetting( 'show_hide.rules', newRules );
	};

	return (
		<PanelBody
			title={ __( 'Toggle rules', 'meta-box-builder' ) }
			empty={ Object.values( rules ).length === 0 }
			onAdd={ addRule }
		>
			<div className="mb-ruleset">
				{ Object.values( rules ).length > 0 && <Intro setting={ setting } updateSetting={ updateSetting } /> }
				{
					Object.values( rules ).map( rule => <Rule
						key={ rule.id }
						rule={ rule }
						removeRule={ removeRule }
						updateSetting={ updateSetting }
					/> )
				}
				<Button variant="secondary" size="compact" onClick={ addRule } text={ __( '+ Add Rule', 'meta-box-builder' ) } />
			</div>
		</PanelBody>
	);
};

const Intro = ( { setting, updateSetting } ) => {
	const update = key => value => updateSetting( `show_hide.${ key }`, value );

	return (
		<Flex gap={ 1 } align="center" className="mb-ruleset__intro">
			<SelectControl
				value={ setting.type || 'show' }
				onChange={ update( 'type' ) }
				options={ [
					{ label: __( 'Show', 'meta-box-builder' ), value: 'show' },
					{ label: __( 'Hide', 'meta-box-builder' ), value: 'hide' },
				] }
				__nextHasNoMarginBottom
			/>
			{ __( 'when', 'meta-box-builder' ) }
			<SelectControl
				value={ setting.relation || 'OR' }
				onChange={ update( 'relation' ) }
				options={ [
					{ label: __( 'any', 'meta-box-builder' ), value: 'OR' },
					{ label: __( 'all', 'meta-box-builder' ), value: 'AND' },
				] }
				__nextHasNoMarginBottom
			/>
			{ __( 'conditions match', 'meta-box-builder' ) }
		</Flex>
	);
};

const Rule = ( { rule, removeRule, updateSetting } ) => {
	const { getObjectType } = useSettings();
	const objectType = getObjectType();

	const [ name, setName ] = useState( rule.name );
	const onChangeName = value => {
		setName( value );
		updateSetting( `show_hide.rules.${ rule.id }.name`, value );
	};

	const loadOptions = s => fetcher( {
		api: 'show-hide',
		params: { name, s },
	} );

	// Validate rule name.
	useEffect( () => {
		if ( objectType !== 'post' && name !== 'input_value' ) {
			setName( 'input_value' );
			updateSetting( `show_hide.rules.${ rule.id }.name`, 'input_value' );
		}
	}, [ objectType ] );

	const updateInputValue = ( name, items ) => updateSetting( `show_hide.rules.${ rule.id }.value`, items );

	const options = objectType === 'post' ? [
		{ label: __( 'Page template', 'meta-box-builder' ), value: 'template' },
		{ label: __( 'Post format', 'meta-box-builder' ), value: 'format' },
		...MbbApp.taxonomies.map( taxonomy => ( { label: `${ taxonomy.name } (${ taxonomy.slug })`, value: taxonomy.slug } ) ),
		{ label: __( 'Is child post', 'meta-box-builder' ), value: 'is_child' },
		{ label: __( 'Input value', 'meta-box-builder' ), value: 'input_value' },
	] : [
		{ label: __( 'Input value', 'meta-box-builder' ), value: 'input_value' },
	];

	return (
		<div className={ `mb-ruleset__rule ${ name === 'input_value' ? ' og-show-hide__inputs' : '' }` }>
			<SelectControl
				value={ name }
				onChange={ onChangeName }
				options={ options }
				__nextHasNoMarginBottom
			/>
			{
				// Using an unused "key" prop to force re-rendering, which makes the loadOptions callback work.
				![ 'is_child', 'input_value' ].includes( name ) &&
				<ReactAsyncSelect
					key={ `${ name }-${ objectType }` }
					className="mb-ruleset__value"
					defaultValue={ rule }
					loadOptions={ loadOptions }
					onChange={ items => {
						updateSetting( `show_hide.rules.${ rule.id }.value`, items ? items.map( item => item.value ) : [] );
						updateSetting( `show_hide.rules.${ rule.id }.label`, items ? items.map( item => item.label ) : [] );
					} }
				/>
			}
			{
				name === 'is_child' &&
				<SelectControl
					value={ rule.value || 'true' }
					onChange={ value => updateSetting( `show_hide.rules.${ rule.id }.value`, value ) }
					options={ [
						{ label: __( 'Yes', 'meta-box-builder' ), value: 'true' },
						{ label: __( 'No', 'meta-box-builder' ), value: 'false' },
					] }
					__nextHasNoMarginBottom
				/>
			}
			{
				name === 'input_value' &&
				<KeyValue
					name="value"
					keyPlaceholder={ __( 'CSS selector', 'meta-box-builder' ) }
					defaultValue={ name === rule.name ? rule.value : {} }
					updateField={ updateInputValue }
				/>
			}
			<Button variant="link" isDestructive={ true } onClick={ () => removeRule( rule.id ) } text={ __( 'Remove', 'meta-box-builder' ) } />
		</div>
	);
};

export default ShowHide;
