<?php
if ( empty( $field['clone'] ) ) {
	$file = empty( $field['multiple'] ) ? 'single' : 'multiple';
} else {
	$file = empty( $field['multiple'] ) ? 'single-clone' : 'multiple-clone';
}

$file = $is_group === true ? $file . '-group' : $file;

require __DIR__ . "/partials/taxonomy/$file.php";
