import { Button, Flex, SelectControl, TextControl } from "@wordpress/components";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import DivRow from '../../../controls/DivRow';
import ReactAsyncSelect from '../../../controls/ReactAsyncSelect';
import { maybeArrayToObject, uniqid } from "../../../functions";
import { fetcher } from "../../../hooks/useFetch";
import useSettings from "../../../hooks/useSettings";

const IncludeExclude = () => {
	const { getSetting, updateSetting } = useSettings();
	const setting = getSetting( 'include_exclude', {} );
	const rules = maybeArrayToObject( setting.rules, 'id' );

	const addRule = () => {
		const newRule = { name: 'ID', value: '', id: uniqid() };
		updateSetting( 'include_exclude.rules', {
			...rules,
			[ newRule.id ]: newRule
		} );

		// Make sure setting.type is always set.
		if ( setting.type === undefined ) {
			updateSetting( 'include_exclude.type', 'include' );
		}
	};

	const removeRule = id => {
		const newRules = { ...rules };
		delete newRules[ id ];
		updateSetting( 'include_exclude.rules', newRules );
	};

	return (
		<DivRow
			className="mb-ruleset"
			label={ `<a href="https://metabox.io/plugins/meta-box-include-exclude/" target="_blank">${ __( 'Advanced rules', 'meta-box-builder' ) }</a>` }
			tooltip={ __( 'More rules on where to display the field group. For each rule, maximum 10 items are displayed. To select other items, please type to search.', 'meta-box-builder' ) }
		>
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
		</DivRow>
	);
};

const Intro = ( { setting, updateSetting } ) => {
	const update = key => value => updateSetting( `include_exclude.${ key }`, value );

	return (
		<Flex gap={ 1 } align="center" className="mb-ruleset__intro">
			<SelectControl
				value={ setting.type || 'include' }
				onChange={ update( 'type' ) }
				options={ [
					{ label: __( 'Include', 'meta-box-builder' ), value: 'include' },
					{ label: __( 'Exclude', 'meta-box-builder' ), value: 'exclude' },
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
	const { getObjectType, getPostTypes } = useSettings();
	const postTypes = getPostTypes();
	const objectType = getObjectType();

	const [ name, setName ] = useState( rule.name );
	const onChangeName = value => {
		setName( value );
		updateSetting( `include_exclude.rules.${ rule.id }.name`, value );
	};

	// Validate rule name.
	useEffect( () => {
		if ( [ 'comment', 'setting' ].includes( objectType ) && ![ 'user_role', 'user_id', 'custom' ].includes( name ) ) {
			setName( 'user_role' );
			updateSetting( `include_exclude.rules.${ rule.id }.name`, 'user_role' );
		}
		if ( objectType === 'user' && ![ 'user_role', 'user_id', 'edited_user_role', 'edited_user_id', 'custom' ].includes( name ) ) {
			setName( 'user_role' );
			updateSetting( `include_exclude.rules.${ rule.id }.name`, 'user_role' );
		}
		if ( ( objectType === 'term' ) && [ 'ID', 'parent', 'template', 'is_child' ].includes( name ) ) {
			setName( 'category' );
			updateSetting( `include_exclude.rules.${ rule.id }.name`, 'category' );
		}
	}, [ objectType ] );

	const loadOptions = s => fetcher( {
		api: 'include-exclude',
		params: { name, s, post_types: postTypes },
	} );

	const optionsMap = {
		'post': [
			{ label: __( 'Post', 'meta-box-builder' ), value: 'ID' },
			{ label: __( 'Parent post', 'meta-box-builder' ), value: 'parent' },
			{ label: __( 'Page template', 'meta-box-builder' ), value: 'template' },
			...MbbApp.taxonomies.map( taxonomy => ( { label: `${ taxonomy.name } (${ taxonomy.slug })`, value: taxonomy.slug } ) ),
			...MbbApp.taxonomies.map( taxonomy => ( { label: `${ __( 'Parent', 'meta-box-builder' ) } ${ taxonomy.name } (${ taxonomy.slug })`, value: `parent_${ taxonomy.slug }` } ) ),
			{ label: __( 'User role', 'meta-box-builder' ), value: 'user_role' },
			{ label: __( 'User', 'meta-box-builder' ), value: 'user_id' },
			{ label: __( 'Is child post', 'meta-box-builder' ), value: 'is_child' },
			{ label: __( 'Custom', 'meta-box-builder' ), value: 'custom' },
		],
		'term': [
			...MbbApp.taxonomies.map( taxonomy => ( { label: `${ taxonomy.name } (${ taxonomy.slug })`, value: taxonomy.slug } ) ),
			...MbbApp.taxonomies.map( taxonomy => ( { label: `${ __( 'Parent', 'meta-box-builder' ) } ${ taxonomy.name } (${ taxonomy.slug })`, value: `parent_${ taxonomy.slug }` } ) ),
			{ label: __( 'User role', 'meta-box-builder' ), value: 'user_role' },
			{ label: __( 'User', 'meta-box-builder' ), value: 'user_id' },
			{ label: __( 'Custom', 'meta-box-builder' ), value: 'custom' },
		],
		'user': [
			{ label: __( 'User role', 'meta-box-builder' ), value: 'user_role' },
			{ label: __( 'User', 'meta-box-builder' ), value: 'user_id' },
			{ label: __( 'Edited user role', 'meta-box-builder' ), value: 'edited_user_role' },
			{ label: __( 'Edited user', 'meta-box-builder' ), value: 'edited_user_id' },
			{ label: __( 'Custom', 'meta-box-builder' ), value: 'custom' },
		],
		'default': [
			{ label: __( 'Custom', 'meta-box-builder' ), value: 'custom' },
		],
	};
	const options = optionsMap[ objectType ] || optionsMap.default;

	return (
		<div className="mb-ruleset__rule">
			<SelectControl
				value={ name }
				onChange={ onChangeName }
				options={ options }
				__nextHasNoMarginBottom
			/>
			{
				![ 'is_child', 'custom' ].includes( name ) &&
				<ReactAsyncSelect
					key={ `${ name }-${ objectType }-${ JSON.stringify( postTypes ) }` }
					className="mb-ruleset__value"
					defaultValue={ rule }
					loadOptions={ loadOptions }
					onChange={ items => {
						updateSetting( `include_exclude.rules.${ rule.id }.value`, items ? items.map( item => item.value ) : [] );
						updateSetting( `include_exclude.rules.${ rule.id }.label`, items ? items.map( item => item.label ) : [] );
					} }
				/>
			}
			{
				name === 'is_child' &&
				<SelectControl
					value={ rule.value || 'true' }
					onChange={ value => updateSetting( `include_exclude.rules.${ rule.id }.value`, value ) }
					options={ [
						{ label: __( 'Yes', 'meta-box-builder' ), value: 'true' },
						{ label: __( 'No', 'meta-box-builder' ), value: 'false' },
					] }
					__nextHasNoMarginBottom
				/>
			}
			{
				name === 'custom' &&
				<TextControl
					value={ rule.value }
					onChange={ value => updateSetting( `include_exclude.rules.${ rule.id }.value`, value ) }
					placeholder={ __( 'Enter PHP callback function name', 'meta-box-builder' ) }
					__nextHasNoMarginBottom
				/>
			}
			<Button variant="link" isDestructive={ true } onClick={ () => removeRule( rule.id ) } text={ __( 'Remove', 'meta-box-builder' ) } />
		</div>
	);
};

export default IncludeExclude;