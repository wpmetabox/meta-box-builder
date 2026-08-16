import { Snackbar } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const Notification = () => {
	const [ visible, setVisible ] = useState( false );
	const hide = () => setVisible( false );

	window.mbbShowNotification = () => {
		setVisible( true );
		setTimeout( hide, 3000 );
	};

	return visible && (
		<Snackbar className="mb-notification" explicitDismiss onDismiss={ hide }>
			{ __( 'Custom model is updated.', 'meta-box-builder' ) }
		</Snackbar>
	);
};

export default Notification;
