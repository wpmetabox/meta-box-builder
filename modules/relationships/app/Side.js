import Content from './Content';

const Side = ( { id, title, controls } ) => {
	return (
		<div className="og-item og-relationship-side">
			<div className="og-item__header og-relationship-side__header">
				<span className="og-item__title">{ title }</span>
			</div>
			<div className="og-item__body og-relationship-side__body">
				<Content id={ id } controls={ controls } />
			</div>
		</div>
	);
};

export default Side;