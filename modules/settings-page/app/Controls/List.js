
const { __ } = wp.i18n;
const { useContext } = wp.element;
const { Dashicon } = wp.components;

const List = ( { items, setUpdate, deleteItem } ) => {
	return (
		<>
			{
				Object.entries( items ).map( ( [ key, value ], index ) => (
						<div className="mb-spui-tab" key={ index }>
							<input type="text" id="mbspui-tab-value" placeholder={ __( 'Tab label', 'mb-settings-page-ui' ) } data={ key } name={ value } value={ value } onChange={ e => { setUpdate( e ) } }/>
							<input type="text" id="mbspui-tab-key" placeholder={ __( 'Tab id', 'mb-settings-page-ui' ) } name={ key } value={ key } onChange={ e => { setUpdate( e ) } }/>
							<button type="button" className="mbspui-tab-remove" title={ __( 'Remove', 'mb-settings-page-ui' ) } onClick={ e => { e.preventDefault(); deleteItem( index ) } }><Dashicon icon="dismiss" /></button>
						</div>
				) )
			}
		</>
	)
};


export default List;