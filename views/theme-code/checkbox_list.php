<?php
$file  = empty( $field['clone'] ) ? 'multiple' : 'multiple-clone';
$file .= $is_group === true ? '-group' : '';

require __DIR__ . "/partials/choice/$file.php";
