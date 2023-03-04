<?php
$file  = empty( $field['clone'] ) ? 'single' : 'single-clone';
$file .= $is_group === true ? '-group' : '';

require __DIR__ . "/partials/choice/$file.php";
