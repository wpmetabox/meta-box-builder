<?php
    $value = rwmb_meta( '{field_id}' );
    echo do_shortcode( wpautop( $value ) );
?>