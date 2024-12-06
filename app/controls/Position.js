import { Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Icon, arrowDown, arrowLeft, arrowRight, arrowUp } from '@wordpress/icons';
import DivRow from './DivRow';

const Position = ( { name, defaultValue = 'top', ...rest } ) =>
(
	<DivRow { ...rest }>
		<div className="og-toggle-group og-toggle-group--no-check">
			<label>
				<input type="radio" name={ name } defaultValue="top" defaultChecked={ "top" === defaultValue } />
				<Tooltip text={ __( 'Top', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
					<Icon icon={ arrowUp } size={ 16 } />
				</Tooltip>
			</label>
			<label>
				<input type="radio" name={ name } defaultValue="bottom" defaultChecked={ "bottom" === defaultValue } />
				<Tooltip text={ __( 'Bottom', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
					<Icon icon={ arrowDown } size={ 16 } />
				</Tooltip>
			</label>
			<label>
				<input type="radio" name={ name } defaultValue="left" defaultChecked={ "left" === defaultValue } />
				<Tooltip text={ __( 'Left', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
					<Icon icon={ arrowLeft } size={ 16 } />
				</Tooltip>
			</label>
			<label>
				<input type="radio" name={ name } defaultValue="right" defaultChecked={ "right" === defaultValue } />
				<Tooltip text={ __( 'Right', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
					<Icon icon={ arrowRight } size={ 16 } />
				</Tooltip>
			</label>
		</div>
	</DivRow>
);

export default Position;