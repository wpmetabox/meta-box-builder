<?php
$value = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' );
echo do_shortcode( wpautop( $value ) );
?>