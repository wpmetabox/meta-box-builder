<?php
$file = empty( $field['multiple'] ) ? 'single' : 'multiple';
$file = empty( $field['clone'] ) ? $file : "$file-clone";
$file = $is_group === true ? "$file-group" : $file;
require __DIR__ . "/partials/post/$file.php";
