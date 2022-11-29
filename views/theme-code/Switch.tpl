<?php
$value = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' );
if ( $value ) {
    echo 'Checked';
} else {
    echo 'Unchecked';
}
?>