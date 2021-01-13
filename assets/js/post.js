( function( document, { meta_box_post_ids, base_url, title } ) {
	const addIcon = ( [ metaBoxId, postId ] ) => {
		let a = document.createElement( 'a' );
		a.setAttribute( 'href', `${ base_url }${ postId }` );
		a.setAttribute( 'class', 'dashicons dashicons-admin-generic mbb-settings' );
		a.setAttribute( 'title', title );
		document.querySelector( `#${ metaBoxId } .handle-actions` ).prepend( a );
	};

	Object.entries( meta_box_post_ids ).forEach( addIcon );
} )( document, MBB );