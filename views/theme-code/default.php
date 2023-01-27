<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->out( "echo \$group_value[ '" . $field['id'] . "' ] ?? '';" );

	return;
}

$file = empty( $field['clone'] ) ? 'single' : 'single-clone';
require __DIR__ . "/partials/default/$file.php";
