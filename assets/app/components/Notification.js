import { Snackbar } from '@wordpress/components';
import { useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const Notification = () => {
	const [ message, setMessage ] = useState( '' );
	const timer = useRef();
	const hide = () => setMessage( '' );

	// Expose show method to the global scope to be used in the save.js file.
	window.mbbShowNotification = ( text = __( 'Field group is updated.', 'meta-box-builder' ) ) => {
		setMessage( text );
		clearTimeout( timer.current );
		timer.current = setTimeout( hide, 3000 );
	};

	return message && (
		<Snackbar className="mb-notification" explicitDismiss onDismiss={ hide }>
			{ message }
		</Snackbar>
	);
};

export default Notification;
