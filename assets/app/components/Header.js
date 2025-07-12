import { Button, Flex, Tooltip } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import { cog, listView, plus } from "@wordpress/icons";
import { ensureArray, ucwords } from '../functions';
import useFloatingStructurePanel from '../hooks/useFloatingStructurePanel';
import useNavPanel from '../hooks/useNavPanel';
import useSettings from '../hooks/useSettings';

const Header = () => {
	const { navPanel, setNavPanel } = useNavPanel();
	const { floating, visible, toggleVisible } = useFloatingStructurePanel();
	const { getObjectType, getPostTypes, getSetting } = useSettings( state => ( {
		getObjectType: state.getObjectType,
		getPostTypes: state.getPostTypes,
		getSetting: state.getSetting,
	} ) );

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
		locations = getPostTypes().map( type => MbbApp.postTypes.find( p => p.slug === type ) ).map( p => p.name );
	} else if ( objectType === 'term' ) {
		locations = ensureArray( getSetting( 'taxonomies', [] ) ).map( tax => MbbApp.taxonomies.find( t => t.slug === tax ) ).map( t => t.name );
	} else if ( objectType === 'setting' ) {
		locations = ensureArray( getSetting( 'settings_pages', [] ) ).map( page => MbbApp.settingsPages.find( p => p.id === page ) ).map( p => p.title );
	}

	return (
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
			<div className="mb-header__info">
				<Flex gap={ 0 } className="mb-header__title-location">
					<input
						type="text"
						name="post_title"
						id="post_title"
						className="mb-header__title"
						defaultValue={ MbbApp.title }
						placeholder={ __( 'Please enter the field group title here...', 'meta-box-builder' ) }
					/>
					<Flex gap={ 1 } expanded={ false } className="mb-header__locations">
						{ locations.map( location => <span key={ `${ objectType }-${ location }` } className="mb-header__location">{ location }</span> ) }
					</Flex>
				</Flex>
				<div className="mb-header__id">
					{ __( 'ID', 'meta-box-builder' ) }:
					<Tooltip text={ __( 'Click to edit. Must be unique between field groups. Use only lowercase letters, numbers, underscores.', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
						<input type="text" name="post_name" id="post_name" defaultValue={ MbbApp.slug } />
					</Tooltip>
				</div>
			</div>
			<input
				type="submit"
				className="components-button is-primary"
				value={ __( 'Save Changes', 'meta-box-builder' ) }
			/>
		</Flex>
	);
};

export default Header;