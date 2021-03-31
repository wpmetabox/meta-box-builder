( function ( document, { meta_box_post_ids, base_url, title } ) {
	const addIcon = ( metaBoxId ) => {
		let a = document.createElement( 'a' );
		a.setAttribute( 'href', `${ base_url }${ meta_box_post_ids[ metaBoxId ] }` );
		a.setAttribute( 'class', 'dashicons dashicons-admin-generic mbb-settings' );
		a.setAttribute( 'title', title );
		let metabox = document.getElementById( metaBoxId );
		if ( !metabox ) {
			return;
		}
		let actions = metabox.querySelector( '.handle-actions' );
		if ( actions ) {
			actions.prepend( a );
		}
	};

	Object.keys( meta_box_post_ids ).forEach( addIcon );
} )( document, MBB );
