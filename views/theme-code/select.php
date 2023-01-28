<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->out( "echo \$group_value[ '" . $field['id'] . "' ] ?? '';" );

	return;
}

if ( empty( $field['clone'] ) ) {
	$file = empty( $field['multiple'] ) ? 'single' : 'multiple';
} else {
	$file = empty( $field['multiple'] ) ? 'single-clone' : 'multiple-clone';
}

require __DIR__ . "/partials/choice/$file.php";

