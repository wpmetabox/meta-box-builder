<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->out( "echo \$group_value[ '" . $field['id'] . "' ] ?? '';" );

	return;
}

$file = empty( $field['clone'] ) ? 'multiple' : 'multiple-clone';
require __DIR__ . "/partials/choice/$file.php";
