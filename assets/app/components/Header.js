import { Button, Flex, Tooltip } from '@wordpress/components';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { __, _n, sprintf } from "@wordpress/i18n";
import { cog, external, listView, plus } from "@wordpress/icons";
import { useShallow } from 'zustand/react/shallow';
import { ensureArray, isMac, ucwords } from '../functions';
import useFloatingStructurePanel from '../hooks/useFloatingStructurePanel';
import useNavPanel from '../hooks/useNavPanel';
import useSettings from '../hooks/useSettings';
import useUnsavedChanges from '../hooks/useUnsavedChanges';
import { lists } from '../list-functions';
import SchemaModal, { IGNORE_FIELD_TYPES } from './Modals/SchemaModal';

const shortcut = isMac() ? '⌘S' : 'Ctrl+S';

const useRootFields = () => {
	const [ fields, setFields ] = useState( [] );

	useEffect( () => {
		if ( ! lists.has( 'root' ) ) {
			setFields( [] );
			return undefined;
		}

		const store = lists.get( 'root' );
		const update = () => setFields( [ ...store.getState().fields ] );
		update();
		return store.subscribe( update );
	}, [] );

	return fields;
};

const Header = () => {
	const { navPanel, setNavPanel } = useNavPanel();
	const { hasUnsavedChanges } = useUnsavedChanges();
	const { floating, visible, toggleVisible } = useFloatingStructurePanel( useShallow( state => ( {
		floating: state.floating,
		visible: state.visible,
		toggleVisible: state.toggleVisible,
	} ) ) );
	const { settings, getObjectType, getPostTypes, getSetting } = useSettings( useShallow( state => ( {
		settings: state.settings, // Triggers useShallow to re-evaluate when settings change (not referenced directly).
		getObjectType: state.getObjectType,
		getPostTypes: state.getPostTypes,
		getSetting: state.getSetting,
	} ) ) );
	const fields = useRootFields();
	const [ models, setModels ] = useState( () => MbbApp.models || [] );
	const [ schemaOpen, setSchemaOpen ] = useState( false );

	const updateNavPanel = key => () => setNavPanel( key === navPanel ? '' : key );

	const handleStructureClick = () => {
		if ( floating ) {
			toggleVisible();
		} else {
			setNavPanel( navPanel === 'structure' ? '' : 'structure' );
		}
	};

	// Show structure panel if it's in floating mode and visible, or if it's in normal mode and navPanel is 'structure'
	const isStructurePressed = floating ? visible : navPanel === 'structure';

	const objectType = getObjectType();

	let locations = [ ucwords( objectType ) ];
	if ( objectType === 'post' ) {
		locations = getPostTypes()
			.map( type => MbbApp.postTypes.find( p => p.slug === type ) )
			.filter( Boolean )
			.map( p => p.name );
	} else if ( objectType === 'term' ) {
		locations = ensureArray( getSetting( 'taxonomies', [] ) )
			.map( tax => MbbApp.taxonomies.find( t => t.slug === tax ) )
			.filter( Boolean )
			.map( t => t.name );
	} else if ( objectType === 'setting' ) {
		locations = ensureArray( getSetting( 'settings_pages', [] ) )
			.map( page => MbbApp.settingsPages.find( p => p.id === page ) )
			.filter( Boolean )
			.map( p => p.title );
	} else if ( objectType === 'model' ) {
		locations = ensureArray( getSetting( 'models', [] ) )
			.map( model => models.find( m => m.name === model ) )
			.filter( Boolean )
			.map( m => m.label );
	}

	const fieldIds = useMemo(
		() => fields
			.filter( field => field.id && ! IGNORE_FIELD_TYPES.includes( field.type ) )
			.map( field => field.id ),
		[ fields ]
	);

	const selectedModel = useMemo( () => {
		if ( objectType !== 'model' ) {
			return null;
		}
		const selected = ensureArray( getSetting( 'models', [] ) )
			.map( name => models.find( model => model.name === name ) )
			.filter( Boolean );
		return selected[ 0 ] || null;
	}, [ objectType, settings, models, getSetting ] );

	const missingFieldIds = useMemo( () => {
		if ( ! selectedModel ) {
			return [];
		}
		const columnNames = Object.keys( selectedModel.columns || {} );
		return fieldIds.filter( id => ! columnNames.includes( id ) );
	}, [ selectedModel, fieldIds ] );

	const onSchemaSaved = updatedModel => {
		const next = models.map( model => model.name === updatedModel.name ? { ...model, ...updatedModel } : model );
		if ( ! next.find( model => model.name === updatedModel.name ) ) {
			next.push( updatedModel );
		}
		setModels( next );
		MbbApp.models = next;
	};

	return (
		<>
			<Flex className="mb-header">
				<Flex expanded={ false }>
					<Button
						variant="primary"
						icon={ plus }
						size="compact"
						className="mb-header__add"
						label={ __( 'Add a new field', 'meta-box-builder' ) }
						showTooltip={ true }
						onClick={ updateNavPanel( 'add' ) }
						isPressed={ navPanel === 'add' }
					/>
					<Button
						icon={ listView }
						size="compact"
						label={ __( 'Show field group structure', 'meta-box-builder' ) }
						showTooltip={ true }
						onClick={ handleStructureClick }
						isPressed={ isStructurePressed }
					/>
					<Button
						icon={ cog }
						size="compact"
						label={ __( 'Edit field group settings', 'meta-box-builder' ) }
						showTooltip={ true }
						onClick={ updateNavPanel( 'field-group-settings' ) }
						isPressed={ navPanel === 'field-group-settings' }
					/>
				</Flex>
				<Flex gap={ 0 } expanded={ false } className="mb-header__info">
					<input
						type="text"
						name="post_title"
						id="post_title"
						defaultValue={ MbbApp.title }
						placeholder={ __( 'Please enter the field group title here...', 'meta-box-builder' ) }
					/>
					<Flex gap={ 1 } expanded={ false } className="mb-header__locations">
						{ locations.map( location => <span key={ `${ objectType }-${ location }` } className="mb-header__location">{ location }</span> ) }
					</Flex>
					{
						missingFieldIds.length > 0 && (
							<button
								type="button"
								className="mb-header__schema-warning"
								onClick={ () => setSchemaOpen( true ) }
							>
								<span className="mb-header__schema-warning-icon" aria-hidden="true">!</span>
								{ sprintf(
									/* translators: %d: number of field IDs */
									_n(
										'%d field ID is missing from the model table',
										'%d field IDs are missing from the model table',
										missingFieldIds.length,
										'meta-box-builder'
									),
									missingFieldIds.length
								) }
							</button>
						)
					}
				</Flex>
				<Flex gap={ 1 } expanded={ false } className="mb-header__actions">
					{
						!MbbApp.extensions.aio && (
							<Tooltip delay={ 0 } text={ __( 'Get access to premium features like conditional logic, custom table, frontend forms, settings pages, and more.', 'meta-box-builder' ) }>
								<Button
									variant="link"
									href="https://metabox.io/aio/?utm_source=header&utm_medium=link&utm_campaign=builder"
									target="_blank"
									icon={ external }
									iconPosition="right"
									iconSize={ 18 }
									text={ __( 'Upgrade', 'meta-box-builder' ) }
								/>
							</Tooltip>
						)
					}
					<input
						type="submit"
						className="components-button is-primary"
						value={ `${ __( 'Save Changes', 'meta-box-builder' )} (${ shortcut })` }
						disabled={ !hasUnsavedChanges }
					/>
				</Flex>
			</Flex>
			{
				schemaOpen && selectedModel && (
					<SchemaModal
						model={ selectedModel }
						fieldIds={ fieldIds }
						onClose={ () => setSchemaOpen( false ) }
						onSaved={ onSchemaSaved }
					/>
				)
			}
		</>
	);
};

export default Header;
