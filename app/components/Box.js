import { Icon } from '@wordpress/components';

const Box = ( { icon, title, children, show } ) => (
	<div className={ `mb-box ${ show ? 'mb-box--show' : '' }` }>
		<div className="mb-box__header">
			<Icon icon={ icon } />
			{ title }
		</div>
		<div className="mb-box__body">
			{ children }
		</div>
	</div>
);

export default Box;
