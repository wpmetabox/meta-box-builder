<?php
$file = 'single';

if ( ! empty( $field['clone'] ) ) {
	$file = 'single-clone';
	if ( ! empty( $field['multiple'] ) ) {
		$file = 'single-clone-multiple';
		return;
	}
	return;
}

if ( ! empty( $field['multiple'] ) ) {
	$file = 'single-multiple';
	return;
}

$file = $is_group === true ? $file . '-group' : $file;
require __DIR__ . "/partials/post/$file.php";
