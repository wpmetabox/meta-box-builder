<?php
$group = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' ) ?: [];

$sub_field = $group['sub_field'] ?? '';
echo $sub_field;
?>
