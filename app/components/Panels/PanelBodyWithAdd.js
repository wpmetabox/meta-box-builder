import { Button, Icon } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { chevronDown, chevronUp, plus } from '@wordpress/icons';

const PanelBodyWithAdd = ( {
	initialOpen = false,
	title,
	children,
	onAdd,
	onToggle,
	empty,
} ) => {
	const [ open, setOpen ] = useState( initialOpen );

	const toggle = () => {
		if ( empty ) {
			return;
		}

		setOpen( state => !state );
		onToggle?.( !open );
	};

	const addNew = e => {
		if ( ! empty ) {
			return;
		}

		e.stopPropagation();
		setOpen( true );
		onAdd();
	};

	return (
		<div className={ `components-panel__body ${ open && ! empty ? 'is-opened' : '' }` }>
			<h2 className="components-panel__body-title">
				<Button
					__next40pxDefaultSize
					className="components-panel__body-toggle"
					onClick={ toggle }
				>
					<span aria-hidden="true" onClick={ addNew }>
						<Icon
							className="components-panel__arrow"
							icon={ empty ? plus : ( open ? chevronUp : chevronDown ) }
						/>
					</span>
					{ title }
				</Button>
			</h2>
			{ open && ! empty && children }
		</div>
	);
};

export default PanelBodyWithAdd;
