<?php

$file = empty( $field['clone'] ) ? 'single' : 'single-clone';
$file = $is_group === true ? $file.'-group' : $file;

require __DIR__ . "/partials/default/$file.php";
