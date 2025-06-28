<?php
namespace MBB\Extensions\Relationships;

class Manager {
	public function __construct() {
		new Register();
		new Generator();

		if ( is_admin() ) {
			new Edit( 'mb-relationship', __( 'Relationship ID', 'meta-box-builder' ) );
			new Delete();
		}
	}
}
