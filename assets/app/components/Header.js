import { Button, Flex } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import { cog, listView, plus } from "@wordpress/icons";
import { useShallow } from 'zustand/react/shallow';
import { ensureArray, ucwords } from '../functions';
import useFloatingStructurePanel from '../hooks/useFloatingStructurePanel';
import useNavPanel from '../hooks/useNavPanel';
import useSettings from '../hooks/useSettings';

const Header = () => {
	const { navPanel, setNavPanel } = useNavPanel();
	const { floating, visible, toggleVisible } = useFloatingStructurePanel( useShallow( state => ( {
		floating: state.floating,
		visible: state.visible,
		toggleVisible: state.toggleVisible,
	} ) ) );
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
					label={ __( 'Show structure', 'meta-box-builder' ) }
					showTooltip={ true }
					onClick={ handleStructureClick }
					isPressed={ isStructurePressed }
				/>
				<Button
					icon={ cog }
					size="compact"
					label={ __( 'Edit settings', 'meta-box-builder' ) }
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
					placeholder={ __( 'Please enter the title here...', 'meta-box-builder' ) }
				/>
				<Flex gap={ 1 } expanded={ false } className="mb-header__locations">
					{ locations.map( location => <span key={ `${ objectType }-${ location }` } className="mb-header__location">{ location }</span> ) }
				</Flex>
			</Flex>
			<input
				type="submit"
				className="components-button is-primary"
				value={ __( 'Save Changes', 'meta-box-builder' ) }
			/>
		</Flex>
	);
};

export default Header;