<?php
$sidebar_id = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' );
if ( is_active_sidebar( $sidebar_id ) ) {
    dynamic_sidebar( $sidebar_id );
}