const Box = ( { title, children, show } ) => (
	<div className={ `mb-box ${ show ? 'mb-box--show' : '' }` }>
		<div className="mb-box__header">{ title }</div>
		<div className="mb-box__body">
			{ children }
		</div>
	</div>
);

export default Box;
