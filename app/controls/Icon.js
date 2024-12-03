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

const Icon = ( { name, componentId, defaultValue, icons = MbbApp.icons, updateFieldData, ...rest } ) => {
	const [ query, setQuery ] = useState( "" );
	const [ value, setValue ] = useState( defaultValue );
	let filteredIcons = icons.map( icon => [ icon, getIconLabel( icon ) ] )
		.filter( item => query === '' || item[ 1 ].includes( query.toLowerCase() ) );

	const handleChange = e => {
		setValue( e.target.value );
		updateFieldData && updateFieldData( name, e.target.value );
	};

	return (
		<DivRow className="og-icon" { ...rest }>
			<div className='og-icon-selected'>
				<span className={ `dashicons dashicons-${ value }` }></span>
				<input
					type="search"
					className="og-icon-search"
					placeholder={ __( 'Search...', 'meta-box-builder' ) }
					value={ query }
					onChange={ event => setQuery( event.target.value ) }
				/>
			</div>
			<div className="og-icon-items">
				{
					filteredIcons.map( ( [ icon, label ] ) => (
						<label key={ icon } htmlFor={ `${ componentId }-${ icon }` } className="og-icon-item" >
							<div className="og-icon__select">
								<input
									id={ `${ componentId }-${ icon }` }
									type="radio"
									name={ name }
									value={ icon }
									defaultChecked={ icon === defaultValue }
									onChange={ handleChange }
								/>
								<span className={ `og-dashicon dashicons dashicons-${ icon }` }></span>
							</div>
							<span className='og-icon-item__text'>{ label }</span>
						</label>
					) )
				}
			</div>
		</DivRow >
	);
};

export default Icon;