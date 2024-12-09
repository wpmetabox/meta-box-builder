import { Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import DivRow from './DivRow';

const Position = ( { name, defaultValue = 'top', ...rest } ) =>
(
	<DivRow { ...rest }>
		<div className="og-toggle-group og-toggle-group--no-check">
			<label>
				<input type="radio" name={ name } defaultValue="top" defaultChecked={ "top" === defaultValue } />
				<Tooltip text={ __( 'Top', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12.71 6.29a1 1 0 0 0-.33-.21a1 1 0 0 0-.76 0a1 1 0 0 0-.33.21l-4 4a1 1 0 1 0 1.42 1.42L11 9.41V21a1 1 0 0 0 2 0V9.41l2.29 2.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42ZM19 2H5a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2Z" /></svg>
				</Tooltip>
			</label>
			<label>
				<input type="radio" name={ name } defaultValue="bottom" defaultChecked={ "bottom" === defaultValue } />
				<Tooltip text={ __( 'Bottom', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M19 20H5a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2Zm-7.71-2.29a1 1 0 0 0 .33.21a.94.94 0 0 0 .76 0a1 1 0 0 0 .33-.21l4-4a1 1 0 0 0-1.42-1.42L13 14.59V3a1 1 0 0 0-2 0v11.59l-2.29-2.3a1 1 0 1 0-1.42 1.42Z" /></svg>
				</Tooltip>
			</label>
			<label>
				<input type="radio" name={ name } defaultValue="left" defaultChecked={ "left" === defaultValue } />
				<Tooltip text={ __( 'Left', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M21 11H9.41l2.3-2.29a1 1 0 1 0-1.42-1.42l-4 4a1 1 0 0 0-.21.33a1 1 0 0 0 0 .76a1 1 0 0 0 .21.33l4 4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L9.41 13H21a1 1 0 0 0 0-2ZM3 3a1 1 0 0 0-1 1v16a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1Z" /></svg>
				</Tooltip>
			</label>
			<label>
				<input type="radio" name={ name } defaultValue="right" defaultChecked={ "right" === defaultValue } />
				<Tooltip text={ __( 'Right', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="m17.71 11.29l-4-4a1 1 0 1 0-1.42 1.42l2.3 2.29H3a1 1 0 0 0 0 2h11.59l-2.3 2.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4-4a1 1 0 0 0 .21-.33a1 1 0 0 0 0-.76a1 1 0 0 0-.21-.33ZM21 4a1 1 0 0 0-1 1v14a1 1 0 0 0 2 0V5a1 1 0 0 0-1-1Z" /></svg>
				</Tooltip>
			</label>
		</div>
	</DivRow>
);

export default Position;