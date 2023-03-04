<?php
$file  = empty( $field['multiple'] ) ? 'single' : 'multiple';
$file .= empty( $field['clone'] ) ? '' : '-clone';
$file .= $is_group === true ? '-group' : '';

require __DIR__ . "/partials/post/$file.php";
