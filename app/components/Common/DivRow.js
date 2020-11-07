import Tooltip from './Tooltip';

const DivRow = ( {
	children,
	label,
	description,
	tooltip,
	className = '',
	htmlFor = '',
	keyValue = '',
	required = false,
	dependency
} ) => {
	return (
		<div className={ `og-field ${ className } ${ dependency ? `dep:${ dependency }` : '' }` } key={ keyValue }>
			{
				label &&
				<label className="og-label" htmlFor={ htmlFor }>
					<span dangerouslySetInnerHTML={ { __html: label } } />
					{ required && <span className="og-required">*</span> }
					{ tooltip && <Tooltip id={ htmlFor } content={ tooltip } /> }
				</label>
			}
			<div className="og-input">
				{ children }
				{ description && <div className="og-description">{ description }</div> }
			</div>
		</div>
	);
};

export default DivRow;