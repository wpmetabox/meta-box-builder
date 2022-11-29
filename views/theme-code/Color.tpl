<?php
$color = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' );
echo $color;

// or
rwmb_the_value( '{field_id}', [ '{args}' ], '{object_id}' );
?>