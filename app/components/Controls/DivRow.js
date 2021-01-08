import Tooltip from './Tooltip';

const { RawHTML } = wp.element;

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
					<RawHTML>{ label }</RawHTML>
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