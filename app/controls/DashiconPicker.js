import { Dropdown } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import DivRow from './DivRow';

const getIconLabel = icon => {
	let label = icon.replace( /-/g, ' ' ).trim();

	const startsText = [ 'admin', 'controls', 'editor', 'format', 'image', 'media', 'welcome' ];
	startsText.forEach( text => {
		if ( label.startsWith( text ) ) {
			label = label.replace( text, '' );
		}
	} );

	const endsText = [ 'alt', 'alt2', 'alt3' ];
	endsText.forEach( text => {
		if ( label.endsWith( text ) ) {
			label = label.replace( text, `(${ text })` );
		}
	} );

	label = label.trim();
	const specialText = {
		businessman: 'business man',
		aligncenter: 'align center',
		alignleft: 'align left',
		alignright: 'align right',
		customchar: 'custom character',
		distractionfree: 'distraction free',
		removeformatting: 'remove formatting',
		strikethrough: 'strike through',
		skipback: 'skip back',
		skipforward: 'skip forward',
		leftright: 'left right',
		screenoptions: 'screen options',
	};
	label = specialText[ label ] || label;

	return label.trim().toLowerCase();
};

const DashiconPicker = ( { name, defaultValue, updateField, ...rest } ) => {
	const [ query, setQuery ] = useState( '' );
	const [ value, setValue ] = useState( defaultValue );
	let filteredIcons = MbbApp.icons.map( icon => [ icon, getIconLabel( icon ) ] )
		.filter( item => query === '' || item[ 1 ].includes( query.toLowerCase() ) );

	const handleChange = ( icon, onToggle ) => {
		setValue( icon );
		updateField( name, icon );
		onToggle();
	};

	return (
		<DivRow className="og-icon" { ...rest }>
			<Dropdown
				popoverProps={ { placement: 'left-start' } }
				contentClassName="og-icon__dropdown"
				renderToggle={ ( { onToggle } ) => (
					<button type="button" onClick={ onToggle } className="button button-secondary og-icon__pick">
						<span className={ `dashicons dashicons-${ value }` }></span>
					</button>
				) }
				renderContent={ ( { onToggle } ) => (
					<>
						<input
							type="text"
							className="og-icon__search"
							placeholder={ __( 'Search...', 'meta-box-builder' ) }
							value={ query }
							onChange={ e => setQuery( e.target.value ) }
						/>
						<div className="og-icon__items">
							{
								filteredIcons.map( ( [ icon, label ] ) => (
									<div
										key={ icon }
										className={ `og-icon__item ${ icon === value ? 'og-icon__item--selected' : '' }` }
										onClick={ () => handleChange( icon, onToggle ) }
									>
										<span className={ `dashicons dashicons-${ icon }` }></span>
										<div className='og-icon__text'>{ label }</div>
									</div>
								) )
							}
						</div>
					</>
				) }
			/>
		</DivRow>
	);
};

export default DashiconPicker;